#!/usr/bin/env node

/**
 * Delete duplicate GitHub tasks (ones with Description property)
 */

require('dotenv').config({ path: '.env.local' });

const { Client } = require('@notionhq/client');
const notion = new Client({ auth: process.env.NOTION_TOKEN });

// List of duplicate task IDs to delete
const duplicateTaskIds = [
  '26b6663d-75d9-8103-bdf3-e64447a571d3', // Test GitHub Issue #123 (has Description)
  '26b6663d-75d9-8112-8081-d61da68cb9e4', // [UI Shell Issue #4] (has Description)
  '26b6663d-75d9-81d5-8ee6-c62f8fc9dd0a', // Enhance timeline clips (has Description)
  '26b6663d-75d9-8128-9db2-dec8aa178814', // Enhance Timeline UI (has Description)
  '26b6663d-75d9-81f4-8d70-fae7b5c1d435', // [.Timeline Reference] Enhance Timeline Clips (has Description)
  '26b6663d-75d9-8180-8a98-d8721c649c7e', // Integrate UI Shell Welcome Screen (has Description)
  '26b6663d-75d9-81a8-afc6-e4a1d9c0fa7f', // Integrate UI Shell Inspector (has Description)
  '26b6663d-75d9-816b-9cd1-c2a95ceb7313', // feat: Integrate UI Shell visual design (has Description)
  '26b6663d-75d9-813b-badc-d77afcf02166', // Enhance timeline clips (has Description)
];

async function deleteDuplicates() {
  try {
    console.log('🗑️  Deleting duplicate GitHub tasks...');
    console.log(`Found ${duplicateTaskIds.length} duplicate tasks to delete`);
    
    let deletedCount = 0;
    let errorCount = 0;
    
    for (const taskId of duplicateTaskIds) {
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
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

deleteDuplicates().catch(console.error);
