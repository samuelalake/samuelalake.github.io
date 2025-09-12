import Head from 'next/head'
import { GetStaticPaths, GetStaticProps } from 'next'
import { useState } from 'react'
import { 
  Text, 
  PageLayout, 
  PageHeader, 
  UnderlineNav,
  Timeline,
  NavList,
  Box,
  Heading,
  Link
} from "@primer/react";
import MainLayout from '../../components/layout/MainLayout'
import MarkdownRenderer from '../../components/MarkdownRenderer'
import RoadmapView from '../../components/RoadmapView'
import { GitCommitIcon, ArrowLeftIcon } from '@primer/octicons-react';
import { getAllMarkdownContent, MarkdownContent } from '../../lib/markdown';
import { getNotionProjects, getNotionProjectBySlug, NotionProject, NotionTask } from '../../lib/notion';
import { getNotionPageContent } from '../../lib/notion';
import { getProjectRoadmap, RoadmapItem } from '../../lib/github-notion-sync';
import { getPortfolioRoadmap } from '../../lib/github-tasks-sync';

interface TimelineItemData {
  title: string;
  subtitle: string;
}

interface ProjectData {
  title: string;
  description: string;
  brief: string;
  roadmap: string;
  timeline: TimelineItemData[];
  markdownContent?: {
    brief: MarkdownContent | null;
    roadmap: MarkdownContent | null;
  };
  notionContent?: string;
  project: NotionProject;
  roadmapItems?: RoadmapItem[];
  portfolioRoadmap?: {
    tasks: NotionTask[];
    groupedByStatus: {
      todo: NotionTask[];
      inProgress: NotionTask[];
      done: NotionTask[];
    };
    groupedByPriority: {
      urgent: NotionTask[];
      high: NotionTask[];
      medium: NotionTask[];
      low: NotionTask[];
    };
  };
}

