import Head from 'next/head'
import { Heading, Text, PageLayout, NavList, Avatar } from "@primer/react";
import Link from "next/link";
import MainLayout from '../components/layout/MainLayout'

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


export default function Home() {
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
                <Link href="/projects/composa">
                  <div className="border rounded-2 p-3 color-bg-default cursor-pointer hover:color-bg-subtle transition-colors">
                    <div 
                      className="w-full color-bg-inset color-border-muted" 
                      style={{ 
                        aspectRatio: '16/9',
                        border: '1px solid'
                      }} 
                    />
                    <div className="mt-2">
                      <Text className="text-large text-semibold color-fg-default">Composa</Text>
                      <div>
                        <Text className="text-small color-fg-muted">Design system and component library</Text>
                      </div>
                    </div>
                  </div>
                </Link>
                <Link href="/projects/portfolio-site">
                  <div className="border rounded-2 p-3 color-bg-default cursor-pointer hover:color-bg-subtle transition-colors">
                    <div 
                      className="w-full color-bg-inset color-border-muted" 
                      style={{ 
                        aspectRatio: '16/9',
                        border: '1px solid'
                      }} 
                    />
                    <div className="mt-2">
                      <Text className="text-large text-semibold color-fg-default">Portfolio Site</Text>
                      <div>
                        <Text className="text-small color-fg-muted">This portfolio website built with Next.js</Text>
                      </div>
                    </div>
                  </div>
                </Link>
                <Link href="/projects/mobile-app">
                  <div className="border rounded-2 p-3 color-bg-default cursor-pointer hover:color-bg-subtle transition-colors">
                    <div 
                      className="w-full color-bg-inset color-border-muted" 
                      style={{ 
                        aspectRatio: '16/9',
                        border: '1px solid'
                      }} 
                    />
                    <div className="mt-2">
                      <Text className="text-large text-semibold color-fg-default">Mobile App</Text>
                      <div>
                        <Text className="text-small color-fg-muted">React Native mobile application</Text>
                      </div>
                    </div>
                  </div>
                </Link>
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
                <Link href="/publications/design-thinking">
                  <div className="border rounded-2 p-3 color-bg-default cursor-pointer hover:color-bg-subtle transition-colors">
                    <div 
                      className="w-full color-bg-inset color-border-muted" 
                      style={{ 
                        aspectRatio: '16/9',
                        border: '1px solid'
                      }} 
                    />
                    <div className="mt-2">
                      <Text className="text-large text-semibold color-fg-default">Design Thinking</Text>
                      <div>
                        <Text className="text-small color-fg-muted">A comprehensive guide to design thinking methodology</Text>
                      </div>
                    </div>
                  </div>
                </Link>
                <Link href="/publications/ux-research">
                  <div className="border rounded-2 p-3 color-bg-default cursor-pointer hover:color-bg-subtle transition-colors">
                    <div 
                      className="w-full color-bg-inset color-border-muted" 
                      style={{ 
                        aspectRatio: '16/9',
                        border: '1px solid'
                      }} 
                    />
                    <div className="mt-2">
                      <Text className="text-large text-semibold color-fg-default">UX Research Methods</Text>
                      <div>
                        <Text className="text-small color-fg-muted">Best practices for user experience research</Text>
                      </div>
                    </div>
                  </div>
                </Link>
                <Link href="/publications/accessibility">
                  <div className="border rounded-2 p-3 color-bg-default cursor-pointer hover:color-bg-subtle transition-colors">
                    <div 
                      className="w-full color-bg-inset color-border-muted" 
                      style={{ 
                        aspectRatio: '16/9',
                        border: '1px solid'
                      }} 
                    />
                    <div className="mt-2">
                      <Text className="text-large text-semibold color-fg-default">Accessibility in Design</Text>
                      <div>
                        <Text className="text-small color-fg-muted">Creating inclusive digital experiences</Text>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            </PageLayout.Content>
          </PageLayout>
        </div>
      </MainLayout>
    </>
  )
}