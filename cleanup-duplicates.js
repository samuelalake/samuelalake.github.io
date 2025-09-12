#!/usr/bin/env node

/**
 * Clean up duplicate GitHub tasks - remove ones with Description property but no page body
 */

require('dotenv').config({ path: '.env.local' });

const { Client } = require('@notionhq/client');
const notion = new Client({ auth: process.env.NOTION_TOKEN });

async function cleanupDuplicateTasks() {
  try {
    console.log('🧹 Cleaning up duplicate GitHub tasks...');
    
    // Get all tasks with Source = GitHub
    const response = await notion.search({
      filter: {
        property: 'object',
        value: 'page'
      }
    });
    
    const tasks = response.results.filter(page => 
      page.parent?.database_id === process.env.NOTION_TASKS_DATABASE_ID &&
      page.properties?.Source?.select?.name === 'GitHub'
    );
    
    console.log(`Found ${tasks.length} GitHub tasks`);
    
    let deletedCount = 0;
    let keptCount = 0;
    
    for (const task of tasks) {
      try {
        // Check if task has Description property (old format)
        const hasDescriptionProperty = task.properties?.Description?.rich_text?.length > 0;
        
        if (hasDescriptionProperty) {
          console.log(`🗑️  Deleting duplicate task: ${task.properties.Task?.title?.[0]?.plain_text}`);
          
          await notion.pages.update({
            page_id: task.id,
            archived: true
          });
          
          deletedCount++;
        } else {
          console.log(`✅ Keeping task: ${task.properties.Task?.title?.[0]?.plain_text}`);
          keptCount++;
        }
        
      } catch (error) {
        console.error(`❌ Error processing task ${task.id}:`, error.message);
      }
    }
    
    console.log(`\\n🎉 Cleanup complete!`);
    console.log(`✅ Kept: ${keptCount} tasks (with page body)`);
    console.log(`🗑️  Deleted: ${deletedCount} tasks (with Description property)`);
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

cleanupDuplicateTasks().catch(console.error);
