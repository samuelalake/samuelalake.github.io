#!/usr/bin/env node

/**
 * Simple test script to check environment setup and test basic sync functionality
 */

require('dotenv').config({ path: '.env.local' });

async function testEnvironment() {
  console.log('🔍 Testing Environment Setup...');
  console.log('================================');
  
  // Check required environment variables
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
    console.error('\nPlease create a .env.local file with these variables.');
    console.error('\nExample .env.local file:');
    console.error('GITHUB_TOKEN=your_github_token_here');
    console.error('GITHUB_USERNAME=your_username_here');
    console.error('NOTION_TOKEN=your_notion_integration_token_here');
    console.error('NOTION_PROJECTS_DATABASE_ID=your_projects_database_id_here');
    console.error('NOTION_TASKS_DATABASE_ID=your_tasks_database_id_here');
    console.error('NOTION_ACTIVITIES_DATABASE_ID=your_activities_database_id_here');
    console.error('NOTION_BLOG_DATABASE_ID=your_blog_database_id_here');
    return false;
  }
  
  console.log('✅ All required environment variables are set!');
  
  // Test GitHub API connection
  try {
    const { Octokit } = require('@octokit/rest');
    const octokit = new Octokit({
      auth: process.env.GITHUB_TOKEN,
    });
    
    console.log('\n🔍 Testing GitHub API connection...');
    const { data: user } = await octokit.rest.users.getAuthenticated();
    console.log(`✅ GitHub API connected as: ${user.login}`);
    
  } catch (error) {
    console.error('❌ GitHub API connection failed:', error.message);
    return false;
  }
  
  // Test Notion API connection
  try {
    const { Client } = require('@notionhq/client');
    const notion = new Client({
      auth: process.env.NOTION_TOKEN,
    });
    
    console.log('\n🔍 Testing Notion API connection...');
    const response = await notion.databases.retrieve({
      database_id: process.env.NOTION_TASKS_DATABASE_ID
    });
    console.log(`✅ Notion API connected to Tasks database: ${response.title[0]?.plain_text || 'Untitled'}`);
    
  } catch (error) {
    console.error('❌ Notion API connection failed:', error.message);
    return false;
  }
  
  console.log('\n🎉 Environment setup is complete!');
  console.log('\nNext steps:');
  console.log('1. Your environment variables are properly configured');
  console.log('2. GitHub and Notion APIs are accessible');
  console.log('3. You can now test the sync functionality');
  console.log('\nTo test sync, you can:');
  console.log('- Visit http://localhost:3000/projects to see your projects');
  console.log('- Check your Notion Tasks database for any existing tasks');
  console.log('- Run the portfolio site to see the roadmap display');
  
  return true;
}

// Run the test
testEnvironment().catch(console.error);
