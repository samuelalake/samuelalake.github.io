#!/usr/bin/env node

/**
 * Ultimate cleanup - delete ALL remaining duplicate GitHub tasks
 * Keep only ONE task per GitHub issue number
 */

require('dotenv').config({ path: '.env.local' });

const { Client } = require('@notionhq/client');
const notion = new Client({ auth: process.env.NOTION_TOKEN });

// Final list of tasks to KEEP (one per GitHub issue)
const keepTasks = [
  '26b6663d-75d9-81f8-81e6-e8d802176f4a', // Issue #53 - [UI Shell Issue #4]
  '26b6663d-75d9-8172-9e28-d8aa0dedb71b', // Issue #54 - Integrate UI Shell Inspector
  '26b6663d-75d9-8130-b1a1-f59b47f31f5a', // Issue #55 - [.Timeline Reference] Enhance Timeline Clips
  '26b6663d-75d9-816c-906a-e24bd025590e', // Issue #56 - feat: integrate UI Shell toolbar
  '26b6663d-75d9-811e-96dc-dd56525ddac7', // Issue #57 - feat: Integrate UI Shell visual design
  '26b6663d-75d9-8151-8cb5-dfee7262adb9', // Issue #58 - Integrate UI Shell Welcome Screen
  '26b6663d-75d9-81f5-b060-d16f461cf2a4', // Issue #59 - [Reference .Timeline] Enhance Timeline UI
  '26b6663d-75d9-81e2-84ab-d3c0e52cf57c', // Issue #60 - Enhance timeline clips
  '26b6663d-75d9-8197-b201-d51f6b522ce9', // Issue #61 - Enhance Timeline UI
  '26b6663d-75d9-81f8-82d3-c1ce003b7d4f', // Issue #62 - [./Timeline Reference]
];

// All GitHub tasks found in search (including duplicates)
const allGitHubTasks = [
  '26b6663d-75d9-81f8-81e6-e8d802176f4a', // Issue #53 - KEEP
  '26b6663d-75d9-811e-96dc-dd56525ddac7', // Issue #57 - KEEP
  '26b6663d-75d9-81e2-84ab-d3c0e52cf57c', // Issue #60 - KEEP
  '26b6663d-75d9-81f5-b060-d16f461cf2a4', // Issue #59 - KEEP
  '26b6663d-75d9-81f8-82d3-c1ce003b7d4f', // Issue #62 - KEEP
  '26b6663d-75d9-8172-9e28-d8aa0dedb71b', // Issue #54 - KEEP
  '26b6663d-75d9-8151-8cb5-dfee7262adb9', // Issue #58 - KEEP
  '26b6663d-75d9-816c-906a-e24bd025590e', // Issue #56 - KEEP
  '26b6663d-75d9-8197-b201-d51f6b522ce9', // Issue #61 - KEEP
  '26b6663d-75d9-8130-b1a1-f59b47f31f5a', // Issue #55 - KEEP
  '26b6663d-75d9-811e-bf3f-d5a5e75cbf6f', // Issue #54 - DELETE (duplicate)
  '26b6663d-75d9-8144-9d80-d2615b460e33', // Issue #54 - DELETE (duplicate)
];

// Tasks to delete (all duplicates)
const tasksToDelete = allGitHubTasks.filter(taskId => !keepTasks.includes(taskId));

async function ultimateCleanup() {
  try {
    console.log('🧹 Ultimate cleanup - deleting ALL remaining duplicate GitHub tasks...');
    console.log(`Found ${tasksToDelete.length} duplicate tasks to delete`);
    console.log(`Keeping ${keepTasks.length} unique tasks (one per GitHub issue)`);
    
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
    
    console.log(`\\n🎉 Ultimate cleanup complete!`);
    console.log(`✅ Successfully deleted: ${deletedCount} duplicate tasks`);
    console.log(`❌ Errors: ${errorCount} tasks`);
    
    console.log(`\\n📋 Final GitHub tasks (one per issue):`);
    const issueNumbers = [53, 54, 55, 56, 57, 58, 59, 60, 61, 62];
    issueNumbers.forEach((issueNumber, index) => {
      console.log(`  Issue #${issueNumber}: ${keepTasks[index]}`);
    });
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

ultimateCleanup().catch(console.error);
