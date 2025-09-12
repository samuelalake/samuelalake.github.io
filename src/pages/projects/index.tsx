import Head from 'next/head'
import { GetStaticProps } from 'next'
import Link from 'next/link'
import MainLayout from '../../components/layout/MainLayout'
import { getNotionProjects, NotionProject } from '../../lib/notion'
import { Box, Text, Label, Link as PrimerLink, PageLayout, NavList } from '@primer/react'

interface ProjectsPageProps {
  projects?: NotionProject[]
}

export default function Projects({ projects = [] }: ProjectsPageProps) {
  return (
    <>
      <Head>
        <title>Projects - Samuel Alake</title>
        <meta name="description" content="A collection of Samuel Alake's work and side projects" />
      </Head>
      
      <MainLayout>
        <div className="mx-auto max-w-[1200px] px-4 py-4">
          <PageLayout>
            <PageLayout.Pane position="start">
              <NavList>
                <NavList.Group title="Menu">
                  <NavList.Item as={Link} href="/">Home</NavList.Item>
                  <NavList.Item as={Link} href="/projects" aria-current="page">Projects</NavList.Item>
                  <NavList.Item as={Link} href="/about">About</NavList.Item>
                </NavList.Group>
              </NavList>
            </PageLayout.Pane>

            <PageLayout.Content>
              <h1 className="h1 text-bold color-fg-default mb-2">Projects</h1>
              <Text className="text-normal color-fg-muted mb-4">
                A collection of my work and side projects
              </Text>
              
              <div>
                <h2 className="h2 text-semibold color-fg-default mb-3">
                  All Projects ({projects?.length || 0})
                </h2>
                
                {!projects || projects.length === 0 ? (
                  <div className="text-center py-8">
                    <Text className="text-normal color-fg-muted">
                      No projects found. Make sure your Notion Projects database has projects marked as &quot;Include in Portfolio&quot;.
                    </Text>
                  </div>
                ) : (
                  <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
                    {projects.map((project) => (
                      <Box
                        key={project.id}
                        sx={{
                          border: '1px solid',
                          borderColor: 'border.default',
                          borderRadius: 2,
                          p: 3,
                          '&:hover': {
                            borderColor: 'accent.emphasis',
                            boxShadow: 'shadow.medium'
                          }
                        }}
                      >
                        <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.25rem' }}>
                          <Link href={`/projects/${project.slug}`} passHref>
                            <PrimerLink sx={{ color: 'inherit', textDecoration: 'none' }}>
                              {project.title}
                            </PrimerLink>
                          </Link>
                        </h3>
                        
                        <Text sx={{ color: 'fg.muted', mb: 2 }}>
                          {project.description}
                        </Text>
                        
                        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
                          <Label>{project.type}</Label>
                          <Label>{project.status}</Label>
                          {project.organization && (
                            <Label>{project.organization}</Label>
                          )}
                        </div>
                        
                        {project.primaryRepository && (
                          <PrimerLink href={project.primaryRepository} target="_blank" rel="noopener noreferrer">
                            View on GitHub →
                          </PrimerLink>
                        )}
                      </Box>
                    ))}
                  </div>
                )}
              </div>
            </PageLayout.Content>
          </PageLayout>
        </div>
      </MainLayout>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  try {
    const projects = await getNotionProjects()
    
    return {
      props: {
        projects: projects || [],
      },
    }
  } catch (error) {
    console.error('Error fetching projects:', error)
    
    // Return fallback data when Notion is unavailable
    const fallbackProjects = [
      {
        id: 'fallback-1',
        title: 'Portfolio Website',
        description: 'This portfolio website built with Next.js and TypeScript',
        type: 'Code Project',
        status: 'Active',
        organization: 'Personal',
        brief: 'A modern portfolio website showcasing my work and experience as a product designer and design engineer.',
        milestones: '',
        okrs: '',
        phases: 'Development',
        primaryRepository: 'https://github.com/samuelalake/samuelalake.github.io',
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
    ]
    
    return {
      props: {
        projects: fallbackProjects,
      },
    }
  }
}