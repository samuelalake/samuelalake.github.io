import Head from 'next/head'

export default function Home() {
  return (
    <>
      <Head>
        <title>Samuel Alake - Portfolio</title>
        <meta name="description" content="Product Designer & Design Engineer Portfolio" />
      </Head>
      
      <div className="p-4" style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div className="d-flex flex-items-center mb-4">
          <img
            src="https://github.com/samuelalake.png"
            alt="Samuel Alake"
            className="avatar avatar-8 mr-3"
            style={{ width: '80px', height: '80px' }}
          />
          <div>
            <h1 className="h1 mb-1">
              Samuel Alake
            </h1>
            <p className="text-muted mb-2" style={{ fontSize: '1.2rem' }}>
              Designing the future, one pixel at a time
            </p>
            <div className="d-flex flex-items-center">
              <span className="text-small text-muted mr-3">
                ⭐ 42 stars
              </span>
              <span className="text-small text-muted mr-3">
                🍴 12 forks
              </span>
              <span className="Label Label--success">
                Available for work
              </span>
            </div>
          </div>
        </div>

        <div className="mb-4">
          <h2 className="h2 mb-3">
            Featured Projects
          </h2>
          <div className="d-flex flex-wrap" style={{ gap: '1rem' }}>
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="Box p-3"
                style={{ 
                  minWidth: '300px', 
                  flex: '1 1 300px',
                  maxWidth: '400px'
                }}
              >
                <h3 className="h3 mb-1">
                  Project {i}
                </h3>
                <p className="text-muted mb-2">
                  A brief description of what this project does and why it&apos;s interesting.
                </p>
                <div className="d-flex flex-wrap">
                  <span className="Label mr-1 mb-1">TypeScript</span>
                  <span className="Label mr-1 mb-1">React</span>
                  <span className="Label mr-1 mb-1">Next.js</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="h2 mb-3">
            Recent Activity
          </h2>
          <div>
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="Box p-3 mb-2"
              >
                <div className="d-flex flex-items-center">
                  <span className="mr-2">🐙</span>
                  <span className="text-small text-muted">
                    {i} day{i > 1 ? 's' : ''} ago
                  </span>
                </div>
                <p className="mt-2 mb-0">
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