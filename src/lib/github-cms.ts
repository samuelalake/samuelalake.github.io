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
  created_at: string;
  updated_at: string;
  stargazers_count: number;
  forks_count: number;
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

          const content = Buffer.from(fileContent.content, 'base64').toString('utf-8');

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
