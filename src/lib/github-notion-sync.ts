import { getGitHubIssuesForProject, GitHubIssue } from './github-cms';
import { getNotionProjects, NotionProject } from './notion';

export interface RoadmapItem {
  id: string;
  title: string;
  description: string;
  status: 'open' | 'closed' | 'in_progress';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  dueDate?: string;
  labels: string[];
  assignees: string[];
  milestone?: string;
  source: 'github' | 'notion';
  url: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * Convert GitHub issue to roadmap item
 */
function githubIssueToRoadmapItem(issue: GitHubIssue): RoadmapItem {
  // Map GitHub labels to priority
  const priorityMap: { [key: string]: 'low' | 'medium' | 'high' | 'urgent' } = {
    'urgent': 'urgent',
    'high': 'high',
    'medium': 'medium',
    'low': 'low',
    'bug': 'high',
    'enhancement': 'medium',
    'feature': 'medium',
    'documentation': 'low',
  };

  const priority = issue.labels.find(label => priorityMap[label.name.toLowerCase()])?.name.toLowerCase() || 'medium';
  const mappedPriority = priorityMap[priority] || 'medium';

  return {
    id: `github-${issue.id}`,
    title: issue.title,
    description: issue.body.substring(0, 200) + (issue.body.length > 200 ? '...' : ''),
    status: issue.state === 'closed' ? 'closed' : 'open',
    priority: mappedPriority,
    dueDate: issue.milestone?.due_on || undefined,
    labels: issue.labels.map(label => label.name),
    assignees: issue.assignees.map(assignee => assignee.login),
    milestone: issue.milestone?.title,
    source: 'github',
    url: issue.html_url,
    createdAt: issue.created_at,
    updatedAt: issue.updated_at,
  };
}

/**
 * Convert Notion task to roadmap item
 */
function notionTaskToRoadmapItem(task: any, project: NotionProject): RoadmapItem {
  // Map Notion priority to our priority system
  const priorityMap: { [key: string]: 'low' | 'medium' | 'high' | 'urgent' } = {
    'Pri 1': 'urgent',
    'Pri 2': 'high',
    'Pri 3': 'medium',
    'Reminder': 'low',
    'Meeting': 'medium',
  };

  const priority = priorityMap[task.Priority] || 'medium';

  return {
    id: `notion-${task.url.split('/').pop()}`,
    title: task.Task || 'Untitled Task',
    description: task.SchedulingMessage || '',
    status: task.Status === 'Done' ? 'closed' : task.Status === 'Doing' ? 'in_progress' : 'open',
    priority,
    dueDate: task['date:Due:start'] || undefined,
    labels: [], // Notion tasks don't have labels in the same way
    assignees: task.Assignee ? [task.Assignee] : [],
    milestone: task.Phase,
    source: 'notion',
    url: task.url,
    createdAt: task['Created time'],
    updatedAt: task['Last edited time'],
  };
}

/**
 * Get roadmap items for a specific project
 */
export async function getProjectRoadmap(projectSlug: string): Promise<RoadmapItem[]> {
  try {
    const roadmapItems: RoadmapItem[] = [];

    // Get GitHub issues for the project
    const githubIssues = await getGitHubIssuesForProject(projectSlug, 'all');
    const githubRoadmapItems = githubIssues.map(githubIssueToRoadmapItem);
    roadmapItems.push(...githubRoadmapItems);

    // Get Notion tasks for the project
    const notionProjects = await getNotionProjects();
    const project = notionProjects.find(p => p.slug === projectSlug);
    
    if (project && project.tasks) {
      const notionRoadmapItems = project.tasks.map((task: any) => notionTaskToRoadmapItem(task, project));
      roadmapItems.push(...notionRoadmapItems);
    }

    // Sort by priority and updated date
    return roadmapItems.sort((a, b) => {
      const priorityOrder = { urgent: 4, high: 3, medium: 2, low: 1 };
      const aPriority = priorityOrder[a.priority] || 2;
      const bPriority = priorityOrder[b.priority] || 2;
      
      if (aPriority !== bPriority) {
        return bPriority - aPriority;
      }
      
      return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    });
  } catch (error) {
    console.error(`Error getting roadmap for project ${projectSlug}:`, error);
    return [];
  }
}

/**
 * Get all roadmap items across all projects
 */
export async function getAllRoadmapItems(): Promise<RoadmapItem[]> {
  try {
    const allRoadmapItems: RoadmapItem[] = [];

    // Get all GitHub issues
    const { getAllGitHubIssues } = await import('./github-cms');
    const allGitHubIssues = await getAllGitHubIssues('all');
    const githubRoadmapItems = allGitHubIssues.map(githubIssueToRoadmapItem);
    allRoadmapItems.push(...githubRoadmapItems);

    // Get all Notion tasks
    const notionProjects = await getNotionProjects();
    for (const project of notionProjects) {
      if (project.tasks) {
        const notionRoadmapItems = project.tasks.map((task: any) => notionTaskToRoadmapItem(task, project));
        allRoadmapItems.push(...notionRoadmapItems);
      }
    }

    // Sort by priority and updated date
    return allRoadmapItems.sort((a, b) => {
      const priorityOrder = { urgent: 4, high: 3, medium: 2, low: 1 };
      const aPriority = priorityOrder[a.priority] || 2;
      const bPriority = priorityOrder[b.priority] || 2;
      
      if (aPriority !== bPriority) {
        return bPriority - aPriority;
      }
      
      return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    });
  } catch (error) {
    console.error('Error getting all roadmap items:', error);
    return [];
  }
}

/**
 * Group roadmap items by status
 */
export function groupRoadmapItemsByStatus(items: RoadmapItem[]): {
  open: RoadmapItem[];
  in_progress: RoadmapItem[];
  closed: RoadmapItem[];
} {
  return {
    open: items.filter(item => item.status === 'open'),
    in_progress: items.filter(item => item.status === 'in_progress'),
    closed: items.filter(item => item.status === 'closed'),
  };
}

/**
 * Group roadmap items by priority
 */
export function groupRoadmapItemsByPriority(items: RoadmapItem[]): {
  urgent: RoadmapItem[];
  high: RoadmapItem[];
  medium: RoadmapItem[];
  low: RoadmapItem[];
} {
  return {
    urgent: items.filter(item => item.priority === 'urgent'),
    high: items.filter(item => item.priority === 'high'),
    medium: items.filter(item => item.priority === 'medium'),
    low: items.filter(item => item.priority === 'low'),
  };
}
