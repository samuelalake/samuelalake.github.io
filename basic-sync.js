#!/usr/bin/env node

/**
 * Basic GitHub to Notion sync - creates test tasks
 */

require('dotenv').config({ path: '.env.local' });

const { Octokit } = require('@octokit/rest');
const { Client } = require('@notionhq/client');

async function basicSync() {
  console.log('🚀 Starting basic GitHub to Notion sync...');
  console.log('==========================================');
  
  // Initialize clients
  const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN,
  });
  
  const notion = new Client({
    auth: process.env.NOTION_TOKEN,
  });
  
  const tasksDbId = '2696663d-75d9-8027-babc-f75791c20e80';
  
  try {
    // Get some GitHub issues from your repositories
    console.log('📂 Fetching GitHub issues...');
    const { data: issues } = await octokit.rest.issues.listForAuthenticatedUser({
      state: 'all',
      per_page: 5
    });
    
    console.log(`Found ${issues.length} GitHub issues`);
    
    if (issues.length === 0) {
      console.log('No GitHub issues found. Let me create a test task...');
      
      // Create a test task
      const testTask = await notion.pages.create({
        parent: { database_id: tasksDbId },
        properties: {
          'Title': {
            title: [
              {
                text: {
                  content: 'Test Task - Portfolio Setup'
                }
              }
            ]
          },
          'Description': {
            rich_text: [
              {
                text: {
                  content: 'This is a test task to verify the roadmap functionality is working.'
                }
              }
            ]
          },
          'Status': {
            select: {
              name: 'To Do'
            }
          },
          'Priority': {
            select: {
              name: 'High'
            }
          },
          'Source': {
            select: {
              name: 'Manual'
            }
          }
        }
      });
      
      console.log('✅ Created test task:', testTask.id);
    } else {
      // Sync actual GitHub issues
      for (const issue of issues) {
        try {
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
                  name: 'Medium'
                }
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
                      content: issue.repository.full_name
                    }
                  }
                ]
              },
              'GitHub URL': {
                url: issue.html_url
              }
            }
          };
          
          const task = await notion.pages.create(taskData);
          console.log(`✅ Created task: ${issue.title}`);
          
        } catch (error) {
          console.error(`❌ Error creating task for issue ${issue.number}:`, error.message);
        }
      }
    }
    
    console.log('\\n🎉 Basic sync completed!');
    console.log('========================');
    console.log('💡 Next steps:');
    console.log('• Check your Notion Tasks database for new tasks');
    console.log('• Visit http://localhost:3001/projects/composa to see the roadmap');
    console.log('• The roadmap tab should now show tasks');
    
  } catch (error) {
    console.error('💥 Sync failed:', error);
  }
}

// Run the sync
basicSync().catch(console.error);
