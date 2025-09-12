#!/usr/bin/env node

/**
 * Auto-sync all GitHub issues from all Notion projects
 * This script is designed to run in GitHub Actions
 */

require('dotenv').config({ path: '.env.local' });

const { Client } = require('@notionhq/client');
const { Octokit } = require('@octokit/rest');

const notion = new Client({ auth: process.env.NOTION_TOKEN });
const github = new Octokit({ auth: process.env.GITHUB_TOKEN });

async function getAllNotionProjects() {
  try {
    console.log('📂 Fetching all projects from Notion...');
    
    const response = await notion.search({
      filter: {
        property: 'object',
        value: 'page'
      }
    });
    
    const projects = response.results.filter(page => 
      page.parent?.database_id === process.env.NOTION_PROJECTS_DATABASE_ID &&
      page.properties?.['Include in Portfolio']?.checkbox === true
    );
    
    console.log(`✅ Found ${projects.length} projects marked for portfolio`);
    return projects;
    
  } catch (error) {
    console.error('❌ Error fetching projects:', error.message);
    return [];
  }
}

async function syncProjectIssues(project) {
  try {
    const projectName = project.properties?.Name?.title?.[0]?.plain_text || 'Unknown Project';
    const githubRepo = project.properties?.['Github Repo']?.url;
    
    if (!githubRepo) {
      console.log(`⏭️  Skipping ${projectName} - no GitHub repo URL`);
      return { synced: 0, errors: 0 };
    }
    
    console.log(`\\n📋 Syncing ${projectName}...`);
    console.log(`🔗 GitHub Repo: ${githubRepo}`);
    
    // Extract owner and repo from URL
    const repoMatch = githubRepo.match(/github\\.com\\/([^\\/]+)\\/([^\\/]+)/);
    if (!repoMatch) {
      console.log(`❌ Invalid GitHub URL: ${githubRepo}`);
      return { synced: 0, errors: 0 };
    }
    
    const [, owner, repo] = repoMatch;
    console.log(`👤 Owner: ${owner}`);
    console.log(`📦 Repo: ${repo}`);
    
    // Fetch GitHub issues
    const issues = await github.rest.issues.listForRepo({
      owner,
      repo,
      state: 'all',
      per_page: 100
    });
    
    console.log(`🔍 Found ${issues.data.length} GitHub issues`);
    
    let syncedCount = 0;
    let errorCount = 0;
    
    // Sync each issue
    for (const issue of issues.data) {
      try {
        // Check if task already exists
        const existingTasks = await notion.search({
          filter: {
            property: 'object',
            value: 'page'
          }
        });
        
        const taskExists = existingTasks.results.some(task => 
          task.parent?.database_id === process.env.NOTION_TASKS_DATABASE_ID &&
          task.properties?.['GitHub Issue Number']?.number === issue.number &&
          task.properties?.['GitHub Repository']?.rich_text?.[0]?.plain_text === `${owner}/${repo}`
        );
        
        if (taskExists) {
          console.log(`⏭️  Skipping issue #${issue.number} - already synced`);
          continue;
        }
        
        // Convert GitHub markdown to Notion rich text
        const description = issue.body || 'No description available';
        const truncatedDescription = description.length > 2000 
          ? description.substring(0, 1997) + '...'
          : description;
          
        // Simple markdown to Notion rich text conversion
        const convertMarkdownToNotion = (text) => {
          const lines = text.split('\\n');
          const blocks = [];
          
          for (const line of lines) {
            if (line.trim() === '') {
              blocks.push({
                object: 'block',
                type: 'paragraph',
                paragraph: { rich_text: [] }
              });
            } else if (line.startsWith('# ')) {
              blocks.push({
                object: 'block',
                type: 'heading_1',
                heading_1: {
                  rich_text: [{ type: 'text', text: { content: line.substring(2) } }]
                }
              });
            } else if (line.startsWith('## ')) {
              blocks.push({
                object: 'block',
                type: 'heading_2',
                heading_2: {
                  rich_text: [{ type: 'text', text: { content: line.substring(3) } }]
                }
              });
            } else if (line.startsWith('### ')) {
              blocks.push({
                object: 'block',
                type: 'heading_3',
                heading_3: {
                  rich_text: [{ type: 'text', text: { content: line.substring(4) } }]
                }
              });
            } else if (line.startsWith('- ') || line.startsWith('* ')) {
              blocks.push({
                object: 'block',
                type: 'bulleted_list_item',
                bulleted_list_item: {
                  rich_text: [{ type: 'text', text: { content: line.substring(2) } }]
                }
              });
            } else if (line.match(/^\\d+\\. /)) {
              blocks.push({
                object: 'block',
                type: 'numbered_list_item',
                numbered_list_item: {
                  rich_text: [{ type: 'text', text: { content: line.replace(/^\\d+\\. /, '') } }]
                }
              });
            } else {
              // Regular paragraph
              blocks.push({
                object: 'block',
                type: 'paragraph',
                paragraph: {
                  rich_text: [{ type: 'text', text: { content: line } }]
                }
              });
            }
          }
          
          return blocks;
        };
        
        // Create task data
        const taskData = {
          'Task': {
            title: [{ text: { content: issue.title } }]
          },
          'Status': {
            status: {
              name: issue.state === 'closed' ? 'Done' : 'To-do'
            }
          },
          'Priority': {
            select: { name: 'Pri 2' }
          },
          'Labels': {
            multi_select: issue.labels.map(label => ({ name: label.name }))
          },
          'Source': {
            select: { name: 'GitHub' }
          },
          'GitHub Issue Number': {
            number: issue.number
          },
          'GitHub Repository': {
            rich_text: [{ text: { content: `${owner}/${repo}` } }]
          },
          'GitHub URL': {
            url: issue.html_url
          },
          'Include in Portfolio': {
            checkbox: true
          },
          'Projects': {
            relation: [{ id: project.id }]
          }
        };
        
        // Create the task
        await notion.pages.create({
          parent: { database_id: process.env.NOTION_TASKS_DATABASE_ID },
          properties: taskData,
          children: convertMarkdownToNotion(truncatedDescription)
        });
        
        console.log(`✅ Synced issue #${issue.number}: ${issue.title}`);
        syncedCount++;
        
      } catch (error) {
        console.error(`❌ Error syncing issue #${issue.number}:`, error.message);
        errorCount++;
      }
    }
    
    return { synced: syncedCount, errors: errorCount };
    
  } catch (error) {
    console.error(`❌ Error syncing project:`, error.message);
    return { synced: 0, errors: 1 };
  }
}

async function main() {
  try {
    console.log('🚀 Starting auto-sync of all GitHub issues to Notion...');
    
    const projects = await getAllNotionProjects();
    
    if (projects.length === 0) {
      console.log('ℹ️  No projects found with GitHub repos');
      return;
    }
    
    let totalSynced = 0;
    let totalErrors = 0;
    
    for (const project of projects) {
      const result = await syncProjectIssues(project);
      totalSynced += result.synced;
      totalErrors += result.errors;
    }
    
    console.log(`\\n🎉 Auto-sync complete!`);
    console.log(`✅ Total synced: ${totalSynced} issues`);
    console.log(`❌ Total errors: ${totalErrors} issues`);
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

main().catch(console.error);
