#!/usr/bin/env node

/**
 * GitHub Issues to Notion Tasks Sync Script
 * 
 * This script syncs GitHub issues to your Notion Tasks database.
 * Run with: node scripts/sync-github-to-notion.js [project-name]
 * 
 * Examples:
 * - Sync all issues: node scripts/sync-github-to-notion.js
 * - Sync specific project: node scripts/sync-github-to-notion.js my-project-name
 */

const { syncGitHubIssuesToNotionTasks, syncAllGitHubIssuesToNotionTasks } = require('../src/lib/github-tasks-sync.ts');
require('dotenv').config({ path: '.env.local' });

async function main() {
  const projectName = process.argv[2];
  
  console.log('🚀 Starting GitHub to Notion sync...');
  console.log('=====================================');
  
  // Check environment variables
  const requiredEnvVars = [
    'GITHUB_TOKEN',
    'GITHUB_USERNAME', 
    'NOTION_TOKEN',
    'NOTION_TASKS_DATABASE_ID'
  ];
  
  const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);
  
  if (missingVars.length > 0) {
    console.error('❌ Missing required environment variables:');
    missingVars.forEach(varName => console.error(`   - ${varName}`));
    console.error('\nPlease set these in your .env.local file');
    process.exit(1);
  }
  
  try {
    let result;
    
    if (projectName) {
      console.log(`📂 Syncing issues for project: ${projectName}`);
      result = await syncGitHubIssuesToNotionTasks(projectName);
    } else {
      console.log('📂 Syncing all GitHub issues across all repositories');
      result = await syncAllGitHubIssuesToNotionTasks();
    }
    
    console.log('\n✅ Sync completed!');
    console.log('==================');
    console.log(`📊 Total processed: ${result.syncedTasks}`);
    console.log(`🆕 New tasks created: ${result.newTasks}`);
    console.log(`🔄 Tasks updated: ${result.updatedTasks}`);
    
    if (result.errors.length > 0) {
      console.log(`\n⚠️  Errors encountered (${result.errors.length}):`);
      result.errors.forEach((error, index) => {
        console.log(`   ${index + 1}. ${error}`);
      });
    } else {
      console.log('🎉 No errors encountered!');
    }
    
  } catch (error) {
    console.error('💥 Sync failed:', error);
    process.exit(1);
  }
}

// Handle unhandled rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

main().catch(console.error);