// Project data - in a real app, this would come from a CMS or API
const PROJECTS_DATA: Record<string, ProjectData> = {
  'composa': {
    title: 'Composa',
    description: 'A comprehensive design system and component library built with React and TypeScript',
    brief: 'Composa is a design system that provides a consistent foundation for building user interfaces. It includes a comprehensive set of components, design tokens, and guidelines that ensure consistency across all products.',
    roadmap: 'Phase 1: Core components and tokens. Phase 2: Advanced components and theming. Phase 3: Documentation and developer tools. Phase 4: Community contributions and ecosystem.',
    timeline: [
      { title: "Research & Planning", subtitle: "Analyzed existing patterns and user needs" },
      { title: "Design System Foundation", subtitle: "Created design tokens and core components" },
      { title: "Component Development", subtitle: "Built React components with TypeScript" },
      { title: "Documentation", subtitle: "Created comprehensive docs and Storybook" },
      { title: "Launch", subtitle: "Released to internal teams" }
    ],
    project: {
      id: 'composa-static',
      title: 'Composa',
      description: 'A comprehensive design system and component library built with React and TypeScript',
      type: 'Code Project',
      status: 'Active',
      organization: 'Personal',
      brief: 'Composa is a design system that provides a consistent foundation for building user interfaces. It includes a comprehensive set of components, design tokens, and guidelines that ensure consistency across all products.',
      milestones: '',
      okrs: '',
      phases: 'Development',
      primaryRepository: '',
      figmaFile: '',
      externalLinks: '',
      tags: ['React', 'TypeScript', 'Design System'],
      priority: 'Medium',
      includeInPortfolio: true,
      privacyLevel: 'Public',
      createdTime: new Date().toISOString(),
      lastEditedTime: new Date().toISOString(),
      slug: 'composa'
    }
  },
  'portfolio-site': {
    title: 'Portfolio Website',
    description: 'A modern portfolio website built with Next.js, TypeScript, and Primer design system',
    brief: 'This portfolio website showcases my work and experience as a product designer and design engineer. Built with modern web technologies and following best practices for performance and accessibility.',
    roadmap: 'Phase 1: Basic structure and design. Phase 2: Content management and GitHub integration. Phase 3: Performance optimization. Phase 4: Advanced features and analytics.',
    timeline: [
      { title: "Planning", subtitle: "Defined requirements and technical architecture" },
      { title: "Design", subtitle: "Created wireframes and visual design" },
      { title: "Development", subtitle: "Built with Next.js and Primer components" },
      { title: "Content", subtitle: "Added project showcases and publications" },
      { title: "Deployment", subtitle: "Deployed to GitHub Pages" }
    ],
    project: {
      id: 'portfolio-site-static',
      title: 'Portfolio Website',
      description: 'A modern portfolio website built with Next.js, TypeScript, and Primer design system',
      type: 'Code Project',
      status: 'Active',
      organization: 'Personal',
      brief: 'This portfolio website showcases my work and experience as a product designer and design engineer. Built with modern web technologies and following best practices for performance and accessibility.',
      milestones: '',
      okrs: '',
      phases: 'Development',
      primaryRepository: '',
      figmaFile: '',
      externalLinks: '',
      tags: ['Next.js', 'TypeScript', 'Portfolio'],
      priority: 'Medium',
      includeInPortfolio: true,
      privacyLevel: 'Public',
      createdTime: new Date().toISOString(),
      lastEditedTime: new Date().toISOString(),
      slug: 'portfolio-site'
    }
  },
  'mobile-app': {
    title: 'Mobile App',
    description: 'A React Native mobile application for task management and team collaboration',
    brief: 'A cross-platform mobile application that helps teams manage tasks, track progress, and collaborate effectively. Features include real-time updates, offline support, and intuitive user interface.',
    roadmap: 'Phase 1: Core functionality and basic UI. Phase 2: Real-time features and offline support. Phase 3: Advanced collaboration tools. Phase 4: Analytics and performance optimization.',
    timeline: [
      { title: "Concept & Research", subtitle: "User research and market analysis" },
      { title: "Prototyping", subtitle: "Created interactive prototypes" },
      { title: "Development", subtitle: "Built with React Native and Firebase" },
      { title: "Testing", subtitle: "Beta testing with target users" },
      { title: "Launch", subtitle: "Released on app stores" }
    ],
    project: {
      id: 'mobile-app-static',
      title: 'Mobile App',
      description: 'A React Native mobile application for task management and team collaboration',
      type: 'Code Project',
      status: 'Active',
      organization: 'Personal',
      brief: 'A cross-platform mobile application that helps teams manage tasks, track progress, and collaborate effectively. Features include real-time updates, offline support, and intuitive user interface.',
      milestones: '',
      okrs: '',
      phases: 'Development',
      primaryRepository: '',
      figmaFile: '',
      externalLinks: '',
      tags: ['React Native', 'Mobile', 'TypeScript'],
      priority: 'Medium',
      includeInPortfolio: true,
      privacyLevel: 'Public',
      createdTime: new Date().toISOString(),
      lastEditedTime: new Date().toISOString(),
      slug: 'mobile-app'
    }
  }
};

function TimelineItem({ item }: { item: TimelineItemData }) {
  return (
    <Timeline.Item>
      <Timeline.Badge>
        <GitCommitIcon aria-label="Milestone" />
      </Timeline.Badge>
      <Timeline.Body>
        <div className="d-flex flex-column" style={{ gap: '4px' }}>
          <Text className="text-large text-semibold color-fg-default">
            {item.title}
          </Text>
          <Text className="text-small color-fg-muted">{item.subtitle}</Text>
        </div>
      </Timeline.Body>
    </Timeline.Item>
  );
}

interface ProjectDetailProps {
  project: ProjectData;
}

