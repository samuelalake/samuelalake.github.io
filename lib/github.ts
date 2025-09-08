import { Octokit } from '@octokit/rest'

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
})

export interface Repository {
  id: number
  name: string
  full_name: string
  description: string | null
  html_url: string
  clone_url: string
  language: string | null
  stargazers_count: number
  forks_count: number
  updated_at: string
  created_at: string
}

export async function getRepositories(username: string): Promise<Repository[]> {
  try {
    const { data } = await octokit.repos.listForUser({
      username,
      sort: 'updated',
      per_page: 10,
    })
    return data as Repository[]
  } catch (error) {
    console.error('Error fetching repositories:', error)
    return []
  }
}

export async function getUser(username: string) {
  try {
    const { data } = await octokit.users.getByUsername({ username })
    return data
  } catch (error) {
    console.error('Error fetching user:', error)
    return null
  }
}
