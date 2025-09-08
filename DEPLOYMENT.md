# Deployment Guide for samuelalake.github.io

## 🎯 **Deployment to Existing Repository**

You already have a GitHub Pages repository at [samuelalake.github.io](https://github.com/samuelalake/samuelalake.github.io). Here's how to deploy your new portfolio:

### **Step 1: Prepare the Repository**

1. **Clone your existing repository**:
   ```bash
   git clone https://github.com/samuelalake/samuelalake.github.io.git
   cd samuelalake.github.io
   ```

2. **Backup existing content** (optional):
   ```bash
   mkdir backup
   cp *.html *.md backup/
   ```

### **Step 2: Copy Portfolio Files**

1. **Copy all files from portfolio-site**:
   ```bash
   # From the portfolio-site directory
   cp -r * /path/to/samuelalake.github.io/
   ```

2. **Or merge the repositories**:
   ```bash
   # Add the portfolio-site as a remote
   git remote add portfolio ../portfolio-site
   git fetch portfolio
   git merge portfolio/main --allow-unrelated-histories
   ```

### **Step 3: Configure for Root Domain**

The configuration is already set up for `samuelalake.github.io` (root domain):

- ✅ **No basePath** needed
- ✅ **Static export** configured
- ✅ **GitHub Actions** ready

### **Step 4: Deploy**

1. **Commit and push**:
   ```bash
   git add .
   git commit -m "Deploy new portfolio site"
   git push origin main
   ```

2. **Enable GitHub Pages** (if not already enabled):
   - Go to repository Settings
   - Navigate to "Pages" section
   - Select "GitHub Actions" as source
   - The deployment will start automatically

3. **Access your site**:
   ```
   https://samuelalake.github.io
   ```

## 🔧 **Configuration Details**

### **Next.js Configuration**
```typescript
// next.config.ts
const nextConfig: NextConfig = {
  output: 'export',           // Static export for GitHub Pages
  trailingSlash: true,        // GitHub Pages compatibility
  images: {
    unoptimized: true         // Required for static export
  },
  // No basePath - using root domain
};
```

### **GitHub Actions Workflow**
The `.github/workflows/deploy.yml` file is configured to:
- Build the Next.js project
- Export static files to `out/` directory
- Deploy to GitHub Pages
- Run automatically on push to main

### **Environment Variables**
Create `.env.local` with your GitHub credentials:
```bash
GITHUB_TOKEN=your_github_token_here
GITHUB_USERNAME=samuelalake
```

## 🚨 **Important Notes**

### **Repository Structure**
- The repository should contain the Next.js project files
- Static files will be generated in `out/` directory
- GitHub Pages will serve from the root

### **Custom Domain** (Optional)
If you want to use a custom domain:
1. Add `CNAME` file to `public/` directory
2. Configure DNS settings
3. Update `next.config.ts` if needed

### **Content Updates**
- Push changes to main branch
- GitHub Actions will automatically rebuild and deploy
- No manual deployment needed

## 🐛 **Troubleshooting**

### **Build Failures**
- Check GitHub Actions logs
- Ensure all dependencies are in `package.json`
- Verify Next.js configuration

### **Deployment Issues**
- Check repository Pages settings
- Ensure GitHub Actions is enabled
- Verify workflow file is in `.github/workflows/`

### **Content Not Updating**
- Clear browser cache
- Check if GitHub Actions completed successfully
- Verify files are in the correct directory

## 📊 **Performance**

- **Build time**: ~1-2 minutes
- **Deployment time**: ~2-3 minutes
- **Site load time**: < 2 seconds
- **Bundle size**: ~96KB first load

## 🔄 **Future Updates**

To update the site:
1. Make changes to the code
2. Test locally with `npm run dev`
3. Build with `npm run build`
4. Commit and push to main
5. GitHub Actions handles the rest

---

**Your portfolio will be live at: https://samuelalake.github.io** 🚀
