#!/usr/bin/env node

/**
 * Clean up duplicate GitHub tasks using MCP tool
 * Delete tasks that have Description property (old format)
 */

// List of task IDs that have Description property (old format) - these should be deleted
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

console.log('🧹 Cleaning up duplicate GitHub tasks...');
console.log(`Found ${duplicateTaskIds.length} duplicate tasks to delete`);

// Note: This script identifies the duplicates but can't delete them directly
// You'll need to manually delete them in Notion or use the Notion API
console.log('\\nDuplicate task IDs to delete:');
duplicateTaskIds.forEach((id, index) => {
  console.log(`${index + 1}. ${id}`);
});

console.log('\\n💡 To delete these tasks:');
console.log('1. Go to your Notion Tasks database');
console.log('2. Search for each task ID above');
console.log('3. Delete the tasks that have "Description:" in their properties');
console.log('4. Keep the tasks that have the description in the page body (new format)');

console.log('\\n✅ Tasks to keep (new format with page body):');
console.log('- Tasks with Source: GitHub but NO Description property');
console.log('- These have the GitHub issue content in the page body instead');
