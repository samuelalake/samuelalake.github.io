import Head from 'next/head'
import { GetStaticProps } from 'next'
import { Heading, Text, PageLayout, NavList, Avatar } from "@primer/react";
import Link from "next/link";
import MainLayout from '../components/layout/MainLayout'
import { getNotionProjects, NotionProject, getFeaturedPublications, NotionPublication } from '../lib/notion'

function SectionHeader({ title }: { title: string }) {
  return (
    <div className="py-4">
      <Heading as="h2" className="h2 text-bold color-fg-default">{title}</Heading>
      <div className="d-flex flex-items-center" style={{ gap: '4px' }}>
        <Text className="text-small color-fg-muted">arturcraft</Text>
        <Text className="text-small color-fg-muted">created 5 days ago</Text>
      </div>
    </div>
  );
}


interface HomeProps {
  projects: NotionProject[]
  publications: NotionPublication[]
}

export default function Home({ projects = [], publications = [] }: HomeProps) {
  return (
    <>
      <Head>
        <title>Samuel Alake - Portfolio</title>
        <meta name="description" content="Product Designer & Design Engineer Portfolio" />
      </Head>
      
      <MainLayout>
        {/* Profile banner - only on Home page */}
        <div className="color-bg-inset border-bottom">
          <div 
            className="mx-auto max-w-[1200px] px-4 py-6 d-flex flex-items-center" 
            style={{ gap: '16px' }}
          >
            <Avatar size={64} src="https://api.builder.io/api/v1/image/assets/TEMP/1c55008f7e2de64711394977be83af423879a9c7?width=128" />
            <div>
              <h1 className="h1 text-bold color-fg-default mb-1">Samuel Alake</h1>
              <Text className="text-normal color-fg-muted">Product Designer & Design Engineer</Text>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-[1200px] px-4 py-4">
          <PageLayout>
            <PageLayout.Pane position="start">
              <NavList>
                <NavList.Group title="Menu">
                  <NavList.Item as={Link} href="#">Projects</NavList.Item>
                  <NavList.Item as={Link} href="#">Publications</NavList.Item>
                </NavList.Group>
              </NavList>
            </PageLayout.Pane>

            <PageLayout.Content>
              {/* First Projects section */}
              <SectionHeader title="Projects" />
              <div 
                className="pb-4" 
                style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
                  gap: '12px'
                }}
              >
                {projects.length > 0 ? (
                  projects.map((project) => (
                    <Link key={project.id} href={`/projects/${project.slug}`}>
                      <div className="border rounded-2 p-3 color-bg-default cursor-pointer hover:color-bg-subtle transition-colors">
                        <div 
                          className="w-full color-bg-inset color-border-muted" 
                          style={{ 
                            aspectRatio: '16/9',
                            border: '1px solid'
                          }} 
                        />
                        <div className="mt-2">
                          <Text className="text-large text-semibold color-fg-default">{project.title}</Text>
                          <div>
                            <Text className="text-small color-fg-muted">{project.description}</Text>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))
                ) : (
                  <div className="col-span-full text-center py-8">
                    <Text className="text-normal color-fg-muted">
                      No projects found. Make sure your Notion Projects database has projects marked as &quot;Include in Portfolio&quot;.
                    </Text>
                  </div>
                )}
              </div>

              {/* Publications section */}
              <SectionHeader title="Publications" />
              <div 
                className="pb-4" 
                style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
                  gap: '12px'
                }}
              >
                {publications.length > 0 ? (
                  publications.map((publication) => (
                    <Link key={publication.id} href={publication.url || `/publications/${publication.id}`}>
                      <div className="border rounded-2 p-3 color-bg-default cursor-pointer hover:color-bg-subtle transition-colors">
                        <div 
                          className="w-full color-bg-inset color-border-muted" 
                          style={{ 
                            aspectRatio: '16/9',
                            border: '1px solid'
                          }} 
                        />
                        <div className="mt-2">
                          <Text className="text-large text-semibold color-fg-default">{publication.title}</Text>
                          <div>
                            <Text className="text-small color-fg-muted">{publication.description}</Text>
                          </div>
                          {publication.tags.length > 0 && (
                            <div className="mt-1">
                              {publication.tags.map((tag, index) => (
                                <span 
                                  key={index}
                                  className="text-small color-fg-muted"
                                  style={{ 
                                    backgroundColor: 'var(--color-neutral-subtle)',
                                    padding: '2px 6px',
                                    borderRadius: '12px',
                                    marginRight: '4px'
                                  }}
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </Link>
                  ))
                ) : (
                  <div className="col-span-full text-center py-8">
                    <Text className="text-muted">No publications available</Text>
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
    const [projects, publications] = await Promise.all([
      getNotionProjects(),
      getFeaturedPublications()
    ])
    
    return {
      props: {
        projects: projects || [],
        publications: publications || [],
      },
    }
  } catch (error) {
    console.error('Error fetching data:', error)
    
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
        publications: [],
      },
    }
  }
}