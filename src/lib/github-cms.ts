import { Octokit } from '@octokit/rest';

// Initialize GitHub client
const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

export interface GitHubProject {
  name: string;
  description: string;
  html_url: string;
  homepage: string;
  language: string;
  topics: string[];
  created_at: string | null | undefined;
  updated_at: string | null | undefined;
  stargazers_count: number | undefined;
  forks_count: number | undefined;
  brief?: string;
  roadmap?: string;
}

export interface GitHubBlogPost {
  name: string;
  path: string;
  content: string;
  sha: string;
  size: number;
  url: string;
  html_url: string;
  git_url: string;
  download_url: string;
  type: string;
  created_at: string;
  updated_at: string;
}

export interface GitHubIssue {
  id: number;
  number: number;
  title: string;
  body: string;
  state: 'open' | 'closed';
  html_url: string;
  created_at: string;
  updated_at: string;
  closed_at: string | null;
  labels: Array<{
    id: number;
    name: string;
    color: string;
    description: string | null;
  }>;
  assignees: Array<{
    id: number;
    login: string;
    avatar_url: string;
    html_url: string;
  }>;
  milestone: {
    id: number;
    title: string;
    description: string | null;
    state: 'open' | 'closed';
    created_at: string;
    updated_at: string;
    due_on: string | null;
    closed_at: string | null;
  } | null;
  repository: {
    name: string;
    full_name: string;
    html_url: string;
  };
}

/**
 * Get all repositories from GitHub
 */
export async function getGitHubProjects(): Promise<GitHubProject[]> {
  try {
    const { data: repos } = await octokit.repos.listForUser({
      username: process.env.GITHUB_USERNAME || 'samuelalake',
      sort: 'updated',
      per_page: 100,
    });

    const projects = await Promise.all(
      repos.map(async (repo) => {
        // Try to get brief and roadmap from README or docs
        const brief = await getGitHubFileContent(repo.full_name, 'BRIEF.md') || 
                     await getGitHubFileContent(repo.full_name, 'docs/brief.md') ||
                     await getGitHubFileContent(repo.full_name, 'README.md');
        
        const roadmap = await getGitHubFileContent(repo.full_name, 'ROADMAP.md') || 
                       await getGitHubFileContent(repo.full_name, 'docs/roadmap.md');

        return {
          name: repo.name,
          description: repo.description || '',
          html_url: repo.html_url,
          homepage: repo.homepage || '',
          language: repo.language || '',
          topics: repo.topics || [],
          created_at: repo.created_at,
          updated_at: repo.updated_at,
          stargazers_count: repo.stargazers_count,
          forks_count: repo.forks_count,
          brief: brief?.substring(0, 500) + '...', // Truncate for preview
          roadmap: roadmap?.substring(0, 500) + '...',
        };
      })
    );

    return projects;
  } catch (error) {
    console.error('Error fetching GitHub projects:', error);
    return [];
  }
}

/**
 * Get blog posts from a specific GitHub repository
 */
export async function getGitHubBlogPosts(repoName: string = 'blog'): Promise<GitHubBlogPost[]> {
  try {
    const { data: contents } = await octokit.repos.getContent({
      owner: process.env.GITHUB_USERNAME || 'samuelalake',
      repo: repoName,
      path: 'posts',
    });

    if (!Array.isArray(contents)) {
      return [];
    }

    const posts = await Promise.all(
      contents
        .filter((item: any) => item.type === 'file' && item.name.endsWith('.md'))
        .map(async (item: any) => {
          const { data: fileContent } = await octokit.repos.getContent({
            owner: process.env.GITHUB_USERNAME || 'samuelalake',
            repo: repoName,
            path: item.path,
          });

          const content = Buffer.from((fileContent as any).content, 'base64').toString('utf-8');

          return {
            name: item.name,
            path: item.path,
            content,
            sha: item.sha,
            size: item.size,
            url: item.url,
            html_url: item.html_url,
            git_url: item.git_url,
            download_url: item.download_url,
            type: item.type,
            created_at: item.created_at,
            updated_at: item.updated_at,
          };
        })
    );

    return posts;
  } catch (error) {
    console.error('Error fetching GitHub blog posts:', error);
    return [];
  }
}

