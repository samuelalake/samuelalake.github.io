# CMS Integration Setup Guide

This guide will help you set up either Notion or GitHub as a CMS for your portfolio.

## 🚀 Quick Start

### Option 1: Notion CMS (Recommended)

#### 1. Create Notion Integration
1. Go to [Notion Integrations](https://www.notion.so/my-integrations)
2. Click "New integration"
3. Give it a name (e.g., "Portfolio CMS")
4. Select your workspace
5. Copy the "Internal Integration Token"

#### 2. Create Projects Database
1. Create a new Notion page
2. Add a database with these properties:
   - **Title** (Title) - Project name
   - **Description** (Rich Text) - Short description
   - **Brief** (Page) - Link to brief page
   - **Roadmap** (Page) - Link to roadmap page
   - **Status** (Select) - Draft, In Progress, Published
   - **Tags** (Multi-select) - Technology tags
   - **Slug** (Rich Text) - URL slug
   - **Published** (Checkbox) - Whether to show on site
   - **Cover** (Files) - Project cover image
   - **Created** (Created time)
   - **Last edited** (Last edited time)

#### 3. Create Blog Database (Optional)
1. Create another database with:
   - **Title** (Title) - Post title
   - **Excerpt** (Rich Text) - Short description
   - **Content** (Page) - Link to content page
   - **Published Date** (Date) - When published
   - **Tags** (Multi-select) - Post tags
   - **Slug** (Rich Text) - URL slug
   - **Published** (Checkbox) - Whether to show on site

#### 4. Share Databases
1. Click "Share" on each database
2. Click "Add people, emails, groups, or integrations"
3. Search for your integration name
4. Select it and give "Can read" permission

#### 5. Get Database IDs
1. Open each database in Notion
2. Copy the URL: `https://notion.so/your-workspace/DATABASE_ID?v=...`
3. The DATABASE_ID is the 32-character string before the `?`

### Option 2: GitHub CMS

#### 1. Create GitHub Personal Access Token
1. Go to [GitHub Settings > Developer settings > Personal access tokens](https://github.com/settings/tokens)
2. Click "Generate new token (classic)"
3. Give it a name (e.g., "Portfolio CMS")
4. Select scopes: `repo` (full control of private repositories)
5. Copy the token

#### 2. Set Up Repository Structure
```
your-repo/
├── README.md
├── BRIEF.md (optional)
├── ROADMAP.md (optional)
└── docs/
    ├── brief.md (optional)
    └── roadmap.md (optional)
```

#### 3. For Blog Posts (Optional)
Create a separate repository for blog posts:
```
blog-repo/
└── posts/
    ├── post-1.md
    ├── post-2.md
    └── ...
```

## 🔧 Environment Configuration

Create a `.env.local` file in your project root:

```bash
# Copy from env.cms.example
cp env.cms.example .env.local
```

Then edit `.env.local` with your credentials:

### For Notion:
```env
NOTION_TOKEN=your_notion_integration_token_here
NOTION_PROJECTS_DATABASE_ID=your_projects_database_id_here
NOTION_BLOG_DATABASE_ID=your_blog_database_id_here
CMS_PROVIDER=notion
```

### For GitHub:
```env
GITHUB_TOKEN=your_github_personal_access_token_here
GITHUB_USERNAME=your_github_username_here
CMS_PROVIDER=github
```

### For Hybrid (Both):
```env
NOTION_TOKEN=your_notion_integration_token_here
NOTION_PROJECTS_DATABASE_ID=your_projects_database_id_here
GITHUB_TOKEN=your_github_personal_access_token_here
GITHUB_USERNAME=your_github_username_here
CMS_PROVIDER=hybrid
```

## 📝 Content Management

### Notion Workflow
1. **Add Project**: Create new page in Projects database
2. **Write Brief**: Create linked page for detailed brief
3. **Write Roadmap**: Create linked page for roadmap
4. **Publish**: Check "Published" checkbox
5. **Update**: Edit content in Notion, changes appear on site

### GitHub Workflow
1. **Add Project**: Create new repository
2. **Write Content**: Add BRIEF.md and ROADMAP.md files
3. **Update**: Push changes to repository
4. **Blog Posts**: Add markdown files to blog repository

## 🎨 Customization

### Styling
- Edit `src/pages/projects-cms.tsx` for project card styling
- Modify `src/lib/cms.ts` for data transformation
- Update `src/lib/notion.ts` or `src/lib/github-cms.ts` for API customization

### Content Types
- Add new properties to Notion databases
- Extend the `UnifiedProject` interface in `src/lib/cms.ts`
- Update the conversion functions

## 🚀 Deployment

### Vercel
1. Add environment variables in Vercel dashboard
2. Deploy - CMS content will be fetched at build time

### GitHub Pages
1. Add environment variables as GitHub Secrets
2. Update GitHub Actions workflow to use secrets
3. Deploy - CMS content will be fetched at build time

## 🔍 Troubleshooting

### Common Issues

1. **"No projects found"**
   - Check environment variables
   - Verify database permissions (Notion)
   - Check repository access (GitHub)

2. **"Invalid token"**
   - Regenerate tokens
   - Check token permissions

3. **"Database not found"**
   - Verify database IDs
   - Check integration permissions

4. **Build errors**
   - Check all environment variables are set
   - Verify API endpoints are accessible

### Debug Mode
Add this to your `.env.local` for debugging:
```env
DEBUG_CMS=true
```

## 📚 API Reference

### Notion API
- [Notion API Documentation](https://developers.notion.com/)
- [Notion-to-Markdown](https://github.com/souvikinator/notion-to-md)

### GitHub API
- [GitHub REST API](https://docs.github.com/en/rest)
- [Octokit.js](https://octokit.github.io/rest.js/)

## 🎯 Next Steps

1. **Set up your chosen CMS**
2. **Configure environment variables**
3. **Test with sample content**
4. **Customize styling and layout**
5. **Deploy and enjoy!**

Need help? Check the examples in `src/pages/projects-cms.tsx` or create an issue in the repository.
