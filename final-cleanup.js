#!/usr/bin/env node

/**
 * Final cleanup - delete ALL duplicate GitHub tasks
 * Keep only the most recent task for each unique GitHub issue number
 */

require('dotenv').config({ path: '.env.local' });

const { Client } = require('@notionhq/client');
const notion = new Client({ auth: process.env.NOTION_TOKEN });

// Map of GitHub issue numbers to the task ID we want to KEEP (most recent)
const keepTasks = {
  53: '26b6663d-75d9-81f8-81e6-e8d802176f4a', // [UI Shell Issue #4] - KEEP
  54: '26b6663d-75d9-8172-9e28-d8aa0dedb71b', // Integrate UI Shell Inspector - KEEP
  55: '26b6663d-75d9-8130-b1a1-f59b47f31f5a', // [.Timeline Reference] Enhance Timeline Clips - KEEP
  56: '26b6663d-75d9-816c-906a-e24bd025590e', // feat: integrate UI Shell toolbar - KEEP
  57: '26b6663d-75d9-811e-96dc-dd56525ddac7', // feat: Integrate UI Shell visual design - KEEP
  58: '26b6663d-75d9-8151-8cb5-dfee7262adb9', // Integrate UI Shell Welcome Screen - KEEP
  59: '26b6663d-75d9-81f5-b060-d16f461cf2a4', // [Reference .Timeline] Enhance Timeline UI - KEEP
  60: '26b6663d-75d9-81e2-84ab-d3c0e52cf57c', // Enhance timeline clips - KEEP
  61: '26b6663d-75d9-8197-b201-d51f6b522ce9', // Enhance Timeline UI - KEEP
  62: '26b6663d-75d9-81f8-82d3-c1ce003b7d4f', // [./Timeline Reference] - KEEP
};

// All other GitHub tasks should be deleted
const allGitHubTasks = [
  '26b6663d-75d9-81f8-81e6-e8d802176f4a', // Issue #53 - KEEP
  '26b6663d-75d9-811e-96dc-dd56525ddac7', // Issue #57 - KEEP
  '26b6663d-75d9-81e2-84ab-d3c0e52cf57c', // Issue #60 - KEEP
  '26b6663d-75d9-81f5-b060-d16f461cf2a4', // Issue #59 - KEEP
  '26b6663d-75d9-81f8-82d3-c1ce003b7d4f', // Issue #62 - KEEP
  '26b6663d-75d9-8172-9e28-d8aa0dedb71b', // Issue #54 - KEEP
  '26b6663d-75d9-8151-8cb5-dfee7262adb9', // Issue #58 - KEEP
  '26b6663d-75d9-816c-906a-e24bd025590e', // Issue #56 - KEEP
  '26b6663d-75d9-81a7-9bdd-c5b685be00a7', // Issue #57 - DELETE (duplicate)
  '26b6663d-75d9-814a-853d-e96c3739181c', // Issue #62 - DELETE (duplicate)
  '26b6663d-75d9-8144-9639-c7d4aeb3a4cc', // Issue #59 - DELETE (duplicate)
  '26b6663d-75d9-8197-b201-d51f6b522ce9', // Issue #61 - KEEP
  '26b6663d-75d9-8130-b1a1-f59b47f31f5a', // Issue #55 - KEEP
  '26b6663d-75d9-813e-a150-c87aa1bcb79e', // Issue #58 - DELETE (duplicate)
  '26b6663d-75d9-8131-9e17-fdb2b8ad9d16', // Issue #59 - DELETE (duplicate)
  '26b6663d-75d9-8172-beac-cac95a3d6ac2', // Issue #55 - DELETE (duplicate)
  '26b6663d-75d9-81a9-b28c-fab707bb09c5', // Issue #61 - DELETE (duplicate)
];

// Tasks to delete (all duplicates)
const tasksToDelete = allGitHubTasks.filter(taskId => !Object.values(keepTasks).includes(taskId));

async function finalCleanup() {
  try {
    console.log('🧹 Final cleanup - deleting ALL duplicate GitHub tasks...');
    console.log(`Found ${tasksToDelete.length} duplicate tasks to delete`);
    console.log(`Keeping ${Object.keys(keepTasks).length} unique tasks (one per GitHub issue)`);
    
    let deletedCount = 0;
    let errorCount = 0;
    
    for (const taskId of tasksToDelete) {
      try {
        console.log(`\\nDeleting duplicate task: ${taskId}`);
        
        // Archive the page (soft delete)
        await notion.pages.update({
          page_id: taskId,
          archived: true
        });
        
        console.log(`✅ Deleted duplicate: ${taskId}`);
        deletedCount++;
        
      } catch (error) {
        console.error(`❌ Error deleting task ${taskId}:`, error.message);
        errorCount++;
      }
    }
    
    console.log(`\\n🎉 Final cleanup complete!`);
    console.log(`✅ Successfully deleted: ${deletedCount} duplicate tasks`);
    console.log(`❌ Errors: ${errorCount} tasks`);
    
    console.log(`\\n📋 Final GitHub tasks (one per issue):`);
    Object.entries(keepTasks).forEach(([issueNumber, taskId]) => {
      console.log(`  Issue #${issueNumber}: ${taskId}`);
    });
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

finalCleanup().catch(console.error);