/**
 * Get content from a specific file in a GitHub repository
 */
async function getGitHubFileContent(repoFullName: string, filePath: string): Promise<string | null> {
  try {
    const { data } = await octokit.repos.getContent({
      owner: repoFullName.split('/')[0],
      repo: repoFullName.split('/')[1],
      path: filePath,
    });

    if ('content' in data) {
      return Buffer.from(data.content, 'base64').toString('utf-8');
    }
    return null;
  } catch (error) {
    // File doesn't exist, return null
    return null;
  }
}

/**
 * Get a specific project by name
 */
export async function getGitHubProjectByName(projectName: string): Promise<GitHubProject | null> {
  try {
    const projects = await getGitHubProjects();
    return projects.find(project => project.name === projectName) || null;
  } catch (error) {
    console.error('Error fetching project by name:', error);
    return null;
  }
}

/**
 * Get a specific blog post by name
 */
export async function getGitHubBlogPostByName(postName: string, repoName: string = 'blog'): Promise<GitHubBlogPost | null> {
  try {
    const posts = await getGitHubBlogPosts(repoName);
    return posts.find(post => post.name === postName) || null;
  } catch (error) {
    console.error('Error fetching blog post by name:', error);
    return null;
  }
}

/**
 * Get all issues from a specific GitHub repository
 */
export async function getGitHubIssues(repoName: string, state: 'open' | 'closed' | 'all' = 'all'): Promise<GitHubIssue[]> {
  try {
    const { data: issues } = await octokit.issues.listForRepo({
      owner: process.env.GITHUB_USERNAME || 'samuelalake',
      repo: repoName,
      state,
      per_page: 100,
      sort: 'updated',
      direction: 'desc',
    });

    return issues.map(issue => ({
      id: issue.id,
      number: issue.number,
      title: issue.title,
      body: issue.body || '',
      state: issue.state as 'open' | 'closed',
      html_url: issue.html_url,
      created_at: issue.created_at,
      updated_at: issue.updated_at,
      closed_at: issue.closed_at,
      labels: issue.labels.map(label => ({
        id: typeof label === 'string' ? 0 : label.id || 0,
        name: typeof label === 'string' ? label : label.name || '',
        color: typeof label === 'string' ? '000000' : label.color || '000000',
        description: typeof label === 'string' ? null : label.description || null,
      })),
      assignees: (issue.assignees || []).map(assignee => ({
        id: assignee.id,
        login: assignee.login,
        avatar_url: assignee.avatar_url,
        html_url: assignee.html_url,
      })),
      milestone: issue.milestone ? {
        id: issue.milestone.id,
        title: issue.milestone.title,
        description: issue.milestone.description,
        state: issue.milestone.state as 'open' | 'closed',
        created_at: issue.milestone.created_at,
        updated_at: issue.milestone.updated_at,
        due_on: issue.milestone.due_on,
        closed_at: issue.milestone.closed_at,
      } : null,
      repository: {
        name: repoName,
        full_name: `${process.env.GITHUB_USERNAME || 'samuelalake'}/${repoName}`,
        html_url: `https://github.com/${process.env.GITHUB_USERNAME || 'samuelalake'}/${repoName}`,
      },
    }));
  } catch (error) {
    console.error(`Error fetching GitHub issues for ${repoName}:`, error);
    return [];
  }
}

/**
 * Get issues from all repositories
 */
export async function getAllGitHubIssues(state: 'open' | 'closed' | 'all' = 'all'): Promise<GitHubIssue[]> {
  try {
    const projects = await getGitHubProjects();
    const allIssues: GitHubIssue[] = [];

    for (const project of projects) {
      const issues = await getGitHubIssues(project.name, state);
      allIssues.push(...issues);
    }

    return allIssues.sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime());
  } catch (error) {
    console.error('Error fetching all GitHub issues:', error);
    return [];
  }
}

/**
 * Get issues for a specific project
 */
export async function getGitHubIssuesForProject(projectName: string, state: 'open' | 'closed' | 'all' = 'all'): Promise<GitHubIssue[]> {
  try {
    return await getGitHubIssues(projectName, state);
  } catch (error) {
    console.error(`Error fetching GitHub issues for project ${projectName}:`, error);
    return [];
  }
}
