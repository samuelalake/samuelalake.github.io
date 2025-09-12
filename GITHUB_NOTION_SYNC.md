# GitHub Issues to Notion Tasks Sync Setup

This guide will help you set up the GitHub Issues to Notion Tasks sync system for your portfolio.

## 🎯 Overview

This system syncs your GitHub issues directly into your Notion Tasks database, allowing you to:
- **Manage all work** in one place (Notion)
- **Show development progress** on your portfolio
- **Enable calendar time-blocking** for GitHub issues
- **Create portfolio roadmaps** from real development work

## 📋 Prerequisites

### 1. Notion Setup
You need a **Tasks database** in Notion with these properties:

#### Required Properties:
- **Title** (Title) - Task name
- **Description** (Rich Text) - Task description  
- **Status** (Select) - Options: "To Do", "In Progress", "Done"
- **Priority** (Select) - Options: "Urgent", "High", "Medium", "Low"
- **Labels** (Multi-select) - For categorization
- **Source** (Select) - Options: "Manual", "GitHub"

#### GitHub Integration Properties:
- **GitHub Issue Number** (Number) - Issue number
- **GitHub Repository** (Rich Text) - Repository name
- **GitHub URL** (URL) - Link to GitHub issue

#### Optional Properties:
- **Due Date** (Date) - Task due date
- **Project** (Relation) - Link to Projects database

### 2. GitHub Access
- GitHub Personal Access Token with `repo` scope
- Repository access for the repos you want to sync

## 🔧 Installation & Setup

### Step 1: Environment Configuration

1. **Copy the example environment file**:
   ```bash
   cp env.cms.example .env.local
   ```

2. **Configure your environment variables** in `.env.local`:
   ```env
   # Notion Integration
   NOTION_TOKEN=your_notion_integration_token_here
   NOTION_TASKS_DATABASE_ID=your_tasks_database_id_here
   NOTION_PROJECTS_DATABASE_ID=your_projects_database_id_here
   
   # GitHub Integration  
   GITHUB_TOKEN=your_github_personal_access_token_here
   GITHUB_USERNAME=your_github_username_here
   
   # CMS Configuration
   CMS_PROVIDER=hybrid
   ```

### Step 2: Get Notion Integration Token

1. Go to [Notion Integrations](https://www.notion.so/my-integrations)
2. Click "New integration"
3. Give it a name (e.g., "Portfolio Tasks Sync")
4. Select your workspace
5. Copy the "Internal Integration Token"

### Step 3: Get Notion Database IDs

1. Open your Tasks database in Notion
2. Copy the URL: `https://notion.so/your-workspace/DATABASE_ID?v=...`
3. The DATABASE_ID is the 32-character string before the `?`
4. Repeat for your Projects database

### Step 4: Share Databases with Integration

1. In each database, click "Share"
2. Click "Add people, emails, groups, or integrations"
3. Search for your integration name
4. Select it and give "Can edit" permission

### Step 5: GitHub Personal Access Token

1. Go to [GitHub Settings > Developer settings > Personal access tokens](https://github.com/settings/tokens)
2. Click "Generate new token (classic)"
3. Give it a name (e.g., "Portfolio Sync")
4. Select scope: `repo` (full control of private repositories)
5. Copy the token

## 🚀 Usage

### Manual Sync

Sync all GitHub issues across all repositories:
```bash
npm run sync:github-to-notion
```

Sync issues from a specific repository:
```bash
npm run sync:project my-repo-name
```

### Programmatic Usage

```typescript
import { syncAllGitHubIssuesToNotionTasks, syncGitHubIssuesToNotionTasks } from './src/lib/github-tasks-sync';

// Sync all issues
const result = await syncAllGitHubIssuesToNotionTasks();

// Sync specific project
const result = await syncGitHubIssuesToNotionTasks('my-repo-name', 'notion-project-id');
```

## 📊 Portfolio Integration

### Roadmap Display

Your project pages now include an enhanced roadmap view that shows:
- **Kanban board** by status (To Do, In Progress, Done)
- **Priority grouping** (Urgent, High, Medium, Low)
- **Source filtering** (GitHub issues vs manual tasks)
- **Interactive task cards** with links back to GitHub

### API Endpoint

Access roadmap data programmatically:
```
GET /api/roadmap?project=project-slug
```

## 🔄 Sync Process

### What Gets Synced

1. **Issue Details**: Title, description, state, labels
2. **Priority Mapping**: Based on GitHub labels
3. **Status Mapping**: 
   - Open issues → "To Do"
   - Issues with in-progress labels → "In Progress"
   - Closed issues → "Done"
4. **Metadata**: Issue number, repository, GitHub URL

### Priority Mapping

GitHub labels are mapped to Notion priorities:
- `urgent`, `critical` → Urgent
- `high`, `important`, `bug` → High  
- `medium`, `enhancement`, `feature` → Medium
- `low`, `documentation` → Low
- Default → Medium

### Duplicate Prevention

The sync system prevents duplicates by checking:
- GitHub issue number + repository name combination
- Only creates new tasks if this combination doesn't exist

## 📅 Calendar Integration

After syncing, your GitHub issues appear in Notion as tasks that can be:
- **Time-blocked** in your calendar
- **Scheduled** with due dates
- **Prioritized** for daily planning
- **Tracked** for progress reporting

## 🛠 Troubleshooting

### Common Issues

1. **"No tasks found"**
   - Check environment variables are set correctly
   - Verify Notion integration has access to database
   - Ensure GitHub token has repo access

2. **"Invalid token"**
   - Regenerate GitHub token
   - Check Notion integration token

3. **"Database not found"**
   - Verify database IDs are correct
   - Check integration permissions

### Debug Mode

Add to `.env.local` for detailed logging:
```env
DEBUG_CMS=true
```

### Sync Status

The sync script provides detailed output:
- Total tasks processed
- New tasks created  
- Existing tasks updated
- Any errors encountered

## 🔮 Future Enhancements

### Planned Features

1. **Webhook Integration** - Real-time sync when issues change
2. **Bidirectional Sync** - Update GitHub from Notion changes
3. **Comment Sync** - Sync issue comments to Notion
4. **Milestone Integration** - Sync GitHub milestones
5. **Automated Calendar Blocking** - Auto-schedule synced tasks

### Advanced Configuration

```env
# Sync frequency (for future webhook integration)
SYNC_FREQUENCY=hourly

# Issue filters
SYNC_ISSUE_LABELS=bug,feature,enhancement
SYNC_REPOSITORIES=repo1,repo2

# Calendar integration
CALENDAR_AUTO_BLOCK=true
CALENDAR_DEFAULT_DURATION=60
```

## 📞 Support

If you encounter issues:
1. Check the troubleshooting section above
2. Review the sync script logs
3. Verify all environment variables
4. Test with a small repository first

## 🎉 You're All Set!

Once configured, you'll have:
✅ **Unified task management** in Notion
✅ **Portfolio roadmaps** showing real development work  
✅ **Calendar-ready tasks** for time blocking
✅ **Professional project presentation** for potential clients

Your GitHub issues will now seamlessly flow into your Notion workspace and appear on your portfolio as evidence of your development process!