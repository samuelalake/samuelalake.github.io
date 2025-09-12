# Claude Code Prompt: Fix GitHub Issues to Notion Tasks Sync

## Context
I have a Next.js portfolio website that syncs GitHub issues to Notion tasks. The sync is not working because the sync scripts are using property names that don't exist in my Notion Tasks database.

## Current Status
✅ **Working:**
- Node.js Notion client can connect and create tasks
- Notion Tasks database exists and has permissions
- Portfolio projects page displays correctly
- Environment variables are loaded properly

❌ **Not Working:**
- GitHub issues are not syncing to Notion tasks
- Sync scripts fail because of property name mismatches

## My Notion Tasks Database Structure
**Database ID:** `2696663d-75d9-8027-babc-f75791c20e80`

**Existing Properties:**
- `Task` (title) - The task name
- `Status` (status) - To-do, Doing, Paused, Done
- `Priority` (select) - Reminder, Meeting, Pri 1, Pri 2, Pri 3
- `Projects` (relation) - Links to Projects database
- `Include in Portfolio` (checkbox) - Whether to show in portfolio
- `Due` (date) - Due date
- `Assignee` (person) - Who's assigned
- `Focus Type` (select) - Creative, Calls, Admin, Deep work
- `Phase` (select) - Ideate & Refine, Understand & Define
- `Estimates` (select) - 15m, 20m, 30m, 1h, 2h
- `Planned` (date) - Planned date
- `Preferred Times` (multi_select) - Evening, Afternoon, Morning
- `Days` (multi_select) - Days of the week
- `Recur Interval` (number) - Recurrence interval
- `Recur Unit` (select) - Days, Weeks, Months, etc.
- `Scheduling Status` (select) - Scheduled, Rescheduled, etc.
- `Scheduling Message` (text) - Scheduling message
- `Task ID` (auto_increment_id) - Auto-generated ID
- `Created time` (created_time) - Auto-generated
- `Last edited time` (last_edited_time) - Auto-generated
- `Blocked by` (relation) - Self-referencing relation
- `Blocking` (relation) - Self-referencing relation
- `Parent item` (relation) - Self-referencing relation
- `Sub-tasks` (relation) - Self-referencing relation
- `Generated Activities` (relation) - Links to Activities database
- `Domain` (rollup) - Rollup property
- `Due Date Status` (formula) - Formula property
- `Planned Date Status` (formula) - Formula property
- `Process Status` (formula) - Formula property
- `Processing Reason` (formula) - Formula property
- `Next Due` (formula) - Formula property
- `Localization Key` (formula) - Formula property

## Missing Properties Needed for GitHub Sync
The sync scripts expect these properties that don't exist:
- `Description` (rich_text) - Issue description
- `Labels` (multi_select) - GitHub labels
- `Source` (select) - Source of the task (GitHub, Manual, etc.)
- `GitHub Issue Number` (number) - GitHub issue number
- `GitHub Repository` (rich_text) - Repository name
- `GitHub URL` (url) - Link to GitHub issue

## Current Sync Scripts
**Main sync logic:** `src/lib/github-tasks-sync.ts`
**Notion client:** `src/lib/notion.ts`
**Manual sync script:** `scripts/sync-github-to-notion.js`
**Auto sync script:** `scripts/auto-sync-from-notion.js`

## What I Need
1. **Add the 6 missing properties** to my Notion Tasks database
2. **Fix the sync scripts** to work with my database structure
3. **Test the complete sync workflow** from GitHub issues to Notion tasks

## Environment Variables
```bash
NOTION_TOKEN=ntn_274851...
NOTION_PROJECTS_DATABASE_ID=72954743-db58-4a4f-9ecd-16e7a0f270
NOTION_TASKS_DATABASE_ID=2696663d-75d9-8027-babc-f75791c20e80
GITHUB_TOKEN=your_github_token
GITHUB_USERNAME=your_username
```

## Expected Workflow
1. User creates project in Notion Projects database
2. User adds GitHub repository URL to "Primary Repository" field
3. User marks project as "Include in Portfolio"
4. Sync script runs and:
   - Fetches GitHub issues from the repository
   - Creates Notion tasks for each issue
   - Links tasks to the project
5. Portfolio roadmap tab displays the tasks

## Current Project
- **Project Name:** Composa
- **Description:** An app for editing video
- **GitHub Repository:** https://github.com/Composa-App/Composa
- **Include in Portfolio:** ✅ true

## Files to Focus On
- `src/lib/github-tasks-sync.ts` - Core sync logic
- `src/lib/notion.ts` - Notion API client
- `scripts/sync-github-to-notion.js` - Manual sync script
- `src/pages/projects/[slug].tsx` - Project detail page with roadmap
- `src/components/RoadmapView.tsx` - Roadmap display component

## What I Want You to Do
1. **Create a script to add the missing properties** to my Notion Tasks database
2. **Update the sync scripts** to use the correct property names
3. **Test the sync functionality** with my Composa project
4. **Verify the roadmap display** shows GitHub issues

## Notes
- The portfolio uses Next.js with static export
- UI components are from Primer React
- All API calls are server-side (getStaticProps)
- The user wants to see GitHub issues in the roadmap tab of each project
- My content source is Notion, GitHub issues sync TO Notion (not the other way around)

## Test Commands
```bash
# Test Notion connection
node -e "require('dotenv').config({ path: '.env.local' }); const { Client } = require('@notionhq/client'); const notion = new Client({ auth: process.env.NOTION_TOKEN }); notion.databases.retrieve({ database_id: process.env.NOTION_TASKS_DATABASE_ID }).then(db => console.log('Database:', db.title[0]?.plain_text)).catch(console.error);"

# Test GitHub connection
node -e "require('dotenv').config({ path: '.env.local' }); const { Octokit } = require('@octokit/rest'); const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN }); octokit.rest.issues.listForRepo({ owner: 'Composa-App', repo: 'Composa', state: 'all' }).then(issues => console.log('GitHub issues:', issues.data.length)).catch(console.error);"
```

Please help me fix this GitHub Issues to Notion Tasks synchronization system!
