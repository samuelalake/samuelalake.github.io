import Head from 'next/head'

export default function Activity() {
  return (
    <>
      <Head>
        <title>Activity - Samuel Alake</title>
        <meta name="description" content="Timeline of Samuel Alake's professional activity and contributions" />
      </Head>
      
      <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Activity</h1>
        <p style={{ color: '#666', fontSize: '1.1rem', marginBottom: '2rem' }}>
          Timeline of my professional activity and contributions
        </p>
        
        <div>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>
            Activity Timeline
          </h2>
          <p>
            Activity timeline will be implemented here with GitHub API integration.
          </p>
        </div>
      </div>
    </>
  )
}