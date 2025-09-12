# GitHub Actions Setup Guide

## 🤖 **Automatic GitHub Issues to Notion Sync**

This guide shows you how to set up automatic syncing so you never have to run sync commands manually!

## 📋 **Setup Steps**

### **Step 1: Add GitHub Secrets**
Go to your GitHub repository → Settings → Secrets and variables → Actions

Add these secrets:
- `NOTION_TOKEN` - Your Notion integration token
- `NOTION_PROJECTS_DATABASE_ID` - Your Projects database ID
- `NOTION_TASKS_DATABASE_ID` - Your Tasks database ID
- `GITHUB_TOKEN` - Use the default `GITHUB_TOKEN` (automatically provided)
- `GITHUB_USERNAME` - Your GitHub username

### **Step 2: Commit the Workflow Files**
The workflow files are already created:
- `.github/workflows/sync-github-to-notion.yml` - Scheduled sync (daily)
- `.github/workflows/sync-on-issue-change.yml` - Real-time sync on issue changes

### **Step 3: Push to GitHub**
```bash
git add .
git commit -m "feat: Add GitHub Actions for automatic sync"
git push
```

## 🚀 **How It Works**

### **Automatic Triggers:**
1. **Daily at 9 AM UTC** - Syncs all projects
2. **When issues are created/updated** - Syncs immediately
3. **When pull requests change** - Syncs immediately
4. **Manual trigger** - You can run it manually from GitHub Actions tab

### **What Happens:**
1. GitHub Action runs automatically
2. Fetches all your Notion projects with GitHub repos
3. Syncs all GitHub issues to Notion tasks
4. Updates your portfolio automatically
5. Commits any changes back to your repo

## 📊 **Monitoring**

### **Check Status:**
- Go to your GitHub repo → Actions tab
- See all sync runs and their status
- View logs if something goes wrong

### **Manual Trigger:**
- Go to Actions → "Sync GitHub Issues to Notion"
- Click "Run workflow" button
- Select branch and click "Run workflow"

## ⚙️ **Configuration Options**

### **Change Sync Frequency:**
Edit `.github/workflows/sync-github-to-notion.yml`:
```yaml
schedule:
  - cron: '0 9 * * *'  # Daily at 9 AM UTC
  - cron: '0 */6 * * *'  # Every 6 hours
  - cron: '0 0 * * 1'  # Weekly on Monday
```

### **Disable Real-time Sync:**
Delete `.github/workflows/sync-on-issue-change.yml` if you only want scheduled sync.

## 🎯 **Benefits**

✅ **Zero maintenance** - Runs automatically  
✅ **Real-time updates** - Issues sync immediately  
✅ **Always up-to-date** - Portfolio stays current  
✅ **No manual work** - Set it and forget it  
✅ **Reliable** - GitHub's infrastructure  

## 🔧 **Troubleshooting**

### **If sync fails:**
1. Check GitHub Actions logs
2. Verify all secrets are set correctly
3. Make sure your Notion integration has access to databases
4. Check if GitHub repo URLs are correct in Notion

### **If you want to disable:**
1. Go to Actions tab
2. Click on the workflow
3. Click "Disable workflow"

## 🚀 **Ready to Go!**

Once you push these files, your sync will start working automatically! No more manual commands needed.

Your portfolio will always stay up-to-date with your GitHub issues! 🎉
