import Head from 'next/head'

export default function About() {
  return (
    <>
      <Head>
        <title>About - Samuel Alake</title>
        <meta name="description" content="Learn more about Samuel Alake's background as a Product Designer & Design Engineer" />
      </Head>
      
      <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>About</h1>
        <p style={{ color: '#666', fontSize: '1.1rem', marginBottom: '2rem' }}>
          Learn more about my background, skills, and experience
        </p>
        
        <div style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>
            Professional Background
          </h2>
          <p style={{ marginBottom: '1rem' }}>
            I&apos;m a passionate product designer and design engineer with expertise in user experience design, 
            front-end development, and design systems.
          </p>
          
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>
            Skills & Technologies
          </h2>
          <p style={{ marginBottom: '1rem' }}>
            Figma, Sketch, Adobe Creative Suite, React, TypeScript, CSS, Design Systems, User Research, and more.
          </p>
          
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>
            Experience
          </h2>
          <p>
            [Experience details will be added here]
          </p>
        </div>
      </div>
    </>
  )
}