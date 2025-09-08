#!/usr/bin/env node

/**
 * Migration script to create GitHub repositories for existing projects
 * Run with: node scripts/migrate-to-github.js
 */

const { Octokit } = require('@octokit/rest');
const fs = require('fs');
const path = require('path');

// Load environment variables
require('dotenv').config({ path: '.env.local' });

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

// Your existing project data
const existingProjects = [
  {
    name: 'composa',
    title: 'Composa',
    description: 'A comprehensive design system and component library built with React and TypeScript',
    brief: `# Composa Design System

## Overview
Composa is a comprehensive design system and component library built with React and TypeScript. It provides a consistent foundation for building user interfaces across all products.

## Key Features

### 🎨 Design Tokens
- **Color System**: Comprehensive color palette with semantic naming
- **Typography**: Scalable type system with consistent spacing
- **Spacing**: 8px grid system for consistent layouts
- **Shadows**: Layered shadow system for depth

### 🧩 Component Library
- **Primitive Components**: Button, Input, Select, Modal, etc.
- **Composite Components**: Card, Form, Navigation, etc.
- **Layout Components**: Grid, Stack, Container, etc.

### 🔧 Developer Experience
- **TypeScript Support**: Full type safety and IntelliSense
- **Storybook Integration**: Interactive component documentation
- **Accessibility**: WCAG 2.1 AA compliant components
- **Testing**: Comprehensive test coverage`,
    roadmap: `# Composa Roadmap

## Phase 1: Foundation (Q1 2024) ✅
- [x] Design token system implementation
- [x] Core primitive components (Button, Input, Select)
- [x] Basic documentation setup
- [x] TypeScript configuration
- [x] Initial Storybook setup

## Phase 2: Core Components (Q2 2024) ✅
- [x] Layout components (Grid, Stack, Container)
- [x] Form components (FormField, Checkbox, Radio)
- [x] Navigation components (Tabs, Breadcrumb)
- [x] Feedback components (Alert, Toast, Spinner)
- [x] Advanced documentation with examples

## Phase 3: Advanced Features (Q3 2024) 🚧
- [ ] Theming system with multiple color schemes
- [ ] Dark mode support
- [ ] Animation and transition system
- [ ] Advanced form validation
- [ ] Data visualization components (Charts, Tables)`,
    topics: ['design-system', 'react', 'typescript', 'storybook', 'ui-components']
  },
  {
    name: 'portfolio-site',
    title: 'Portfolio Website',
    description: 'A modern portfolio website built with Next.js, TypeScript, and Primer design system',
    brief: `# Portfolio Website

## Overview
A modern portfolio website built with Next.js, TypeScript, and Primer design system. This website showcases my work and experience as a product designer and design engineer, following best practices for performance and accessibility.

## Key Features

### 🚀 Performance
- **Static Site Generation**: Pre-rendered pages for optimal performance
- **Image Optimization**: Next.js Image component with automatic optimization
- **Code Splitting**: Automatic code splitting for faster page loads
- **Lighthouse Score**: 95+ across all metrics

### 🎨 Design System
- **Primer Components**: GitHub's design system for consistency
- **Responsive Design**: Mobile-first approach with breakpoints
- **Dark Mode**: System preference detection with manual toggle
- **Typography**: Inter font family for optimal readability`,
    roadmap: `# Portfolio Website Roadmap

## Phase 1: Foundation (Completed) ✅
- [x] Next.js project setup with TypeScript
- [x] Primer design system integration
- [x] Basic page structure and routing
- [x] Responsive layout implementation
- [x] GitHub Pages deployment setup

## Phase 2: Content & Features (Completed) ✅
- [x] Project showcase pages with dynamic routing
- [x] Publication and blog section
- [x] GitHub activity integration
- [x] SEO optimization and meta tags
- [x] Performance optimization

## Phase 3: Enhanced Content (In Progress) 🚧
- [ ] Rich markdown content for project briefs
- [ ] Interactive project timelines
- [ ] Image galleries and media content
- [ ] Advanced filtering and search
- [ ] Contact form integration`,
    topics: ['nextjs', 'typescript', 'portfolio', 'web-development', 'primer']
  },
  {
    name: 'mobile-app',
    title: 'Mobile App',
    description: 'A React Native mobile application for task management and team collaboration',
    brief: `# Mobile App

## Overview
A cross-platform mobile application that helps teams manage tasks, track progress, and collaborate effectively. Features include real-time updates, offline support, and intuitive user interface.

## Key Features

### 📱 Cross-Platform
- **React Native**: Single codebase for iOS and Android
- **Native Performance**: Optimized for mobile devices
- **Offline Support**: Works without internet connection
- **Push Notifications**: Real-time updates and reminders

### 🤝 Collaboration
- **Team Management**: Invite and manage team members
- **Real-time Sync**: Instant updates across all devices
- **Comment System**: Discuss tasks and projects
- **File Sharing**: Share documents and media

### 🎯 Task Management
- **Project Organization**: Group tasks by projects
- **Priority Levels**: High, medium, low priority tasks
- **Due Dates**: Set and track deadlines
- **Progress Tracking**: Visual progress indicators`,
    roadmap: `# Mobile App Roadmap

## Phase 1: Core Functionality (Q1 2024) ✅
- [x] User authentication and registration
- [x] Basic task creation and management
- [x] Project organization
- [x] User interface design
- [x] Local data storage

## Phase 2: Real-time Features (Q2 2024) 🚧
- [ ] Real-time synchronization
- [ ] Push notifications
- [ ] Team collaboration features
- [ ] Comment system
- [ ] File sharing

## Phase 3: Advanced Features (Q3 2024) 📋
- [ ] Offline support
- [ ] Advanced analytics
- [ ] Custom themes
- [ ] Integration with external tools
- [ ] Advanced reporting`,
    topics: ['react-native', 'mobile', 'collaboration', 'firebase', 'task-management']
  }
];

