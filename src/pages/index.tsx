import Head from 'next/head'

export default function Home() {
  return (
    <>
      <Head>
        <title>Samuel Alake - Portfolio</title>
        <meta name="description" content="Product Designer & Design Engineer Portfolio" />
      </Head>
      
      <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '2rem' }}>
          <img
            src="https://github.com/samuelalake.png"
            alt="Samuel Alake"
            style={{ width: '80px', height: '80px', borderRadius: '50%', marginRight: '1rem' }}
          />
          <div>
            <h1 style={{ fontSize: '2rem', margin: '0 0 0.5rem 0' }}>
              Samuel Alake
            </h1>
            <p style={{ color: '#666', fontSize: '1.2rem', margin: '0 0 1rem 0' }}>
              Designing the future, one pixel at a time
            </p>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <span style={{ fontSize: '0.9rem', color: '#666' }}>
                ⭐ 42 stars
              </span>
              <span style={{ fontSize: '0.9rem', color: '#666' }}>
                🍴 12 forks
              </span>
              <span style={{ fontSize: '0.9rem', color: '#28a745' }}>
                Available for work
              </span>
            </div>
          </div>
        </div>

        <div style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>
            Featured Projects
          </h2>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
            gap: '1rem' 
          }}>
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                style={{
                  padding: '1.5rem',
                  border: '1px solid #d0d7de',
                  borderRadius: '6px',
                  backgroundColor: '#f6f8fa'
                }}
              >
                <h3 style={{ fontSize: '1.2rem', margin: '0 0 0.5rem 0' }}>
                  Project {i}
                </h3>
                <p style={{ color: '#666', margin: '0 0 1rem 0' }}>
                  A brief description of what this project does and why it&apos;s interesting.
                </p>
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.8rem', color: '#666' }}>TypeScript</span>
                  <span style={{ fontSize: '0.8rem', color: '#666' }}>React</span>
                  <span style={{ fontSize: '0.8rem', color: '#666' }}>Next.js</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>
            Recent Activity
          </h2>
          <div>
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                style={{
                  padding: '1.5rem',
                  border: '1px solid #d0d7de',
                  borderRadius: '6px',
                  marginBottom: '0.5rem'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span>🐙</span>
                  <span style={{ fontSize: '0.9rem', color: '#666' }}>
                    {i} day{i > 1 ? 's' : ''} ago
                  </span>
                </div>
                <p style={{ margin: '0.5rem 0 0 0' }}>
                  Pushed to <strong>project-{i}</strong>
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}