export default function ProjectDetail({ project }: ProjectDetailProps) {
  const [activeTab, setActiveTab] = useState<'brief' | 'roadmap'>('brief');

  return (
    <>
      <Head>
        <title>{project.title} - Samuel Alake</title>
        <meta name="description" content={project.description} />
      </Head>
      
      <MainLayout>
        <PageLayout>
          <PageLayout.Header>
            {/* Header content can go here if needed */}
          </PageLayout.Header>
          
          <PageLayout.Content>
            <Box sx={{ p: 4, maxWidth: '1200px', mx: 'auto' }}>
              {/* Page Header */}
              <Box sx={{ mb: 4 }}>
                {/* Back navigation */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                  <Link 
                    href="/projects" 
                    sx={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: 1, 
                      color: 'fg.muted',
                      textDecoration: 'none',
                      fontSize: 1
                    }}
                  >
                    <ArrowLeftIcon size={16} />
                    Back to Projects
                  </Link>
                </Box>

                {/* Project title and metadata */}
                <Box sx={{ mb: 3 }}>
                  <Heading sx={{ fontSize: 5, fontWeight: 'normal', mb: 1 }}>
                    {project.title}
                  </Heading>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Text sx={{ fontSize: 0, color: 'fg.muted', fontWeight: 'semibold' }}>
                      {project.project.organization || 'Personal'}
                    </Text>
                    <Text sx={{ fontSize: 0, color: 'fg.muted' }}>
                      created {new Date(project.project.createdTime).toLocaleDateString()}
                    </Text>
                  </Box>
                </Box>
              </Box>

              {/* Main Board Container */}
              <Box sx={{ 
                border: '1px solid',
                borderColor: 'border.default',
                borderRadius: 2,
                overflow: 'hidden'
              }}>
                {/* Tabs Header */}
                <Box>
                  <UnderlineNav aria-label="Project views">
                    <UnderlineNav.Item 
                      aria-current={activeTab === 'brief' ? 'page' : undefined}
                      onClick={() => setActiveTab('brief')}
                      style={{ cursor: 'pointer' }}
                    >
                      Brief
                    </UnderlineNav.Item>
                    <UnderlineNav.Item 
                      aria-current={activeTab === 'roadmap' ? 'page' : undefined}
                      onClick={() => setActiveTab('roadmap')}
                      style={{ cursor: 'pointer' }}
                    >
                      Planning
                    </UnderlineNav.Item>
                  </UnderlineNav>
                </Box>

                {/* Tab Content Area */}
                <div>
                  {activeTab === 'brief' && (
                    <div style={{ padding: '24px' }}>
                      {project.notionContent ? (
                        <MarkdownRenderer content={project.notionContent} />
                      ) : project.markdownContent?.brief ? (
                        <MarkdownRenderer content={project.markdownContent.brief.content} />
                      ) : (
                        <Text className="text-normal color-fg-default">
                          {project.brief}
                        </Text>
                      )}
                    </div>
                  )}
                  {activeTab === 'roadmap' && (
                    <div>
                      {(() => {
                        console.log('🔍 Roadmap tab rendered');
                        console.log('📊 project.portfolioRoadmap:', project.portfolioRoadmap);
                        console.log('📊 project.roadmapItems:', project.roadmapItems);
                        return null;
                      })()}
                      
                      {/* Debug Information */}
                      {project.portfolioRoadmap && project.portfolioRoadmap.tasks.length > 0 ? (
                        <RoadmapView 
                          tasks={project.portfolioRoadmap.tasks}
                          groupedByStatus={project.portfolioRoadmap.groupedByStatus}
                          groupedByPriority={project.portfolioRoadmap.groupedByPriority}
                          showFilters={true}
                        />
                      ) : (
                        <div style={{ padding: '24px' }}>
                          <Text className="text-normal color-fg-muted">
                            No roadmap items available for this project.
                          </Text>
                          <Text className="text-small color-fg-muted mt-2">
                            This could be because:
                          </Text>
                          <ul className="text-small color-fg-muted mt-1 ml-4">
                            <li>• No tasks are linked to this project in Notion</li>
                            <li>• The project filtering is not working correctly</li>
                            <li>• The Notion API is not returning the expected data</li>
                          </ul>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </Box>
            </Box>
          </PageLayout.Content>

          <PageLayout.Pane position="end" resizable>
            {/* Timeline Section */}
            <Box>
              <NavList.Group title="Project Timeline">
                <Timeline aria-label="Project development timeline">
                  {project.timeline.map((item, idx) => (
                    <TimelineItem key={idx} item={item} />
                  ))}
                </Timeline>
              </NavList.Group>
            </Box>
          </PageLayout.Pane>
        </PageLayout>
      </MainLayout>
    </>
  );
}

// Next.js data fetching functions
export const getStaticPaths: GetStaticPaths = async () => {
  try {
    // Get paths from Notion first
    const notionProjects = await getNotionProjects();
    const notionPaths = notionProjects
      .filter(project => project.includeInPortfolio)
      .map((project) => ({
        params: { slug: project.slug },
      }));

    // Add static paths as fallback
    const staticPaths = Object.keys(PROJECTS_DATA).map((slug) => ({
      params: { slug },
    }));

    // Combine and deduplicate paths
    const allPaths = [...notionPaths, ...staticPaths];
    const uniquePaths = allPaths.filter((path, index, self) => 
      index === self.findIndex(p => p.params.slug === path.params.slug)
    );

    return {
      paths: uniquePaths,
      fallback: false, // 404 for unknown slugs
    };
  } catch (error) {
    console.error('Error fetching static paths:', error);
    
    // Fallback to static paths only
    const staticPaths = Object.keys(PROJECTS_DATA).map((slug) => ({
      params: { slug },
    }));

    return {
      paths: staticPaths,
      fallback: false,
    };
  }
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;
  
  try {
    // Try to get project from Notion first
    const notionProject = await getNotionProjectBySlug(slug);
    
    if (notionProject) {
      // Get the full page content from Notion
      const notionContent = await getNotionPageContent(notionProject.id);
      
      // Create timeline from project phases or milestones
      const timeline: TimelineItemData[] = [];
      if (notionProject.milestones) {
        const milestones = notionProject.milestones.split('\n').filter(m => m.trim());
        milestones.forEach((milestone, index) => {
          timeline.push({
            title: `Milestone ${index + 1}`,
            subtitle: milestone.trim()
          });
        });
      }
      
      // Fallback to static data if no timeline from Notion
      if (timeline.length === 0) {
        timeline.push(
          { title: "Planning", subtitle: "Project planning and requirements gathering" },
          { title: "Development", subtitle: "Core development and implementation" },
          { title: "Testing", subtitle: "Testing and quality assurance" },
          { title: "Launch", subtitle: "Project launch and deployment" }
        );
      }

      // Get roadmap items (GitHub issues + Notion tasks)
      const roadmapItems = await getProjectRoadmap(slug);
      
      // Get the enhanced portfolio roadmap
      const portfolioRoadmap = await getPortfolioRoadmap(slug);

      const projectData: ProjectData = {
        title: notionProject.title,
        description: notionProject.description,
        brief: notionProject.brief || notionProject.description,
        roadmap: notionProject.milestones || notionProject.okrs || 'Project roadmap coming soon...',
        timeline,
        notionContent,
        project: notionProject,
        roadmapItems,
        portfolioRoadmap
      };

      // Load markdown content if available (fallback)
      const markdownContent = getAllMarkdownContent(slug);
      const projectWithMarkdown = {
        ...projectData,
        markdownContent
      };

      return {
        props: {
          project: projectWithMarkdown,
        },
      };
    }

    // Fallback to static data if Notion project not found
    const staticProject = PROJECTS_DATA[slug];
    if (staticProject) {
      const markdownContent = getAllMarkdownContent(slug);
      const projectWithMarkdown = {
        ...staticProject,
        markdownContent
      };

      return {
        props: {
          project: projectWithMarkdown,
        },
      };
    }

    return {
      notFound: true,
    };
  } catch (error) {
    console.error('Error fetching project:', error);
    
    // Fallback to static data on error
    const staticProject = PROJECTS_DATA[slug];
    if (staticProject) {
      const markdownContent = getAllMarkdownContent(slug);
      const projectWithMarkdown = {
        ...staticProject,
        markdownContent
      };

      return {
        props: {
          project: projectWithMarkdown,
        },
      };
    }

    return {
      notFound: true,
    };
  }
};