async function createGitHubRepositories() {
  if (!process.env.GITHUB_TOKEN || !process.env.GITHUB_USERNAME) {
    console.error('❌ GITHUB_TOKEN or GITHUB_USERNAME not found in environment variables');
    process.exit(1);
  }

  console.log('🚀 Starting migration to GitHub...');

  for (const project of existingProjects) {
    try {
      console.log(`📝 Creating repository for: ${project.title}`);

      // Create repository
      const repo = await octokit.repos.createForAuthenticatedUser({
        name: project.name,
        description: project.description,
        private: false,
        auto_init: true,
        gitignore_template: 'Node',
        topics: project.topics,
      });

      console.log(`✅ Created repository: ${project.title} (${repo.data.html_url})`);

      // Wait a moment for the repository to be fully created
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Create BRIEF.md
      await octokit.repos.createOrUpdateFileContents({
        owner: process.env.GITHUB_USERNAME,
        repo: project.name,
        path: 'BRIEF.md',
        message: 'Add project brief',
        content: Buffer.from(project.brief).toString('base64'),
      });

      // Create ROADMAP.md
      await octokit.repos.createOrUpdateFileContents({
        owner: process.env.GITHUB_USERNAME,
        repo: project.name,
        path: 'ROADMAP.md',
        message: 'Add project roadmap',
        content: Buffer.from(project.roadmap).toString('base64'),
      });

      // Update README.md
      const readmeContent = `# ${project.title}

${project.description}

## 📋 Brief
See [BRIEF.md](./BRIEF.md) for detailed project information.

## 🗺️ Roadmap
See [ROADMAP.md](./ROADMAP.md) for project roadmap and milestones.

## 🚀 Getting Started
\`\`\`bash
# Clone the repository
git clone https://github.com/${process.env.GITHUB_USERNAME}/${project.name}.git

# Install dependencies
npm install

# Start development server
npm run dev
\`\`\`

## 📄 License
This project is licensed under the MIT License.`;

      await octokit.repos.createOrUpdateFileContents({
        owner: process.env.GITHUB_USERNAME,
        repo: project.name,
        path: 'README.md',
        message: 'Update README with project information',
        content: Buffer.from(readmeContent).toString('base64'),
      });

      console.log(`📄 Added content files for: ${project.title}`);

    } catch (error) {
      if (error.status === 422) {
        console.log(`⚠️  Repository ${project.name} already exists, skipping...`);
      } else {
        console.error(`❌ Error creating repository for ${project.title}:`, error.message);
      }
    }
  }

  console.log('🎉 Migration completed!');
  console.log('📋 Next steps:');
  console.log('1. Check your GitHub profile to verify the repositories were created');
  console.log('2. Update your environment variables with your GitHub username');
  console.log('3. Test the CMS integration by visiting /projects-cms');
}

// Run the migration
createGitHubRepositories().catch(console.error);
