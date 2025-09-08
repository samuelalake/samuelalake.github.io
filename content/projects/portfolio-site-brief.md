# Portfolio Website

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
- **Typography**: Inter font family for optimal readability

### 📱 User Experience
- **Fast Navigation**: Client-side routing with Next.js
- **Smooth Animations**: CSS transitions and micro-interactions
- **Accessibility**: WCAG 2.1 AA compliant
- **SEO Optimized**: Meta tags, structured data, and sitemap

## Technical Stack

### Frontend
- **Next.js 15**: React framework with App Router
- **TypeScript**: Type safety and better developer experience
- **Primer React**: Component library and design system
- **Tailwind CSS**: Utility-first CSS framework

### Content Management
- **MDX**: Markdown with JSX support for rich content
- **Gray Matter**: Front matter parsing for metadata
- **File-based CMS**: Simple content management without database

### Deployment
- **GitHub Pages**: Static site hosting
- **GitHub Actions**: Automated deployment pipeline
- **Custom Domain**: samuelalake.dev

## Architecture

### Page Structure
```
/ (Home)
├── /about (About page)
├── /projects (Project listing)
│   └── /projects/[slug] (Individual project)
├── /publications (Publication listing)
│   └── /publications/[slug] (Individual publication)
├── /blog (Blog listing)
│   └── /blog/[slug] (Individual blog post)
└── /activity (GitHub activity)
```

### Component Architecture
- **Layout Components**: MainLayout, PrimerHeader
- **Content Components**: ProjectCard, PublicationCard
- **Interactive Components**: Navigation, ThemeToggle
- **Utility Components**: SEO, Analytics

## Performance Optimizations

### Build-time Optimizations
- **Static Generation**: All pages pre-rendered at build time
- **Image Optimization**: WebP format with fallbacks
- **Bundle Analysis**: Regular bundle size monitoring
- **Tree Shaking**: Unused code elimination

### Runtime Optimizations
- **Lazy Loading**: Images and components loaded on demand
- **Prefetching**: Link prefetching for faster navigation
- **Caching**: Aggressive caching strategies
- **Compression**: Gzip compression for all assets

## Accessibility Features

### Semantic HTML
- **Proper Heading Structure**: H1-H6 hierarchy
- **ARIA Labels**: Screen reader support
- **Focus Management**: Keyboard navigation
- **Color Contrast**: WCAG AA compliant ratios

### User Experience
- **Skip Links**: Quick navigation for keyboard users
- **Focus Indicators**: Clear focus states
- **Error Handling**: Accessible error messages
- **Loading States**: Clear loading indicators
