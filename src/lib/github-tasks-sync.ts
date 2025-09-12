import { getGitHubIssuesForProject, getAllGitHubIssues, GitHubIssue } from './github-cms';
import { getNotionTasks, createNotionTask, updateNotionTask, NotionTask } from './notion';

export interface GitHubTaskSync {
  syncedTasks: number;
  updatedTasks: number;
  newTasks: number;
  errors: string[];
}

/**
 * Map GitHub issue priority from labels
 */
function mapGitHubIssuePriority(labels: Array<{ name: string }>): string {
  const priorityMap: { [key: string]: string } = {
    'urgent': 'Urgent',
    'high': 'High',
    'medium': 'Medium',
    'low': 'Low',
    'critical': 'Urgent',
    'important': 'High',
    'bug': 'High',
    'enhancement': 'Medium',
    'feature': 'Medium',
    'documentation': 'Low',
  };

  for (const label of labels) {
    const priority = priorityMap[label.name.toLowerCase()];
    if (priority) return priority;
  }
  
  return 'Medium'; // Default priority
}

/**
 * Map GitHub issue status to Notion task status
 */
function mapGitHubIssueStatus(issue: GitHubIssue): string {
  if (issue.state === 'closed') {
    return 'Done';
  }
  
  // Check labels for in-progress indicators
  const inProgressLabels = ['in-progress', 'doing', 'working-on', 'development'];
  const hasInProgressLabel = issue.labels.some(label => 
    inProgressLabels.includes(label.name.toLowerCase())
  );
  
  if (hasInProgressLabel) {
    return 'In Progress';
  }
  
  return 'To Do'; // Default status for open issues
}

/**
 * Convert GitHub issue to Notion task
 */
function convertGitHubIssueToNotionTask(issue: GitHubIssue, projectId?: string): Omit<NotionTask, 'id' | 'createdTime' | 'lastEditedTime'> {
  const priority = mapGitHubIssuePriority(issue.labels);
  const status = mapGitHubIssueStatus(issue);
  
  return {
    title: issue.title,
    description: issue.body.substring(0, 500) + (issue.body.length > 500 ? '...' : ''),
    status,
    priority,
    dueDate: issue.milestone?.due_on || undefined,
    projectId,
    labels: issue.labels.map(label => label.name),
    source: 'GitHub',
    githubIssueNumber: issue.number,
    githubRepository: issue.repository.name,
    githubUrl: issue.html_url,
  };
}

/**
 * Find existing Notion task by GitHub issue
 */
async function findExistingNotionTask(issue: GitHubIssue, notionTasks: NotionTask[]): Promise<NotionTask | null> {
  return notionTasks.find(task => 
    task.githubIssueNumber === issue.number && 
    task.githubRepository === issue.repository.name
  ) || null;
}

/**
 * Sync GitHub issues to Notion tasks for a specific project
 */
export async function syncGitHubIssuesToNotionTasks(projectName: string, projectId?: string): Promise<GitHubTaskSync> {
  const result: GitHubTaskSync = {
    syncedTasks: 0,
    updatedTasks: 0,
    newTasks: 0,
    errors: []
  };

  try {
    // Get GitHub issues for the project
    const githubIssues = await getGitHubIssuesForProject(projectName, 'all');
    
    // Get existing Notion tasks
    const notionTasks = await getNotionTasks(projectId);
    

    for (const issue of githubIssues) {
      try {
        const existingTask = await findExistingNotionTask(issue, notionTasks);
        const taskData = convertGitHubIssueToNotionTask(issue, projectId);

        if (existingTask) {
          // Check if task needs updating
          const needsUpdate = (
            existingTask.title !== taskData.title ||
            existingTask.status !== taskData.status ||
            existingTask.priority !== taskData.priority ||
            JSON.stringify(existingTask.labels) !== JSON.stringify(taskData.labels)
          );

          if (needsUpdate) {
            const updated = await updateNotionTask(existingTask.id, taskData);
            if (updated) {
              result.updatedTasks++;
            } else {
              result.errors.push(`Failed to update task for issue #${issue.number}`);
            }
          }
        } else {
          // Create new task
          const created = await createNotionTask(taskData);
          if (created) {
            result.newTasks++;
          } else {
            result.errors.push(`Failed to create task for issue #${issue.number}`);
          }
        }

        result.syncedTasks++;
      } catch (error) {
        result.errors.push(`Error syncing issue #${issue.number}: ${error}`);
      }
    }

    return result;

  } catch (error) {
    result.errors.push(`Sync failed: ${error}`);
    return result;
  }
}

