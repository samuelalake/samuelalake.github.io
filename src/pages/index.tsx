import Head from 'next/head'
import Link from 'next/link'
import Layout from '../components/Layout'

export default function Home() {
  return (
    <>
      <Head>
        <title>Samuel Alake - Portfolio</title>
        <meta name="description" content="Product Designer & Design Engineer Portfolio" />
      </Head>
      
      <Layout>
        {/* Hero Section */}
        <div className="mb-6">
          <div className="d-flex flex-items-center mb-4">
            <img
              src="https://github.com/samuelalake.png"
              alt="Samuel Alake"
              className="avatar avatar-8 mr-4"
              style={{ width: '80px', height: '80px' }}
            />
            <div className="flex-auto">
              <h1 className="h1 mb-1">
                Samuel Alake
              </h1>
              <p className="text-muted mb-2" style={{ fontSize: '1.2rem' }}>
                Product Designer & Design Engineer
              </p>
              <p className="text-muted mb-3">
                Designing the future, one pixel at a time. Specializing in user experience design, 
                design systems, and front-end development.
              </p>
              <div className="d-flex flex-items-center flex-wrap">
                <span className="text-small text-muted mr-4">
                  ⭐ 42 stars
                </span>
                <span className="text-small text-muted mr-4">
                  🍴 12 forks
                </span>
                <span className="Label Label--success mr-2">
                  Available for work
                </span>
                <span className="Label Label--outline">
                  5+ years experience
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="Box mb-6">
          <div className="Box-header">
            <h3 className="Box-title">Key Metrics</h3>
          </div>
          <div className="Box-body">
            <div className="d-flex flex-wrap">
              <div className="col-12 col-md-3 mb-3 mb-md-0">
                <div className="text-center">
                  <div className="h1 text-green">15+</div>
                  <div className="text-small text-muted">Projects Completed</div>
                </div>
              </div>
              <div className="col-12 col-md-3 mb-3 mb-md-0">
                <div className="text-center">
                  <div className="h1 text-blue">5+</div>
                  <div className="text-small text-muted">Years Experience</div>
                </div>
              </div>
              <div className="col-12 col-md-3 mb-3 mb-md-0">
                <div className="text-center">
                  <div className="h1 text-purple">1,200+</div>
                  <div className="text-small text-muted">GitHub Contributions</div>
                </div>
              </div>
              <div className="col-12 col-md-3">
                <div className="text-center">
                  <div className="h1 text-orange">8</div>
                  <div className="text-small text-muted">Design Systems</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Featured Projects */}
        <div className="mb-6">
          <div className="d-flex flex-items-center mb-3">
            <h2 className="h2 mb-0 mr-3">Featured Projects</h2>
            <Link href="/projects" className="btn btn-sm btn-outline">
              View all projects
            </Link>
          </div>
          <div className="d-flex flex-wrap" style={{ gap: '1rem' }}>
            {[
              {
                title: 'E-commerce Design System',
                description: 'Comprehensive design system for a major e-commerce platform with 50+ components and accessibility guidelines.',
                tech: ['Figma', 'React', 'TypeScript', 'Storybook'],
                stars: 24,
                forks: 8,
                language: 'TypeScript',
                status: 'Active',
                lastUpdated: '2 days ago'
              },
              {
                title: 'Mobile Banking App',
                description: 'Redesigned mobile banking experience resulting in 40% increase in user engagement.',
                tech: ['Figma', 'Framer', 'React Native'],
                stars: 18,
                forks: 5,
                language: 'JavaScript',
                status: 'Completed',
                lastUpdated: '1 week ago'
              },
              {
                title: 'Portfolio Website',
                description: 'GitHub-inspired portfolio site built with Next.js and Primer CSS for authentic developer aesthetic.',
                tech: ['Next.js', 'TypeScript', 'Primer CSS'],
                stars: 12,
                forks: 3,
                language: 'TypeScript',
                status: 'Active',
                lastUpdated: '1 day ago'
              },
              {
                title: 'Design Token System',
                description: 'Automated design token pipeline connecting Figma to code with real-time synchronization.',
                tech: ['Figma API', 'Node.js', 'GitHub Actions'],
                stars: 31,
                forks: 12,
                language: 'JavaScript',
                status: 'Active',
                lastUpdated: '3 days ago'
              }
            ].map((project, i) => (
              <div
                key={i}
                className="Box p-3"
                style={{ 
                  minWidth: '300px', 
                  flex: '1 1 300px',
                  maxWidth: '400px'
                }}
              >
                <div className="d-flex flex-items-center mb-2">
                  <h3 className="h3 mb-0 mr-2">
                    {project.title}
                  </h3>
                  <span className={`Label Label--small ${
                    project.status === 'Active' ? 'Label--success' : 'Label--outline'
                  }`}>
                    {project.status}
                  </span>
                </div>
                <p className="text-muted mb-3">
                  {project.description}
                </p>
                <div className="d-flex flex-wrap mb-3">
                  {project.tech.map((tech, idx) => (
                    <span key={idx} className="Label mr-1 mb-1">
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="d-flex flex-items-center justify-content-between text-small text-muted">
                  <div className="d-flex flex-items-center">
                    <span className="mr-3">
                      <span className="text-green">●</span> {project.language}
                    </span>
                    <span className="mr-3">
                      ⭐ {project.stars}
                    </span>
                    <span className="mr-3">
                      🍴 {project.forks}
                    </span>
                  </div>
                  <span>{project.lastUpdated}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity Preview */}
        <div className="mb-6">
          <div className="d-flex flex-items-center mb-3">
            <h2 className="h2 mb-0 mr-3">Recent Activity</h2>
            <Link href="/activity" className="btn btn-sm btn-outline">
              View all activity
            </Link>
          </div>
          <div className="Box">
            <div className="Box-body p-0">
              {[
                { icon: '💾', title: 'Added Primer CSS integration', time: '2 hours ago', type: 'commit' },
                { icon: '🚀', title: 'Launched portfolio site', time: '1 day ago', type: 'project' },
                { icon: '📝', title: 'Wrote about design systems', time: '3 days ago', type: 'blog' },
                { icon: '🔀', title: 'Merged PR: Enhanced UX', time: '1 week ago', type: 'pr' }
              ].map((activity, i) => (
                <div
                  key={i}
                  className={`d-flex p-3 ${i !== 3 ? 'border-bottom' : ''}`}
                >
                  <div className="mr-3">
                    <span className="text-large">{activity.icon}</span>
                  </div>
                  <div className="flex-auto">
                    <div className="d-flex flex-items-center mb-1">
                      <h4 className="h4 mb-0 mr-2">
                        {activity.title}
                      </h4>
                      <span className={`Label Label--small ${
                        activity.type === 'commit' ? 'Label--success' :
                        activity.type === 'project' ? 'Label--outline' :
                        activity.type === 'blog' ? 'Label--purple' : 'Label--blue'
                      }`}>
                        {activity.type}
                      </span>
                    </div>
                    <div className="text-small text-muted">
                      {activity.time}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="Box text-center p-4">
          <h3 className="h3 mb-2">Ready to work together?</h3>
          <p className="text-muted mb-3">
            I&apos;m always interested in new opportunities and exciting projects.
          </p>
          <div className="d-flex flex-justify-center">
            <Link href="/about" className="btn btn-primary mr-2">
              Learn more about me
            </Link>
            <a 
              href="mailto:samuel@example.com" 
              className="btn btn-outline"
            >
              Get in touch
            </a>
          </div>
        </div>
      </Layout>
    </>
  )
}