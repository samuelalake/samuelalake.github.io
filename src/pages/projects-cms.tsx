import Head from 'next/head'
import { GetStaticProps } from 'next'
import { 
  Text, 
  PageLayout, 
  PageHeader, 
  Box,
  Avatar,
  Link as PrimerLink,
  CounterLabel
} from "@primer/react";
import MainLayout from '../components/layout/MainLayout'
import { getAllProjects, UnifiedProject, CMSProvider } from '../lib/cms';
import { StarIcon, RepoForkedIcon, CalendarIcon } from '@primer/octicons-react';
import Link from 'next/link';

interface ProjectsCMSProps {
  projects: UnifiedProject[];
  cmsProvider: CMSProvider;
}

export default function ProjectsCMS({ projects, cmsProvider }: ProjectsCMSProps) {
  return (
    <>
      <Head>
        <title>Projects - Samuel Alake</title>
        <meta name="description" content="My portfolio projects managed through CMS" />
      </Head>
      
      <MainLayout>
        <div className="mx-auto max-w-[1200px] px-4 py-4">
          <PageLayout>
            <PageLayout.Content>
              <PageHeader>
                <PageHeader.Title className="h1 text-bold color-fg-default">Projects</PageHeader.Title>
                <PageHeader.Description>
                  A collection of my work, managed through {cmsProvider} CMS
                </PageHeader.Description>
              </PageHeader>

              <div className="mt-6">
                {projects.length === 0 ? (
                  <Box className="text-center py-6">
                    <Text className="text-large color-fg-muted">
                      No projects found. Please check your CMS configuration.
                    </Text>
                  </Box>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map((project) => (
                      <ProjectCard key={project.id} project={project} />
                    ))}
                  </div>
                )}
              </div>
            </PageLayout.Content>
          </PageLayout>
        </div>
      </MainLayout>
    </>
  );
}

function ProjectCard({ project }: { project: UnifiedProject }) {
  return (
    <Box className="border rounded-2 p-4 color-bg-default hover:color-bg-subtle transition-colors">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="text-large text-semibold color-fg-default mb-1">
            {project.externalUrl ? (
              <PrimerLink href={project.externalUrl} target="_blank" rel="noopener noreferrer">
                {project.title}
              </PrimerLink>
            ) : (
              <Link href={`/projects/${project.slug}`} className="color-fg-default hover:color-fg-accent">
                {project.title}
              </Link>
            )}
          </h3>
          <Text className="text-small color-fg-muted mb-2">
            {project.description}
          </Text>
        </div>
        <span className="px-2 py-1 text-xs font-medium text-gray-600 bg-gray-100 rounded-full ml-2">
          {project.provider}
        </span>
      </div>

      {/* Tags */}
      {project.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-3">
          {project.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="px-2 py-1 text-xs text-gray-600 border border-gray-300 rounded">
              {tag}
            </span>
          ))}
          {project.tags.length > 3 && (
            <span className="px-2 py-1 text-xs text-gray-600 border border-gray-300 rounded">
              +{project.tags.length - 3}
            </span>
          )}
        </div>
      )}

      {/* GitHub Stats */}
      {project.provider === 'github' && (
        <div className="flex items-center gap-4 text-small color-fg-muted mb-3">
          {project.stars !== undefined && (
            <div className="flex items-center gap-1">
              <StarIcon size={14} />
              <span>{project.stars}</span>
            </div>
          )}
          {project.forks !== undefined && (
            <div className="flex items-center gap-1">
              <RepoForkedIcon size={14} />
              <span>{project.forks}</span>
            </div>
          )}
          {project.language && (
            <span className="px-2 py-1 text-xs text-gray-600 border border-gray-300 rounded">
              {project.language}
            </span>
          )}
        </div>
      )}

      {/* Brief Preview */}
      {project.brief && (
        <Text className="text-small color-fg-muted mb-3 line-clamp-3">
          {project.brief.substring(0, 150)}...
        </Text>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between text-small color-fg-muted">
        <div className="flex items-center gap-1">
          <CalendarIcon size={14} />
          <span>
            {new Date(project.lastEditedTime).toLocaleDateString()}
          </span>
        </div>
        <span className="px-2 py-1 text-xs font-medium text-gray-600 bg-gray-100 rounded">
          {project.status}
        </span>
      </div>
    </Box>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const cmsProvider = (process.env.CMS_PROVIDER as CMSProvider) || 'hybrid';
  
  try {
    const projects = await getAllProjects(cmsProvider);
    
    return {
      props: {
        projects,
        cmsProvider,
      },
    };
  } catch (error) {
    console.error('Error fetching projects:', error);
    
    return {
      props: {
        projects: [],
        cmsProvider,
      },
    };
  }
};