/**
 * Sync all GitHub issues across all repositories to Notion tasks
 */
export async function syncAllGitHubIssuesToNotionTasks(): Promise<GitHubTaskSync> {
  const result: GitHubTaskSync = {
    syncedTasks: 0,
    updatedTasks: 0,
    newTasks: 0,
    errors: []
  };

  try {
    // Get all GitHub issues
    const allGitHubIssues = await getAllGitHubIssues('all');
    
    // Get existing Notion tasks
    const notionTasks = await getNotionTasks();
    

    for (const issue of allGitHubIssues) {
      try {
        const existingTask = await findExistingNotionTask(issue, notionTasks);
        const taskData = convertGitHubIssueToNotionTask(issue);

        if (existingTask) {
          // Check if task needs updating
          const needsUpdate = (
            existingTask.title !== taskData.title ||
            existingTask.status !== taskData.status ||
            existingTask.priority !== taskData.priority ||
            JSON.stringify(existingTask.labels) !== JSON.stringify(taskData.labels)
          );

          if (needsUpdate) {
            const updated = await updateNotionTask(existingTask.id, taskData);
            if (updated) {
              result.updatedTasks++;
            } else {
              result.errors.push(`Failed to update task for issue #${issue.number}`);
            }
          }
        } else {
          // Create new task
          const created = await createNotionTask(taskData);
          if (created) {
            result.newTasks++;
          } else {
            result.errors.push(`Failed to create task for issue #${issue.number}`);
          }
        }

        result.syncedTasks++;
      } catch (error) {
        result.errors.push(`Error syncing issue #${issue.number}: ${error}`);
      }
    }

    return result;

  } catch (error) {
    result.errors.push(`Sync failed: ${error}`);
    return result;
  }
}

/**
 * Get combined roadmap view (GitHub issues + Notion tasks) for portfolio display
 */
export async function getPortfolioRoadmap(projectSlug?: string): Promise<{
  tasks: NotionTask[];
  groupedByStatus: {
    todo: NotionTask[];
    inProgress: NotionTask[];
    done: NotionTask[];
  };
  groupedByPriority: {
    urgent: NotionTask[];
    high: NotionTask[];
    medium: NotionTask[];
    low: NotionTask[];
  };
}> {
  try {
    
    // Get all tasks (includes synced GitHub issues)
    const allTasks = await getNotionTasks();
    
    // Filter tasks by project if projectSlug is provided
    let tasks = allTasks;
    
    if (projectSlug) {
      // Import getNotionProjectBySlug to get the project ID
      const { getNotionProjectBySlug } = await import('./notion');
      const project = await getNotionProjectBySlug(projectSlug);
      
      if (project) {
        
        // Get tasks directly with project ID filter instead of filtering afterwards
        const { getNotionTasks } = await import('./notion');
        tasks = await getNotionTasks(project.id, project.title);
        
        // Also try getting all tasks to see what we have
        const allTasks = await getNotionTasks();
        
      } else {
        tasks = [];
      }
    }

    // Group by status
    const groupedByStatus = {
      todo: tasks.filter(task => task.status === 'To Do'),
      inProgress: tasks.filter(task => task.status === 'In Progress'),
      done: tasks.filter(task => task.status === 'Done'),
    };

    // Group by priority  
    const groupedByPriority = {
      urgent: tasks.filter(task => task.priority === 'Urgent'),
      high: tasks.filter(task => task.priority === 'High'),
      medium: tasks.filter(task => task.priority === 'Medium'),
      low: tasks.filter(task => task.priority === 'Low'),
    };

    return {
      tasks,
      groupedByStatus,
      groupedByPriority,
    };
  } catch (error) {
    console.error('Error getting portfolio roadmap:', error);
    return {
      tasks: [],
      groupedByStatus: { todo: [], inProgress: [], done: [] },
      groupedByPriority: { urgent: [], high: [], medium: [], low: [] },
    };
  }
}