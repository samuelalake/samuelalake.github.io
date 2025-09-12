import Head from 'next/head'
import { GetStaticProps } from 'next'
import Link from 'next/link'
import Layout from '../../components/Layout'
import { getNotionProjects, NotionProject } from '../../lib/notion'
import { Box, Text, Label, Link as PrimerLink } from '@primer/react'

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
      
      <Layout>
        <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Projects</h1>
        <p style={{ color: '#666', fontSize: '1.1rem', marginBottom: '2rem' }}>
          A collection of my work and side projects
        </p>
        
        <div>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>
            All Projects ({projects?.length || 0})
          </h2>
          
          {!projects || projects.length === 0 ? (
            <p>No projects found. Make sure your Notion Projects database has projects marked as &quot;Include in Portfolio&quot;.</p>
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
      </Layout>
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
    
    return {
      props: {
        projects: [],
      },
    }
  }
}