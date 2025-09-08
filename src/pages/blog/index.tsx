import Head from 'next/head'

export default function Blog() {
  return (
    <>
      <Head>
        <title>Blog - Samuel Alake</title>
        <meta name="description" content="Thoughts, tutorials, and insights on software development" />
      </Head>
      
      <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Blog</h1>
        <p style={{ color: '#666', fontSize: '1.1rem', marginBottom: '2rem' }}>
          Thoughts, tutorials, and insights on software development
        </p>
        
        <div>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>
            Latest Posts
          </h2>
          <p>
            Blog posts will be implemented here with MDX integration.
          </p>
        </div>
      </div>
    </>
  )
}