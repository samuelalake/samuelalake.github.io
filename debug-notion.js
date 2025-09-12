#!/usr/bin/env node

/**
 * Debug Notion Projects database
 */

require('dotenv').config({ path: '.env.local' });

const { Client } = require('@notionhq/client');

async function debugNotionProjects() {
  const notion = new Client({
    auth: process.env.NOTION_TOKEN,
  });
  
  try {
    console.log('🔍 Debugging Notion Projects database...');
    console.log('Projects Database ID:', process.env.NOTION_PROJECTS_DATABASE_ID);
    
    // Try to get the database info first
    const db = await notion.databases.retrieve({
      database_id: process.env.NOTION_PROJECTS_DATABASE_ID
    });
    
    console.log('Database title:', db.title[0]?.plain_text);
    console.log('Database properties:');
    if (db.properties) {
      Object.keys(db.properties).forEach(key => {
        const prop = db.properties[key];
        console.log(`  - ${key}: ${prop.type}`);
      });
    } else {
      console.log('  No properties found');
    }
    
    // Now try to get pages using a different approach
    console.log('\n📄 Trying to get pages...');
    
    // Use the search API with proper format
    const response = await notion.search({
      filter: {
        property: 'object',
        value: 'page',
      },
    });
    
    console.log(`Found ${response.results.length} total pages`);
    
    // Filter pages that belong to our projects database
    const projectPages = response.results.filter((page) => 
      page.parent?.database_id === process.env.NOTION_PROJECTS_DATABASE_ID
    );
    
    console.log(`Found ${projectPages.length} pages in Projects database`);
    
    if (projectPages.length === 0) {
      console.log('\n❌ No projects found in the database!');
      console.log('Make sure:');
      console.log('1. The database ID is correct');
      console.log('2. The database is shared with your integration');
      console.log('3. There are pages in the database');
      return;
    }
    
    projectPages.forEach((page, index) => {
      const props = page.properties;
      console.log(`\n📋 Project ${index + 1}:`);
      console.log(`  Title: ${props.Title?.title?.[0]?.plain_text || 'No title'}`);
      console.log(`  Include in Portfolio: ${props['Include in Portfolio']?.checkbox}`);
      console.log(`  Status: ${props.Status?.select?.name || 'No status'}`);
      console.log(`  Type: ${props.Type?.select?.name || 'No type'}`);
      
      // Check if this project would be included
      const isIncluded = props['Include in Portfolio']?.checkbox === true;
      console.log(`  ✅ Would be included: ${isIncluded}`);
    });
    
    const includedProjects = projectPages.filter(page => 
      page.properties?.['Include in Portfolio']?.checkbox === true
    );
    
    console.log(`\n📊 Summary:`);
    console.log(`  Total projects: ${projectPages.length}`);
    console.log(`  Included in portfolio: ${includedProjects.length}`);
    
    if (includedProjects.length === 0) {
      console.log('\n💡 To fix this:');
      console.log('1. Go to your Notion Projects database');
      console.log('2. Find the "Include in Portfolio" column');
      console.log('3. Check the box for projects you want to show');
      console.log('4. Or create a new project and make sure to check "Include in Portfolio"');
    }
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    if (error.code === 'object_not_found') {
      console.log('\n💡 The database might not be shared with your integration.');
      console.log('Make sure to share your Projects database with your Notion integration.');
    }
  }
}

debugNotionProjects().catch(console.error);
