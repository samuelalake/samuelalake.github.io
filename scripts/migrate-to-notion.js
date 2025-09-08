#!/usr/bin/env node

/**
 * Migration script to move existing project data to Notion
 * Run with: node scripts/migrate-to-notion.js
 */

const { Client } = require('@notionhq/client');
const fs = require('fs');
const path = require('path');

// Load environment variables
require('dotenv').config({ path: '.env.local' });

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

// Your existing project data
const existingProjects = [
  {
    title: 'Composa',
    description: 'A comprehensive design system and component library built with React and TypeScript',
    brief: 'Composa is a design system that provides a consistent foundation for building user interfaces. It includes a comprehensive set of components, design tokens, and guidelines that ensure consistency across all products.',
    roadmap: 'Phase 1: Core components and tokens. Phase 2: Advanced components and theming. Phase 3: Documentation and developer tools. Phase 4: Community contributions and ecosystem.',
    tags: ['Design System', 'React', 'TypeScript', 'Storybook'],
    status: 'Published'
  },
  {
    title: 'Portfolio Website',
    description: 'A modern portfolio website built with Next.js, TypeScript, and Primer design system',
    brief: 'This portfolio website showcases my work and experience as a product designer and design engineer. Built with modern web technologies and following best practices for performance and accessibility.',
    roadmap: 'Phase 1: Basic structure and design. Phase 2: Content management and GitHub integration. Phase 3: Performance optimization. Phase 4: Advanced features and analytics.',
    tags: ['Next.js', 'TypeScript', 'Portfolio', 'Web Development'],
    status: 'Published'
  },
  {
    title: 'Mobile App',
    description: 'A React Native mobile application for task management and team collaboration',
    brief: 'A cross-platform mobile application that helps teams manage tasks, track progress, and collaborate effectively. Features include real-time updates, offline support, and intuitive user interface.',
    roadmap: 'Phase 1: Core functionality and basic UI. Phase 2: Real-time features and offline support. Phase 3: Advanced collaboration tools. Phase 4: Analytics and performance optimization.',
    tags: ['React Native', 'Mobile', 'Collaboration', 'Firebase'],
    status: 'Published'
  }
];

async function createNotionPages() {
  if (!process.env.NOTION_PROJECTS_DATABASE_ID) {
    console.error('❌ NOTION_PROJECTS_DATABASE_ID not found in environment variables');
    process.exit(1);
  }

  console.log('🚀 Starting migration to Notion...');

  for (const project of existingProjects) {
    try {
      console.log(`📝 Creating page for: ${project.title}`);

      // Create the main project page
      const response = await notion.pages.create({
        parent: {
          database_id: process.env.NOTION_PROJECTS_DATABASE_ID,
        },
        properties: {
          Title: {
            title: [
              {
                text: {
                  content: project.title,
                },
              },
            ],
          },
          Description: {
            rich_text: [
              {
                text: {
                  content: project.description,
                },
              },
            ],
          },
          Status: {
            select: {
              name: project.status,
            },
          },
          Tags: {
            multi_select: project.tags.map(tag => ({ name: tag })),
          },
          Slug: {
            rich_text: [
              {
                text: {
                  content: project.title.toLowerCase().replace(/\s+/g, '-'),
                },
              },
            ],
          },
          Published: {
            checkbox: true,
          },
        },
      });

      console.log(`✅ Created page: ${project.title} (${response.id})`);

      // Create brief page
      const briefPage = await notion.pages.create({
        parent: {
          page_id: response.id,
        },
        properties: {
          title: [
            {
              text: {
                content: 'Brief',
              },
            },
          ],
        },
      });

      // Add brief content
      await notion.blocks.children.append({
        block_id: briefPage.id,
        children: [
          {
            object: 'block',
            type: 'paragraph',
            paragraph: {
              rich_text: [
                {
                  type: 'text',
                  text: {
                    content: project.brief,
                  },
                },
              ],
            },
          },
        ],
      });

      // Create roadmap page
      const roadmapPage = await notion.pages.create({
        parent: {
          page_id: response.id,
        },
        properties: {
          title: [
            {
              text: {
                content: 'Roadmap',
              },
            },
          ],
        },
      });

      // Add roadmap content
      await notion.blocks.children.append({
        block_id: roadmapPage.id,
        children: [
          {
            object: 'block',
            type: 'paragraph',
            paragraph: {
              rich_text: [
                {
                  type: 'text',
                  text: {
                    content: project.roadmap,
                  },
                },
              ],
            },
          },
        ],
      });

      console.log(`📄 Added brief and roadmap pages for: ${project.title}`);

    } catch (error) {
      console.error(`❌ Error creating page for ${project.title}:`, error.message);
    }
  }

  console.log('🎉 Migration completed!');
  console.log('📋 Next steps:');
  console.log('1. Check your Notion database to verify the pages were created');
  console.log('2. Update your environment variables with the correct database ID');
  console.log('3. Test the CMS integration by visiting /projects-cms');
}

// Run the migration
createNotionPages().catch(console.error);
