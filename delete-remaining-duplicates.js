#!/usr/bin/env node

/**
 * Delete remaining duplicate GitHub tasks
 * Keep only the most recent task for each GitHub issue number
 */

require('dotenv').config({ path: '.env.local' });

const { Client } = require('@notionhq/client');
const notion = new Client({ auth: process.env.NOTION_TOKEN });

// Map of GitHub issue numbers to task IDs (keep the most recent one)
const issueToKeep = {
  53: '26b6663d-75d9-81f8-81e6-e8d802176f4a', // [UI Shell Issue #4] - keep most recent
  56: '26b6663d-75d9-816c-906a-e24bd025590e', // feat: integrate UI Shell toolbar - keep most recent
  57: '26b6663d-75d9-811e-96dc-dd56525ddac7', // feat: Integrate UI Shell visual design - keep most recent
  58: '26b6663d-75d9-8151-8cb5-dfee7262adb9', // Integrate UI Shell Welcome Screen - keep most recent
  59: '26b6663d-75d9-81f5-b060-d16f461cf2a4', // [Reference .Timeline] Enhance Timeline UI - keep most recent
  60: '26b6663d-75d9-81e2-84ab-d3c0e52cf57c', // Enhance timeline clips - keep most recent
  62: '26b6663d-75d9-81f8-82d3-c1ce003b7d4f', // [./Timeline Reference] - keep most recent
};

// Tasks to delete (duplicates)
const tasksToDelete = [
  '26b6663d-75d9-81f8-a8c4-ce4f6dacc60f', // Test GitHub Issue #123 (not a real GitHub issue)
  '26b6663d-75d9-810f-9b77-f4e441657f5e', // [UI Shell Issue #4] - duplicate
  '26b6663d-75d9-8139-8eea-f86292025546', // feat: integrate UI Shell toolbar - duplicate
  '26b6663d-75d9-810f-bacf-dc23ccb8f61e', // feat: integrate UI Shell toolbar - duplicate
  '26b6663d-75d9-8122-8287-c3e52a4c3fab', // [./Timeline Reference] - duplicate
  '26b6663d-75d9-81f9-8930-cac174b1ec8c', // Enhance timeline clips - duplicate
  '26b6663d-75d9-81a2-93e2-c92c36344653', // Integrate UI Shell Welcome Screen - duplicate
  '26b6663d-75d9-81ea-85b5-edf6424cc3b0', // feat: Integrate UI Shell visual design - duplicate
  '26b6663d-75d9-81ca-8f48-f316987126e1', // feat: integrate UI Shell toolbar - duplicate
  '26b6663d-75d9-81cf-956b-fe18d439bca4', // Enhance timeline clips - duplicate
];

async function deleteRemainingDuplicates() {
  try {
    console.log('🗑️  Deleting remaining duplicate GitHub tasks...');
    console.log(`Found ${tasksToDelete.length} duplicate tasks to delete`);
    
    let deletedCount = 0;
    let errorCount = 0;
    
    for (const taskId of tasksToDelete) {
      try {
        console.log(`\\nDeleting task: ${taskId}`);
        
        // Archive the page (soft delete)
        await notion.pages.update({
          page_id: taskId,
          archived: true
        });
        
        console.log(`✅ Deleted task: ${taskId}`);
        deletedCount++;
        
      } catch (error) {
        console.error(`❌ Error deleting task ${taskId}:`, error.message);
        errorCount++;
      }
    }
    
    console.log(`\\n🎉 Deletion complete!`);
    console.log(`✅ Successfully deleted: ${deletedCount} tasks`);
    console.log(`❌ Errors: ${errorCount} tasks`);
    
    console.log(`\\n📋 Remaining tasks (one per GitHub issue):`);
    Object.entries(issueToKeep).forEach(([issueNumber, taskId]) => {
      console.log(`  Issue #${issueNumber}: ${taskId}`);
    });
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

deleteRemainingDuplicates().catch(console.error);
