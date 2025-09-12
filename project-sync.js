#!/usr/bin/env node

/**
 * Project-based GitHub to Notion sync
 * Syncs GitHub issues to Notion tasks, linked to specific projects
 */

require('dotenv').config({ path: '.env.local' });

const { Octokit } = require('@octokit/rest');
const { Client } = require('@notionhq/client');

async function syncProjectIssues() {
  console.log('🚀 Starting Project-based GitHub to Notion sync...');
  console.log('================================================');
  
  // Initialize clients
  const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN,
  });
  
  const notion = new Client({
    auth: process.env.NOTION_TOKEN,
  });
  
  const projectsDbId = process.env.NOTION_PROJECTS_DATABASE_ID;
  const tasksDbId = '2696663d-75d9-8027-babc-f75791c20e80';
  
  try {
    // Get all projects from Notion
    console.log('📂 Fetching projects from Notion...');
    const response = await notion.search({
      filter: {
        value: 'page',
      },
      sort: {
        direction: 'descending',
        timestamp: 'last_edited_time',
      },
    });
    
    // Filter pages that belong to our projects database
    const projectPages = response.results.filter((page) => 
      page.parent?.database_id === projectsDbId
    );
    
    console.log(`Found ${projectPages.length} projects in Notion`);
    
    let totalSynced = 0;
    let projectsWithGitHub = 0;
    
    for (const project of projectPages) {
      try {
        const projectTitle = project.properties.Title?.title?.[0]?.plain_text || 'Untitled';
        const projectId = project.id;
        
        // Look for GitHub URL in project properties
        // Check various possible property names for GitHub URL
        let githubUrl = null;
        const possibleProps = ['Primary Repository', 'GitHub URL', 'Repository', 'External Links'];
        
        for (const propName of possibleProps) {
          const prop = project.properties[propName];
          if (prop?.url) {
            githubUrl = prop.url;
            break;
          } else if (prop?.rich_text?.[0]?.plain_text) {
            const text = prop.rich_text[0].plain_text;
            const githubMatch = text.match(/https:\/\/github\.com\/[^\s]+/);
            if (githubMatch) {
              githubUrl = githubMatch[0];
              break;
            }
          }
        }
        
        if (!githubUrl) {
          console.log(`⏭️ Skipping ${projectTitle} - no GitHub URL found`);
          continue;
        }
        
        projectsWithGitHub++;
        console.log(`\\n🔄 Processing ${projectTitle}`);
        console.log(`   GitHub URL: ${githubUrl}`);
        
        // Extract repo name from GitHub URL
        const repoMatch = githubUrl.match(/github\.com\/([^\/]+)\/([^\/]+)/);
        if (!repoMatch) {
          console.log(`   ❌ Could not parse GitHub URL`);
          continue;
        }
        
        const [, owner, repo] = repoMatch;
        console.log(`   Repository: ${owner}/${repo}`);
        
        // Get GitHub issues for this repository
        const { data: issues } = await octokit.rest.issues.listForRepo({
          owner,
          repo,
          state: 'all',
          per_page: 20
        });
        
        console.log(`   Found ${issues.length} issues`);
        
        let syncedForProject = 0;
        
        for (const issue of issues) {
          try {
            // Check if task already exists by searching
            const existingResponse = await notion.search({
              filter: {
                value: 'page',
              },
            });
            
            const existingTasks = existingResponse.results.filter((page) => 
              page.parent?.database_id === tasksDbId &&
              page.properties?.['GitHub Issue Number']?.number === issue.number &&
              page.properties?.Project?.relation?.some(rel => rel.id === projectId)
            );
            
            const taskData = {
              parent: { database_id: tasksDbId },
              properties: {
                'Title': {
                  title: [
                    {
                      text: {
                        content: issue.title
                      }
                    }
                  ]
                },
                'Description': {
                  rich_text: [
                    {
                      text: {
                        content: issue.body || 'No description'
                      }
                    }
                  ]
                },
                'Status': {
                  select: {
                    name: issue.state === 'closed' ? 'Done' : 'To Do'
                  }
                },
                'Priority': {
                  select: {
                    name: 'Medium' // Default priority
                  }
                },
                'Source': {
                  select: {
                    name: 'GitHub'
                  }
                },
                'Project': {
                  relation: [
                    {
                      id: projectId
                    }
                  ]
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
                }
              }
            };
            
            if (existingTasks.length > 0) {
              // Update existing task
              await notion.pages.update({
                page_id: existingTasks[0].id,
                properties: taskData.properties
              });
              console.log(`     🔄 Updated: #${issue.number} ${issue.title}`);
            } else {
              // Create new task
              await notion.pages.create(taskData);
              console.log(`     🆕 Created: #${issue.number} ${issue.title}`);
            }
            
            syncedForProject++;
            totalSynced++;
            
          } catch (error) {
            console.error(`     ❌ Error syncing issue #${issue.number}:`, error.message);
          }
        }
        
        console.log(`   ✅ Synced ${syncedForProject} tasks for ${projectTitle}`);
        
      } catch (error) {
        console.error(`❌ Error processing project:`, error.message);
      }
    }
    
    console.log('\\n🎉 Sync completed!');
    console.log('==================');
    console.log(`📋 Projects with GitHub URLs: ${projectsWithGitHub}`);
    console.log(`📊 Total tasks synced: ${totalSynced}`);
    
    console.log('\\n💡 Next steps:');
    console.log('• Check your Notion Tasks database for synced issues');
    console.log('• Visit http://localhost:3001/projects/composa to see the roadmap');
    console.log('• The roadmap tab should now show GitHub issues as tasks linked to projects');
    
  } catch (error) {
    console.error('💥 Sync failed:', error);
  }
}

// Run the sync
syncProjectIssues().catch(console.error);
