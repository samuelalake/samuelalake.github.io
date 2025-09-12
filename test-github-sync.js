#!/usr/bin/env node

/**
 * Test GitHub Issues to Notion Tasks Sync
 */

require('dotenv').config({ path: '.env.local' });

const { Client } = require('@notionhq/client');
const { Octokit } = require('@octokit/rest');

const notion = new Client({ auth: process.env.NOTION_TOKEN });
const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

async function testGitHubSync() {
  try {
    console.log('🚀 Testing GitHub Issues to Notion Tasks Sync...');
    
    // 1. Get the Composa project
    console.log('📂 Fetching Composa project...');
    const project = await notion.pages.retrieve({
      page_id: '2696663d-75d9-803f-8198-e3f2d6b45ccd'
    });
    
    const projectProps = project.properties;
    const githubRepo = projectProps['Github Repo']?.url;
    
    if (!githubRepo) {
      console.log('❌ No GitHub repository found for Composa project');
      return;
    }
    
    console.log('✅ Project found:', projectProps.Title?.title?.[0]?.plain_text);
    console.log('🔗 GitHub Repo:', githubRepo);
    
    // 2. Extract owner and repo from URL
    const repoMatch = githubRepo.match(/github\.com\/([^\/]+)\/([^\/]+)/);
    if (!repoMatch) {
      console.log('❌ Invalid GitHub repository URL');
      return;
    }
    
    const [, owner, repo] = repoMatch;
    console.log('👤 Owner:', owner);
    console.log('📦 Repo:', repo);
    
    // 3. Fetch GitHub issues
    console.log('\\n🔍 Fetching GitHub issues...');
    const issues = await octokit.rest.issues.listForRepo({
      owner,
      repo,
      state: 'all'
    });
    
    console.log(`✅ Found ${issues.data.length} GitHub issues`);
    
    if (issues.data.length === 0) {
      console.log('ℹ️  No issues to sync');
      return;
    }
    
    // 4. Sync first few issues to Notion
    console.log('\\n📝 Syncing issues to Notion...');
    let syncedCount = 0;
    
    for (const issue of issues.data.slice(0, 10)) { // Sync first 10 issues for testing
      try {
        console.log(`\\n📋 Syncing issue #${issue.number}: ${issue.title}`);
        
        // Map GitHub issue to Notion task
        const taskData = {
          'Task': {
            title: [
              {
                text: {
                  content: issue.title
                }
              }
            ]
          },
          'Status': {
            status: {
              name: issue.state === 'closed' ? 'Done' : 'To-do'
            }
          },
          'Priority': {
            select: {
              name: 'Pri 2' // Default priority
            }
          },
          'Labels': {
            multi_select: issue.labels.map(label => ({ name: label.name }))
          },
          'Source': {
            select: {
              name: 'GitHub'
            }
          },
          'GitHub Issue Number': {
            number: issue.number
          },
          'GitHub Repository': {
            rich_text: [
              {
                text: {
                  content: `${owner}/${repo}`
                }
              }
            ]
          },
          'GitHub URL': {
            url: issue.html_url
          },
          'Include in Portfolio': {
            checkbox: true
          },
          'Projects': {
            relation: [
              {
                id: '2696663d-75d9-803f-8198-e3f2d6b45ccd' // Composa project ID
              }
            ]
          }
        };
        
        // Convert GitHub markdown to Notion rich text
        const description = issue.body || 'No description available';
        const truncatedDescription = description.length > 2000 
          ? description.substring(0, 1997) + '...'
          : description;
          
        // Simple markdown to Notion rich text conversion
        const convertMarkdownToNotion = (text) => {
          const lines = text.split('\n');
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
            } else if (line.match(/^\d+\. /)) {
              blocks.push({
                object: 'block',
                type: 'numbered_list_item',
                numbered_list_item: {
                  rich_text: [{ type: 'text', text: { content: line.replace(/^\d+\. /, '') } }]
                }
              });
            } else {
              // Regular paragraph with basic formatting
              const richText = convertInlineMarkdown(line);
              blocks.push({
                object: 'block',
                type: 'paragraph',
                paragraph: { rich_text: richText }
              });
            }
          }
          
          return blocks;
        };
        
        const convertInlineMarkdown = (text) => {
          const richText = [];
          let currentText = text;
          
          // Handle **bold** and *italic*
          const parts = currentText.split(/(\*\*.*?\*\*|\*.*?\*|`.*?`)/);
          
          for (const part of parts) {
            if (part.startsWith('**') && part.endsWith('**')) {
              richText.push({
                type: 'text',
                text: { content: part.slice(2, -2) },
                annotations: { bold: true }
              });
            } else if (part.startsWith('*') && part.endsWith('*') && !part.startsWith('**')) {
              richText.push({
                type: 'text',
                text: { content: part.slice(1, -1) },
                annotations: { italic: true }
              });
            } else if (part.startsWith('`') && part.endsWith('`')) {
              richText.push({
                type: 'text',
                text: { content: part.slice(1, -1) },
                annotations: { code: true }
              });
            } else if (part.trim() !== '') {
              richText.push({
                type: 'text',
                text: { content: part }
              });
            }
          }
          
          return richText.length > 0 ? richText : [{ type: 'text', text: { content: text } }];
        };
          
        const response = await notion.pages.create({
          parent: { database_id: process.env.NOTION_TASKS_DATABASE_ID },
          properties: taskData,
          children: convertMarkdownToNotion(truncatedDescription)
        });
        
        console.log(`✅ Created task: ${response.id}`);
        syncedCount++;
        
      } catch (error) {
        console.error(`❌ Error syncing issue #${issue.number}:`, error.message);
      }
    }
    
    console.log(`\\n🎉 Sync complete! Synced ${syncedCount} issues to Notion.`);
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

testGitHubSync().catch(console.error);
