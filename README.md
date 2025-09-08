# Samuel Alake - Portfolio Site

A GitHub-inspired portfolio website for a Product Designer & Design Engineer, built with Next.js and deployed to GitHub Pages.

## 🚀 **Project Status**

✅ **Project Initialized** - Next.js with Pages Router  
✅ **GitHub Pages Configured** - Ready for deployment  
✅ **Basic Pages Created** - Home, About, Projects, Activity, Blog  
✅ **GitHub Actions Setup** - Automated deployment  
✅ **Build Process Working** - Static export ready  

## 🏗 **Tech Stack**

- **Framework**: Next.js 15+ with Pages Router
- **Language**: TypeScript
- **Styling**: CSS-in-JS (inline styles for now)
- **Deployment**: GitHub Pages
- **CI/CD**: GitHub Actions
- **Content**: Markdown + MDX (planned)

## 📁 **Project Structure**

```
portfolio-site/
├── src/pages/                 # Next.js pages
│   ├── _app.tsx              # App wrapper
│   ├── _document.tsx         # Document customization
│   ├── index.tsx             # Home page
│   ├── about.tsx             # About page
│   ├── projects/             # Projects section
│   ├── activity/             # Activity timeline
│   └── blog/                 # Blog posts
├── lib/                      # Utility functions
│   ├── github.ts             # GitHub API client
│   └── content.ts            # Content management
├── content/                  # Markdown content
│   ├── projects/             # Project markdown files
│   ├── blog/                 # Blog post files
│   └── profile/              # Profile content
├── .github/workflows/        # GitHub Actions
│   └── deploy.yml            # Deployment workflow
└── public/                   # Static assets
```

## 🛠 **Development Setup**

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd portfolio-site
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env.local
   # Edit .env.local with your GitHub token and username
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   ```
   http://localhost:3000
   ```

## 🚀 **Deployment to GitHub Pages**

### Automatic Deployment (Recommended)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial portfolio setup"
   git push origin main
   ```

2. **Enable GitHub Pages**
   - Go to your repository settings
   - Navigate to "Pages" section
   - Select "GitHub Actions" as source
   - The deployment will start automatically

3. **Access your site**
   ```
   https://samuelalake.github.io
   ```

### Manual Deployment

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy to GitHub Pages**
   ```bash
   npm run deploy
   ```

## 📝 **Content Management**

### Adding Projects

1. **Create project markdown file**
   ```bash
   # Create file in content/projects/
   touch content/projects/my-project.md
   ```

2. **Add frontmatter**
   ```markdown
   ---
   title: "My Awesome Project"
   description: "A brief description"
   technologies: ["React", "TypeScript", "Node.js"]
   githubUrl: "https://github.com/username/repo"
   liveUrl: "https://myproject.com"
   featured: true
   date: "2024-01-01"
   ---
   
   # Project Description
   
   Detailed project description goes here...
   ```

### Adding Blog Posts

1. **Create blog post file**
   ```bash
   # Create file in content/blog/
   touch content/blog/my-post.md
   ```

2. **Add frontmatter**
   ```markdown
   ---
   title: "My Blog Post"
   excerpt: "Brief excerpt"
   date: "2024-01-01"
   tags: ["react", "tutorial"]
   readingTime: 5
   ---
   
   # Blog Post Content
   
   Your blog post content goes here...
   ```

## 🔧 **Customization**

### Updating Personal Information

1. **Edit `src/pages/index.tsx`**
   - Update name, title, description
   - Replace avatar image URL
   - Update stats and metrics

2. **Edit `src/pages/about.tsx`**
   - Add professional background
   - Update skills and technologies
   - Add experience details

### Styling

Currently using inline styles. To add custom CSS:

1. **Create CSS file**
   ```bash
   touch src/styles/globals.css
   ```

2. **Import in `_app.tsx`**
   ```tsx
   import '../styles/globals.css'
   ```

3. **Add your styles**
   ```css
   /* Custom styles */
   .custom-class {
     /* your styles */
   }
   ```

## 🔄 **GitHub Integration**

### GitHub API Setup

1. **Create GitHub Personal Access Token**
   - Go to GitHub Settings > Developer settings > Personal access tokens
   - Generate new token with `repo` scope
   - Add to `.env.local` as `GITHUB_TOKEN`

2. **Update GitHub username**
   - Set `GITHUB_USERNAME` in `.env.local`

### Automatic Content Updates

The site is configured to automatically update content from GitHub:

- **Repository data**: Fetched from GitHub API
- **Activity timeline**: Based on GitHub activity
- **Project information**: Synced with repository metadata

## 📊 **Performance**

- **Build size**: ~96KB first load
- **Static generation**: All pages pre-rendered
- **GitHub Pages CDN**: Global content delivery
- **Optimized images**: Next.js Image component ready

## 🐛 **Troubleshooting**

### Common Issues

1. **Build fails with Primer React errors**
   - Solution: Currently using basic styling, Primer integration planned

2. **GitHub Pages deployment fails**
   - Check GitHub Actions logs
   - Ensure repository has Pages enabled
   - Verify workflow file is in `.github/workflows/`

3. **Images not loading**
   - Use absolute URLs for external images
   - Place local images in `public/` directory

### Getting Help

- Check GitHub Actions logs for deployment issues
- Review Next.js documentation for build problems
- Check GitHub Pages documentation for hosting issues

## 🚧 **Next Steps**

### Planned Features

- [ ] **Primer React Integration** - GitHub-style components
- [ ] **Contribution Graph** - Custom GitHub-style heatmap
- [ ] **Project Showcase** - Enhanced project cards
- [ ] **Activity Timeline** - Real-time GitHub activity
- [ ] **Blog System** - MDX-powered blog posts
- [ ] **Search Functionality** - Content search
- [ ] **Dark Mode** - Theme switching
- [ ] **Responsive Design** - Mobile optimization

### Development Roadmap

1. **Phase 1**: Basic functionality ✅
2. **Phase 2**: Primer React integration
3. **Phase 3**: GitHub API integration
4. **Phase 4**: Content management system
5. **Phase 5**: Advanced features

## 📄 **License**

This project is open source and available under the [MIT License](LICENSE).

## 🤝 **Contributing**

Contributions are welcome! Please feel free to submit a Pull Request.

---

**Built with ❤️ by Samuel Alake**
