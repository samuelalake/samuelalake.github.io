import Head from 'next/head'
import { GetStaticPaths, GetStaticProps } from 'next'
import { useState } from 'react'
import { 
  Text, 
  PageLayout, 
  PageHeader, 
  UnderlineNav,
  Timeline,
  NavList
} from "@primer/react";
import MainLayout from '../../components/layout/MainLayout'
import MarkdownRenderer from '../../components/MarkdownRenderer'
import { GitCommitIcon } from '@primer/octicons-react';
import { getAllMarkdownContent, MarkdownContent } from '../../lib/markdown';

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
    ]
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
    ]
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
    ]
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
        <div className="mx-auto max-w-[1200px] px-4 py-4">
          <PageLayout>
            <PageLayout.Content>
              {/* Page Header */}
              <PageHeader>
                <PageHeader.ParentLink href="/projects">← Back to Projects</PageHeader.ParentLink>
                <PageHeader.Title className="h1 text-bold color-fg-default">{project.title}</PageHeader.Title>
                <PageHeader.Description>
                  {project.description}
                </PageHeader.Description>
              </PageHeader>

              {/* Content Area with Border */}
              <div className="border rounded-2 color-bg-default mt-4">
                {/* UnderlineNav for Tabs */}
                <UnderlineNav aria-label="Project content tabs">
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
                    Roadmap
                  </UnderlineNav.Item>
                </UnderlineNav>

                {/* Tab Content Area */}
                <div className="m-4">
                  {activeTab === 'brief' && (
                    <div>
                      {project.markdownContent?.brief ? (
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
                      {project.markdownContent?.roadmap ? (
                        <MarkdownRenderer content={project.markdownContent.roadmap.content} />
                      ) : (
                        <Text className="text-normal color-fg-default">
                          {project.roadmap}
                        </Text>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </PageLayout.Content>

            <PageLayout.Pane position="end">
              {/* Timeline Section */}
              <div>
                <NavList.Group title="Project Timeline">
                  <Timeline aria-label="Project development timeline">
                    {project.timeline.map((item, idx) => (
                      <TimelineItem key={idx} item={item} />
                    ))}
                  </Timeline>
                </NavList.Group>
              </div>
            </PageLayout.Pane>
          </PageLayout>
        </div>
      </MainLayout>
    </>
  );
}

// Next.js data fetching functions
export const getStaticPaths: GetStaticPaths = async () => {
  const paths = Object.keys(PROJECTS_DATA).map((slug) => ({
    params: { slug },
  }));

  return {
    paths,
    fallback: false, // 404 for unknown slugs
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;
  const project = PROJECTS_DATA[slug];

  if (!project) {
    return {
      notFound: true,
    };
  }

  // Load markdown content if available
  const markdownContent = getAllMarkdownContent(slug);
  const projectWithMarkdown = {
    ...project,
    markdownContent
  };

  return {
    props: {
      project: projectWithMarkdown,
    },
  };
};
