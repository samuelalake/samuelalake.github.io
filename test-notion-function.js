#!/usr/bin/env node

/**
 * Test the getNotionProjects function
 */

require('dotenv').config({ path: '.env.local' });

// We need to compile the TypeScript first
const { execSync } = require('child_process');

async function testNotionFunction() {
  try {
    console.log('🔍 Testing getNotionProjects function...');
    
    // First, let's try to require the compiled version
    try {
      const { getNotionProjects } = require('./.next/server/pages/projects/index.js');
      console.log('✅ Found compiled function');
      
      const projects = await getNotionProjects();
      console.log('Projects found:', projects.length);
      projects.forEach(project => {
        console.log('-', project.title);
      });
      
    } catch (error) {
      console.log('❌ Could not load compiled function:', error.message);
      
      // Let's try a different approach - test the search directly
      console.log('\\n🔄 Testing search API directly...');
      
      const { Client } = require('@notionhq/client');
      const notion = new Client({ auth: process.env.NOTION_TOKEN });
      
      const response = await notion.search({
        query: '',
        filter: {
          property: 'object',
          value: 'page',
        },
        sort: {
          direction: 'descending',
          timestamp: 'last_edited_time',
        },
      });
      
      console.log('Search results:', response.results.length);
      
      // Filter like the function does
      const projectPages = response.results.filter((page) => 
        page.parent?.database_id === process.env.NOTION_PROJECTS_DATABASE_ID &&
        page.properties?.['Include in Portfolio']?.checkbox === true
      );
      
      console.log('Filtered projects:', projectPages.length);
      projectPages.forEach(page => {
        console.log('-', page.properties.Title?.title?.[0]?.plain_text);
      });
    }
    
  } catch (error) {
    console.error('Error:', error.message);
  }
}

testNotionFunction().catch(console.error);
