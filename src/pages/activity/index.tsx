import Head from 'next/head'
import { useState, useEffect } from 'react'
import Layout from '../../components/Layout'

interface ActivityItem {
  id: string
  type: 'commit' | 'pr' | 'issue' | 'blog' | 'project'
  title: string
  description: string
  date: string
  url?: string
  repository?: string
}

export default function Activity() {
  const [activities, setActivities] = useState<ActivityItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Mock data for now - will replace with real GitHub API
    const mockActivities: ActivityItem[] = [
      {
        id: '1',
        type: 'commit',
        title: 'Added Primer CSS integration',
        description: 'Integrated GitHub-style components with Primer CSS for authentic look',
        date: '2024-09-07',
        url: 'https://github.com/samuelalake/samuelalake.github.io/commit/abc123',
        repository: 'samuelalake.github.io'
      },
      {
        id: '2',
        type: 'project',
        title: 'Portfolio Site Launch',
        description: 'Launched new portfolio site with Next.js and GitHub Pages',
        date: '2024-09-07',
        url: 'https://samuelalake.github.io'
      },
      {
        id: '3',
        type: 'blog',
        title: 'Design Systems in Practice',
        description: 'Wrote about implementing design systems in modern web applications',
        date: '2024-09-05',
        url: '/blog/design-systems-practice'
      },
      {
        id: '4',
        type: 'pr',
        title: 'Enhanced user experience',
        description: 'Improved accessibility and mobile responsiveness',
        date: '2024-09-03',
        url: 'https://github.com/example/repo/pull/42',
        repository: 'example/repo'
      },
      {
        id: '5',
        type: 'issue',
        title: 'Bug: Navigation not working on mobile',
        description: 'Fixed mobile navigation menu not expanding properly',
        date: '2024-09-01',
        url: 'https://github.com/example/repo/issues/15',
        repository: 'example/repo'
      }
    ]

    // Simulate API call
    setTimeout(() => {
      setActivities(mockActivities)
      setLoading(false)
    }, 1000)
  }, [])

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'commit': return '💾'
      case 'pr': return '🔀'
      case 'issue': return '🐛'
      case 'blog': return '📝'
      case 'project': return '🚀'
      default: return '📌'
    }
  }

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'commit': return 'text-green'
      case 'pr': return 'text-blue'
      case 'issue': return 'text-red'
      case 'blog': return 'text-purple'
      case 'project': return 'text-orange'
      default: return 'text-muted'
    }
  }

  return (
    <>
      <Head>
        <title>Activity - Samuel Alake</title>
        <meta name="description" content="Timeline of Samuel Alake's professional activity and contributions" />
      </Head>
      
      <Layout>
        <div className="mb-4">
          <h1 className="h1 mb-2">Activity</h1>
          <p className="text-muted mb-4">
            Timeline of my professional activity and contributions
          </p>
        </div>

        {/* Activity Stats */}
        <div className="Box p-4 mb-4">
          <div className="d-flex flex-wrap">
            <div className="col-12 col-md-3 mb-3 mb-md-0">
              <div className="text-center">
                <div className="h1 text-green">42</div>
                <div className="text-small text-muted">Commits this month</div>
              </div>
            </div>
            <div className="col-12 col-md-3 mb-3 mb-md-0">
              <div className="text-center">
                <div className="h1 text-blue">8</div>
                <div className="text-small text-muted">Pull Requests</div>
              </div>
            </div>
            <div className="col-12 col-md-3 mb-3 mb-md-0">
              <div className="text-center">
                <div className="h1 text-purple">3</div>
                <div className="text-small text-muted">Blog Posts</div>
              </div>
            </div>
            <div className="col-12 col-md-3">
              <div className="text-center">
                <div className="h1 text-orange">2</div>
                <div className="text-small text-muted">Projects</div>
              </div>
            </div>
          </div>
        </div>

        {/* Activity Timeline */}
        <div className="Box">
          <div className="Box-header">
            <h3 className="Box-title">Recent Activity</h3>
          </div>
          <div className="Box-body p-0">
            {loading ? (
              <div className="p-4 text-center">
                <div className="spinner-border" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
                <p className="text-muted mt-2">Loading activity...</p>
              </div>
            ) : (
              <div>
                {activities.map((activity, index) => (
                  <div
                    key={activity.id}
                    className={`d-flex p-3 ${index !== activities.length - 1 ? 'border-bottom' : ''}`}
                  >
                    <div className="mr-3">
                      <span className="text-large">{getActivityIcon(activity.type)}</span>
                    </div>
                    <div className="flex-auto">
                      <div className="d-flex flex-items-center mb-1">
                        <h4 className="h4 mb-0 mr-2">
                          {activity.title}
                        </h4>
                        <span className={`Label Label--small ${getActivityColor(activity.type)}`}>
                          {activity.type}
                        </span>
                      </div>
                      <p className="text-muted mb-1">
                        {activity.description}
                      </p>
                      <div className="d-flex flex-items-center text-small text-muted">
                        <span className="mr-2">
                          {new Date(activity.date).toLocaleDateString()}
                        </span>
                        {activity.repository && (
                          <span className="mr-2">
                            in <strong>{activity.repository}</strong>
                          </span>
                        )}
                        {activity.url && (
                          <a href={activity.url} className="text-blue">
                            View details →
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Contribution Graph Placeholder */}
        <div className="Box mt-4">
          <div className="Box-header">
            <h3 className="Box-title">Contribution Graph</h3>
          </div>
          <div className="Box-body">
            <div className="text-center p-4">
              <div className="text-muted mb-2">
                🗓️ Contribution graph will be implemented here
              </div>
              <p className="text-small text-muted">
                This will show your GitHub contribution activity in a heatmap format
              </p>
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}