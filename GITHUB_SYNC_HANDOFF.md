# GitHub Issues to Notion Tasks Sync - Handoff Prompt

## Project Context
You're working on a Next.js portfolio website that syncs GitHub issues to Notion tasks and displays them as roadmaps. The user's content source is Notion, and GitHub issues are synced TO Notion (not the other way around).

## Current Status
✅ **COMPLETED:**
- Portfolio projects page is working and displaying projects from Notion
- Notion API integration is functional
- GitHub API integration is set up
- Sync scripts are created but not working properly
- User has 1 project ("Composa") marked as "Include in Portfolio" in Notion

❌ **CURRENT ISSUE:**
- GitHub issues are NOT syncing to Notion Tasks database
- Roadmap tabs show empty (no GitHub issues displayed)

## Project Structure
```
portfolio-site/
├── src/
│   ├── lib/
│   │   ├── notion.ts                    # Notion API client
│   │   ├── github-tasks-sync.ts         # Core sync logic
│   │   └── auto-sync.ts                 # Auto-discovery sync
│   └── pages/
│       └── projects/
│           ├── index.tsx                # Projects listing (WORKING)
│           └── [slug].tsx               # Project detail with roadmap
├── scripts/
│   ├── sync-github-to-notion.js         # Manual sync script
│   └── auto-sync-from-notion.js         # Auto sync script
└── .env.local                           # Environment variables
```

## Environment Variables (in .env.local)
```bash
NOTION_TOKEN=your_notion_token
NOTION_PROJECTS_DATABASE_ID=72954743-db58-4a4f-9ecd-16e7c8a0f270
NOTION_TASKS_DATABASE_ID=2696663d-75d9-8027-babc-f75791c20e80
GITHUB_TOKEN=your_github_token
GITHUB_USERNAME=your_username
```

## Notion Database Schema Required

### Projects Database (WORKING)
- Title (title)
- Description (rich_text)
- Type (select)
- Status (select)
- Include in Portfolio (checkbox) ✅
- Primary Repository (url)

### Tasks Database (NEEDS SETUP)
The user needs to create these properties in their Notion Tasks database:
- **Title** (title) - Required
- **Description** (rich_text) - Required
- **Status** (status) - Required
- **Priority** (select) - Required
- **Labels** (multi_select) - Required
- **Source** (select) - Required
- **Due Date** (date) - Optional
- **Project** (relation to Projects database) - Required
- **GitHub Issue Number** (number) - Required
- **GitHub Repository** (rich_text) - Required
- **GitHub URL** (url) - Required

## Current Issues to Fix

### 1. Notion Tasks Database Schema
The user's Notion Tasks database is missing the required properties. When trying to create tasks, you get errors like:
```
Title is not a property that exists
Description is not a property that exists
Status is expected to be status
Source is not a property that exists
```

**SOLUTION:** Guide the user to add all the required properties listed above to their Notion Tasks database.

### 2. Sync Scripts Not Working
The sync scripts exist but aren't successfully creating tasks in Notion.

**FILES TO CHECK:**
- `scripts/sync-github-to-notion.js` - Manual sync
- `scripts/auto-sync-from-notion.js` - Auto sync
- `src/lib/github-tasks-sync.ts` - Core sync logic

### 3. Project-GitHub Repository Mapping
The system needs to:
1. Get projects from Notion Projects database
2. Extract GitHub repository URLs from the "Primary Repository" field
3. Fetch GitHub issues from those repositories
4. Create Notion tasks for each GitHub issue
5. Link tasks to the correct project

## Testing Commands

### Test Notion Connection
```bash
node debug-notion.js
```

### Test GitHub Issues Fetch
```bash
node -e "
require('dotenv').config({ path: '.env.local' });
const { Octokit } = require('@octokit/rest');
const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

async function testGitHub() {
  try {
    const issues = await octokit.rest.issues.listForRepo({
      owner: 'your_username',
      repo: 'your_repo',
      state: 'all'
    });
    console.log('GitHub issues found:', issues.data.length);
  } catch (error) {
    console.error('GitHub error:', error.message);
  }
}
testGitHub();
"
```

### Test Manual Sync
```bash
node scripts/sync-github-to-notion.js
```

## Expected Workflow
1. User creates a project in Notion Projects database
2. User adds GitHub repository URL to "Primary Repository" field
3. User marks project as "Include in Portfolio"
4. Sync script runs and:
   - Fetches GitHub issues from the repository
   - Creates Notion tasks for each issue
   - Links tasks to the project
5. Portfolio roadmap tab displays the tasks

## Key Files to Focus On
1. **`src/lib/github-tasks-sync.ts`** - Core sync logic
2. **`scripts/sync-github-to-notion.js`** - Manual sync script
3. **`src/pages/projects/[slug].tsx`** - Project detail page with roadmap
4. **`src/components/RoadmapView.tsx`** - Roadmap display component

## User's Current Project
- **Project Name:** Composa
- **Description:** An app for editing video
- **Type:** Code Project
- **Status:** Active
- **Include in Portfolio:** ✅ true
- **Primary Repository:** (needs to be set)

## Next Steps
1. Help user set up Notion Tasks database schema
2. Fix sync scripts to properly create tasks
3. Test the complete workflow
4. Verify roadmap tabs display GitHub issues

## Notes
- The portfolio is using Next.js with static export
- UI components are from Primer React
- All API calls are server-side (getStaticProps)
- The user wants to see GitHub issues in the roadmap tab of each project
