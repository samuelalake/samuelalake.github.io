#!/usr/bin/env node

/**
 * Auto-Sync GitHub Issues from Notion Projects
 * 
 * This script automatically finds projects in your Notion database that have
 * GitHub repository URLs and syncs their issues to your Notion Tasks database.
 * 
 * Usage:
 * - Sync all projects: node scripts/auto-sync-from-notion.js
 * - Sync specific project: node scripts/auto-sync-from-notion.js "My Project Name"
 * 
 * The script looks for GitHub URLs in:
 * - Primary Repository field
 * - External Links field (searches for GitHub URLs)
 */

const { autoSyncProjectsFromNotion, autoSyncSingleProject } = require('../src/lib/auto-sync.ts');
require('dotenv').config({ path: '.env.local' });

async function main() {
  const projectQuery = process.argv[2];
  
  // Check environment variables
  const requiredEnvVars = [
    'GITHUB_TOKEN',
    'GITHUB_USERNAME', 
    'NOTION_TOKEN',
    'NOTION_TASKS_DATABASE_ID',
    'NOTION_PROJECTS_DATABASE_ID'
  ];
  
  const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);
  
  if (missingVars.length > 0) {
    console.error('❌ Missing required environment variables:');
    missingVars.forEach(varName => console.error(`   - ${varName}`));
    console.error('\nPlease set these in your .env.local file');
    process.exit(1);
  }
  
  try {
    if (projectQuery) {
      console.log('🔍 Auto-syncing specific project from Notion...');
      console.log(`📂 Looking for project: "${projectQuery}"`);
      console.log('=====================================');
      
      const result = await autoSyncSingleProject(projectQuery);
      
      if (result.errors.length > 0 && result.syncedTasks === 0) {
        console.error('\n❌ Sync failed:');
        result.errors.forEach(error => console.error(`   ${error}`));
        process.exit(1);
      }
      
      console.log('\n✅ Project sync completed!');
      console.log('==========================');
      console.log(`📋 Project: ${result.projectTitle}`);
      console.log(`📁 Repository: ${result.repoName || 'N/A'}`);
      console.log(`📊 Total tasks synced: ${result.syncedTasks}`);
      console.log(`🆕 New tasks created: ${result.newTasks}`);
      console.log(`🔄 Tasks updated: ${result.updatedTasks}`);
      
    } else {
      console.log('🔍 Auto-syncing all projects from Notion...');
      console.log('This will find projects with GitHub repository URLs and sync their issues');
      console.log('=========================================================================');
      
      const result = await autoSyncProjectsFromNotion();
      
      console.log('\n✅ Auto-sync completed!');
      console.log('========================');
      console.log(`📋 Total projects found: ${result.totalProjects}`);
      console.log(`🔄 Projects synced: ${result.syncedProjects}`);
      console.log(`📊 Total tasks synced: ${result.syncedTasks}`);
    }
    
    if (result.errors.length > 0) {
      console.log(`\n⚠️  Warnings/Errors (${result.errors.length}):`);
      result.errors.forEach((error, index) => {
        console.log(`   ${index + 1}. ${error}`);
      });
    } else {
      console.log('\n🎉 No errors encountered!');
    }
    
    console.log('\n💡 Next steps:');
    console.log('   • Check your Notion Tasks database for synced GitHub issues');
    console.log('   • Visit http://localhost:3000/projects/[slug] to see the roadmap');
    console.log('   • Run this script regularly to keep issues in sync');
    
  } catch (error) {
    console.error('💥 Auto-sync failed:', error);
    process.exit(1);
  }
}

// Handle unhandled rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

main().catch(console.error);