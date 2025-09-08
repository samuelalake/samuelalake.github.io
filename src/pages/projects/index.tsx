import Head from 'next/head'

export default function Projects() {
  return (
    <>
      <Head>
        <title>Projects - Samuel Alake</title>
        <meta name="description" content="A collection of Samuel Alake's work and side projects" />
      </Head>
      
      <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Projects</h1>
        <p style={{ color: '#666', fontSize: '1.1rem', marginBottom: '2rem' }}>
          A collection of my work and side projects
        </p>
        
        <div>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>
            All Projects
          </h2>
          <p>
            Project listings will be implemented here with GitHub integration.
          </p>
        </div>
      </div>
    </>
  )
}