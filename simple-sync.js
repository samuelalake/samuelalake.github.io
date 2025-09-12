#!/usr/bin/env node

/**
 * Simple GitHub to Notion sync script
 * This bypasses the TypeScript import issues by using direct API calls
 */

require('dotenv').config({ path: '.env.local' });

const { Octokit } = require('@octokit/rest');
const { Client } = require('@notionhq/client');

async function syncGitHubIssuesToNotion() {
  console.log('🚀 Starting GitHub to Notion sync...');
  console.log('=====================================');
  
  // Initialize clients
  const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN,
  });
  
  const notion = new Client({
    auth: process.env.NOTION_TOKEN,
  });
  
  const tasksDbId = '2696663d-75d9-8027-babc-f75791c20e80';
  
  try {
    // Get GitHub issues
    console.log('📂 Fetching GitHub issues...');
    const { data: issues } = await octokit.rest.issues.listForAuthenticatedUser({
      state: 'all',
      per_page: 10
    });
    
    console.log(`Found ${issues.length} GitHub issues`);
    
    let syncedCount = 0;
    let newCount = 0;
    let updatedCount = 0;
    
    for (const issue of issues) {
      try {
        // Check if task already exists
        const { results: existingTasks } = await notion.databases.query({
          database_id: tasksDbId,
          filter: {
            property: 'GitHub Issue Number',
            number: {
              equals: issue.number
            }
          }
        });
        
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
        
        if (existingTasks.length > 0) {
          // Update existing task
          await notion.pages.update({
            page_id: existingTasks[0].id,
            properties: taskData.properties
          });
          updatedCount++;
          console.log(`🔄 Updated task: ${issue.title}`);
        } else {
          // Create new task
          await notion.pages.create(taskData);
          newCount++;
          console.log(`🆕 Created task: ${issue.title}`);
        }
        
        syncedCount++;
        
      } catch (error) {
        console.error(`❌ Error syncing issue ${issue.number}:`, error.message);
      }
    }
    
    console.log('\n✅ Sync completed!');
    console.log('==================');
    console.log(`📊 Total processed: ${syncedCount}`);
    console.log(`🆕 New tasks created: ${newCount}`);
    console.log(`🔄 Tasks updated: ${updatedCount}`);
    
    console.log('\n💡 Next steps:');
    console.log('• Check your Notion Tasks database for synced issues');
    console.log('• Visit http://localhost:3001/projects/composa to see the roadmap');
    console.log('• The roadmap tab should now show your GitHub issues as tasks');
    
  } catch (error) {
    console.error('💥 Sync failed:', error);
  }
}

// Run the sync
syncGitHubIssuesToNotion().catch(console.error);
