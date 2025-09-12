#!/usr/bin/env node

/**
 * Add Missing Properties to Notion Tasks Database
 * 
 * This script adds the missing properties required for GitHub Issues sync
 * to your existing Notion Tasks database.
 * 
 * Run with: node scripts/add-notion-properties.js
 */

const { Client } = require('@notionhq/client');
require('dotenv').config({ path: '.env.local' });

// Initialize Notion client
const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

async function addMissingProperties() {
  const databaseId = process.env.NOTION_TASKS_DATABASE_ID;
  
  if (!databaseId) {
    console.error('❌ NOTION_TASKS_DATABASE_ID is not set in environment variables');
    process.exit(1);
  }

  console.log('🔧 Adding missing properties to Notion Tasks database...');
  console.log('=======================================================');
  console.log(`Database ID: ${databaseId}`);
  
  try {
    // First, retrieve current database schema to understand existing properties
    console.log('\n📋 Retrieving current database schema...');
    const database = await notion.databases.retrieve({
      database_id: databaseId
    });
    
    console.log(`✅ Database found: ${database.title[0]?.plain_text || 'Tasks'}`);
    
    // Check which properties already exist
    const existingProperties = Object.keys(database.properties);
    console.log(`📊 Current properties: ${existingProperties.length}`);
    
    // Define the missing properties we need to add
    const newProperties = {};
    
    // Check and add Description (rich_text) if missing
    if (!existingProperties.includes('Description')) {
      newProperties['Description'] = {
        type: 'rich_text',
        rich_text: {}
      };
      console.log('➕ Will add: Description (rich_text)');
    } else {
      console.log('✅ Description property already exists');
    }
    
    // Check and add Labels (multi_select) if missing  
    if (!existingProperties.includes('Labels')) {
      newProperties['Labels'] = {
        type: 'multi_select',
        multi_select: {
          options: [
            { name: 'bug', color: 'red' },
            { name: 'enhancement', color: 'green' },
            { name: 'feature', color: 'blue' },
            { name: 'documentation', color: 'gray' },
            { name: 'urgent', color: 'orange' },
            { name: 'high', color: 'yellow' },
            { name: 'medium', color: 'default' },
            { name: 'low', color: 'brown' }
          ]
        }
      };
      console.log('➕ Will add: Labels (multi_select)');
    } else {
      console.log('✅ Labels property already exists');
    }
    
    // Check and add Source (select) if missing
    if (!existingProperties.includes('Source')) {
      newProperties['Source'] = {
        type: 'select',
        select: {
          options: [
            { name: 'GitHub', color: 'blue' },
            { name: 'Manual', color: 'gray' },
            { name: 'Import', color: 'green' }
          ]
        }
      };
      console.log('➕ Will add: Source (select)');
    } else {
      console.log('✅ Source property already exists');
    }
    
    // Check and add GitHub Issue Number (number) if missing
    if (!existingProperties.includes('GitHub Issue Number')) {
      newProperties['GitHub Issue Number'] = {
        type: 'number',
        number: {
          format: 'number'
        }
      };
      console.log('➕ Will add: GitHub Issue Number (number)');
    } else {
      console.log('✅ GitHub Issue Number property already exists');
    }
    
    // Check and add GitHub Repository (rich_text) if missing
    if (!existingProperties.includes('GitHub Repository')) {
      newProperties['GitHub Repository'] = {
        type: 'rich_text',
        rich_text: {}
      };
      console.log('➕ Will add: GitHub Repository (rich_text)');
    } else {
      console.log('✅ GitHub Repository property already exists');
    }
    
    // Check and add GitHub URL (url) if missing
    if (!existingProperties.includes('GitHub URL')) {
      newProperties['GitHub URL'] = {
        type: 'url',
        url: {}
      };
      console.log('➕ Will add: GitHub URL (url)');
    } else {
      console.log('✅ GitHub URL property already exists');
    }
    
    // If no new properties to add, we're done
    if (Object.keys(newProperties).length === 0) {
      console.log('\n🎉 All required properties already exist! No changes needed.');
      return;
    }
    
    // Update the database with new properties
    console.log(`\n🔄 Adding ${Object.keys(newProperties).length} new properties...`);
    
    const response = await notion.databases.update({
      database_id: databaseId,
      properties: newProperties
    });
    
    console.log('\n✅ Successfully added missing properties!');
    console.log('==========================================');
    
    // List all the properties that were added
    Object.keys(newProperties).forEach(propName => {
      const propType = newProperties[propName].type;
      console.log(`✨ Added: ${propName} (${propType})`);
    });
    
    console.log('\n💡 Next steps:');
    console.log('   • Run the sync script: npm run sync-github-to-notion');
    console.log('   • Check your Notion Tasks database to verify the new properties');
    console.log('   • Test creating tasks with GitHub issue data');
    
  } catch (error) {
    console.error('\n💥 Failed to add properties:', error);
    
    // Provide helpful error messages for common issues
    if (error.code === 'object_not_found') {
      console.error('\n🔍 Troubleshooting:');
      console.error('   • Double-check your NOTION_TASKS_DATABASE_ID in .env.local');
      console.error('   • Make sure your Notion integration has access to the database');
      console.error('   • Verify the database exists and is not archived');
    } else if (error.code === 'unauthorized') {
      console.error('\n🔍 Troubleshooting:');
      console.error('   • Check your NOTION_TOKEN in .env.local');
      console.error('   • Make sure your integration has edit permissions');
      console.error('   • Verify the integration is connected to the right workspace');
    }
    
    process.exit(1);
  }
}

// Handle unhandled rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

addMissingProperties().catch(console.error);