import { getNotionProjects, getNotionProjectBySlug, NotionProject } from './notion';
import { getGitHubProjects, getGitHubProjectByName, GitHubProject } from './github-cms';

export type CMSProvider = 'notion' | 'github' | 'hybrid';

export interface UnifiedProject {
  id: string;
  title: string;
  description: string;
  brief: string;
  roadmap: string;
  status: string;
  tags: string[];
  createdTime: string;
  lastEditedTime: string;
  coverImage?: string;
  slug: string;
  provider: CMSProvider;
  externalUrl?: string;
  stars?: number;
  forks?: number;
  language?: string;
}

/**
 * Get all projects from the configured CMS provider(s)
 */
export async function getAllProjects(provider: CMSProvider = 'hybrid'): Promise<UnifiedProject[]> {
  const projects: UnifiedProject[] = [];

  try {
    if (provider === 'notion' || provider === 'hybrid') {
      const notionProjects = await getNotionProjects();
      const unifiedNotionProjects = notionProjects.map(convertNotionToUnified);
      projects.push(...unifiedNotionProjects);
    }

    if (provider === 'github' || provider === 'hybrid') {
      const githubProjects = await getGitHubProjects();
      const unifiedGithubProjects = githubProjects.map(convertGitHubToUnified);
      projects.push(...unifiedGithubProjects);
    }

    // Sort by last edited time
    return projects.sort((a, b) => 
      new Date(b.lastEditedTime).getTime() - new Date(a.lastEditedTime).getTime()
    );
  } catch (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
}

/**
 * Get a single project by slug
 */
export async function getProjectBySlug(slug: string, provider: CMSProvider = 'hybrid'): Promise<UnifiedProject | null> {
  try {
    if (provider === 'notion' || provider === 'hybrid') {
      const notionProject = await getNotionProjectBySlug(slug);
      if (notionProject) {
        return convertNotionToUnified(notionProject);
      }
    }

    if (provider === 'github' || provider === 'hybrid') {
      const githubProject = await getGitHubProjectByName(slug);
      if (githubProject) {
        return convertGitHubToUnified(githubProject);
      }
    }

    return null;
  } catch (error) {
    console.error('Error fetching project by slug:', error);
    return null;
  }
}

/**
 * Convert Notion project to unified format
 */
function convertNotionToUnified(project: NotionProject): UnifiedProject {
  return {
    id: project.id,
    title: project.title,
    description: project.description,
    brief: project.brief,
    roadmap: project.roadmap,
    status: project.status,
    tags: project.tags,
    createdTime: project.createdTime,
    lastEditedTime: project.lastEditedTime,
    coverImage: project.coverImage,
    slug: project.slug,
    provider: 'notion',
  };
}

/**
 * Convert GitHub project to unified format
 */
function convertGitHubToUnified(project: GitHubProject): UnifiedProject {
  return {
    id: project.name,
    title: project.name,
    description: project.description,
    brief: project.brief || '',
    roadmap: project.roadmap || '',
    status: 'Published',
    tags: project.topics,
    createdTime: project.created_at,
    lastEditedTime: project.updated_at,
    slug: project.name,
    provider: 'github',
    externalUrl: project.html_url,
    stars: project.stargazers_count,
    forks: project.forks_count,
    language: project.language,
  };
}

/**
 * Get projects by tag
 */
export async function getProjectsByTag(tag: string, provider: CMSProvider = 'hybrid'): Promise<UnifiedProject[]> {
  const allProjects = await getAllProjects(provider);
  return allProjects.filter(project => 
    project.tags.some(projectTag => 
      projectTag.toLowerCase().includes(tag.toLowerCase())
    )
  );
}

/**
 * Search projects
 */
export async function searchProjects(query: string, provider: CMSProvider = 'hybrid'): Promise<UnifiedProject[]> {
  const allProjects = await getAllProjects(provider);
  const lowercaseQuery = query.toLowerCase();
  
  return allProjects.filter(project => 
    project.title.toLowerCase().includes(lowercaseQuery) ||
    project.description.toLowerCase().includes(lowercaseQuery) ||
    project.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
  );
}
