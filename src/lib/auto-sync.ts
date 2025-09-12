import { getNotionProjects } from './notion';
import { syncGitHubIssuesToNotionTasks } from './github-tasks-sync';

/**
 * Extract repository name from GitHub URL
 */
function extractRepoNameFromUrl(githubUrl: string): string | null {
  try {
    // Handle various GitHub URL formats:
    // - https://github.com/username/repo
    // - https://github.com/username/repo.git
    // - git@github.com:username/repo.git
    
    const url = new URL(githubUrl.replace('git@github.com:', 'https://github.com/'));
    const pathParts = url.pathname.split('/').filter(Boolean);
    
    if (pathParts.length >= 2) {
      const repoName = pathParts[1].replace('.git', '');
      return repoName;
    }
    
    return null;
  } catch (error) {
    console.error('Error parsing GitHub URL:', githubUrl, error);
    return null;
  }
}

/**
 * Auto-sync all projects that have GitHub repository URLs
 */
export async function autoSyncProjectsFromNotion(): Promise<{
  totalProjects: number;
  syncedProjects: number;
  syncedTasks: number;
  errors: string[];
}> {
  const result = {
    totalProjects: 0,
    syncedProjects: 0,
    syncedTasks: 0,
    errors: [] as string[]
  };

  try {
    console.log('🔍 Finding projects with GitHub repositories...');
    
    // Get all projects from Notion
    const projects = await getNotionProjects();
    result.totalProjects = projects.length;
    
    console.log(`Found ${projects.length} projects in Notion`);

    for (const project of projects) {
      try {
        // Check if project has a GitHub repository URL
        const githubUrl = project.primaryRepository || 
                         project.externalLinks?.match(/https:\/\/github\.com\/[^\s]+/)?.[0];
        
        if (!githubUrl) {
          console.log(`⏭️ Skipping ${project.title} - no GitHub repository URL found`);
          continue;
        }

        const repoName = extractRepoNameFromUrl(githubUrl);
        
        if (!repoName) {
          result.errors.push(`Could not extract repository name from URL: ${githubUrl} (Project: ${project.title})`);
          continue;
        }

        console.log(`🔄 Syncing issues from ${repoName} for project ${project.title}...`);
        
        // Sync GitHub issues for this repository to Notion tasks
        const syncResult = await syncGitHubIssuesToNotionTasks(repoName, project.id);
        
        result.syncedProjects++;
        result.syncedTasks += syncResult.syncedTasks;
        
        if (syncResult.errors.length > 0) {
          result.errors.push(...syncResult.errors.map(error => `${project.title} (${repoName}): ${error}`));
        }
        
        console.log(`✅ Synced ${syncResult.syncedTasks} tasks for ${project.title} (${syncResult.newTasks} new, ${syncResult.updatedTasks} updated)`);
        
      } catch (error) {
        const errorMsg = `Error syncing project ${project.title}: ${error}`;
        result.errors.push(errorMsg);
        console.error(errorMsg);
      }
    }

    console.log(`\n🎉 Auto-sync complete! Synced ${result.syncedTasks} total tasks from ${result.syncedProjects} projects`);
    
    return result;

  } catch (error) {
    result.errors.push(`Auto-sync failed: ${error}`);
    console.error('Auto-sync failed:', error);
    return result;
  }
}

/**
 * Sync a specific project by its Notion ID or slug
 */
export async function autoSyncSingleProject(projectIdOrSlug: string): Promise<{
  projectTitle: string;
  repoName: string | null;
  syncedTasks: number;
  newTasks: number;
  updatedTasks: number;
  errors: string[];
}> {
  const result = {
    projectTitle: '',
    repoName: null as string | null,
    syncedTasks: 0,
    newTasks: 0,
    updatedTasks: 0,
    errors: [] as string[]
  };

  try {
    // Get all projects and find the one we want
    const projects = await getNotionProjects();
    const project = projects.find(p => 
      p.id === projectIdOrSlug || 
      p.slug === projectIdOrSlug ||
      p.title.toLowerCase().replace(/\s+/g, '-') === projectIdOrSlug.toLowerCase()
    );

    if (!project) {
      result.errors.push(`Project not found: ${projectIdOrSlug}`);
      return result;
    }

    result.projectTitle = project.title;

    // Check if project has a GitHub repository URL
    const githubUrl = project.primaryRepository || 
                     project.externalLinks?.match(/https:\/\/github\.com\/[^\s]+/)?.[0];
    
    if (!githubUrl) {
      result.errors.push(`No GitHub repository URL found for project: ${project.title}`);
      return result;
    }

    const repoName = extractRepoNameFromUrl(githubUrl);
    
    if (!repoName) {
      result.errors.push(`Could not extract repository name from URL: ${githubUrl}`);
      return result;
    }

    result.repoName = repoName;

    console.log(`🔄 Syncing issues from ${repoName} for project ${project.title}...`);
    
    // Sync GitHub issues for this repository to Notion tasks
    const syncResult = await syncGitHubIssuesToNotionTasks(repoName, project.id);
    
    result.syncedTasks = syncResult.syncedTasks;
    result.newTasks = syncResult.newTasks;
    result.updatedTasks = syncResult.updatedTasks;
    result.errors.push(...syncResult.errors);
    
    console.log(`✅ Synced ${syncResult.syncedTasks} tasks for ${project.title} (${syncResult.newTasks} new, ${syncResult.updatedTasks} updated)`);
    
    return result;

  } catch (error) {
    result.errors.push(`Error syncing project: ${error}`);
    console.error('Error syncing project:', error);
    return result;
  }
}