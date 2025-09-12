import { Client } from '@notionhq/client';
import { NotionToMarkdown } from 'notion-to-md';

// Initialize Notion client
const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

// Initialize Notion to Markdown converter
const n2m = new NotionToMarkdown({ notionClient: notion });

// Type for Notion page properties
interface NotionPageProperties {
  [key: string]: any;
}

export interface NotionProject {
  id: string;
  title: string;
  description: string;
  type: string;
  status: string;
  organization: string;
  brief: string;
  milestones: string;
  okrs: string;
  phases: string;
  primaryRepository?: string;
  figmaFile?: string;
  externalLinks: string;
  tags: string[];
  priority: string;
  includeInPortfolio: boolean;
  privacyLevel: string;
  createdTime: string;
  lastEditedTime: string;
  slug: string;
  tasks?: any[];
}

export interface NotionActivity {
  id: string;
  title: string;
  description: string;
  activityType: string;
  source: string;
  projectId: string;
  date: string;
  year: number;
  month: string;
  externalUrl?: string;
  repository: string;
  evidenceQuality: string;
  includeInPortfolio: boolean;
  privacyLevel: string;
  githubLabels: string[];
  author: string;
  createdTime: string;
  lastEditedTime: string;
}

export interface NotionBlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  published: boolean;
  publishedDate: string;
  tags: string[];
  slug: string;
}

export interface NotionTask {
  id: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  dueDate?: string;
  projectId?: string;
  labels: string[];
  source: string;
  githubIssueNumber?: number;
  githubRepository?: string;
  githubUrl?: string;
  createdTime: string;
  lastEditedTime: string;
}

/**
 * Get all projects from Notion database
 */
export async function getNotionProjects(): Promise<NotionProject[]> {
  try {
    // First, get all pages from the database
    const response = await notion.search({
      query: '',
      filter: {
        property: 'object',
        value: 'page',
      },
      sort: {
        direction: 'descending',
        timestamp: 'last_edited_time',
      },
    });

    // Filter pages that belong to our projects database and are included in portfolio
    const projectPages = response.results.filter((page: any) => 
      page.parent?.database_id === process.env.NOTION_PROJECTS_DATABASE_ID &&
      page.properties?.['Include in Portfolio']?.checkbox === true
    );

    const projects = await Promise.all(
      projectPages.map(async (page: any) => {
        const properties: NotionPageProperties = page.properties;

        return {
          id: page.id,
          title: properties.Title?.title?.[0]?.plain_text || 'Untitled',
          description: properties.Description?.rich_text?.[0]?.plain_text || '',
          type: properties.Type?.select?.name || 'Code Project',
          status: properties.Status?.select?.name || 'Active',
          organization: properties.Organization?.select?.name || 'Personal',
          brief: properties.Brief?.rich_text?.[0]?.plain_text || '',
          milestones: properties.Milestones?.rich_text?.[0]?.plain_text || '',
          okrs: properties.OKRs?.rich_text?.[0]?.plain_text || '',
          phases: properties.Phases?.select?.name || 'Planning',
          primaryRepository: properties['Primary Repository']?.url || null,
          figmaFile: properties['Figma File']?.url || null,
          externalLinks: properties['External Links']?.rich_text?.[0]?.plain_text || '',
          tags: properties.Tags?.multi_select?.map((tag: any) => tag.name) || [],
          priority: properties.Priority?.select?.name || 'Medium',
          includeInPortfolio: properties['Include in Portfolio']?.checkbox || false,
          privacyLevel: properties['Privacy Level']?.select?.name || 'Public',
          createdTime: page.created_time,
          lastEditedTime: page.last_edited_time,
          slug: properties.Slug?.rich_text?.[0]?.plain_text || 
                properties.Title?.title?.[0]?.plain_text?.toLowerCase().replace(/\s+/g, '-') || 'untitled',
        };
      })
    );

    return projects;
  } catch (error) {
    console.error('Error fetching Notion projects:', error);
    return [];
  }
}

/**
 * Get all activities from Notion database
 */
export async function getNotionActivities(projectId?: string): Promise<NotionActivity[]> {
  try {
    // Get all pages from search
    const response = await notion.search({
      query: '',
      filter: {
        property: 'object',
        value: 'page',
      },
      sort: {
        direction: 'descending',
        timestamp: 'last_edited_time',
      },
    });

    // Filter pages that belong to our activities database
    let activityPages = response.results.filter((page: any) => 
      page.parent?.database_id === process.env.NOTION_ACTIVITIES_DATABASE_ID &&
      page.properties?.['Include in Portfolio']?.checkbox === true
    );

    // Additional filtering by project if specified
    if (projectId) {
      activityPages = activityPages.filter((page: any) => 
        page.properties?.Project?.relation?.some((rel: any) => rel.id === projectId)
      );
    }

    const activities = activityPages.map((page: any) => {
      const properties: NotionPageProperties = page.properties;

      return {
        id: page.id,
        title: properties.Title?.title?.[0]?.plain_text || 'Untitled',
        description: properties.Description?.rich_text?.[0]?.plain_text || '',
        activityType: properties['Activity Type']?.select?.name || 'build',
        source: properties.Source?.select?.name || 'Manual',
        projectId: properties.Project?.relation?.[0]?.id || '',
        date: properties.Date?.date?.start || page.created_time,
        year: properties.Year?.number || new Date().getFullYear(),
        month: properties.Month?.select?.name || new Date().toLocaleString('default', { month: 'long' }),
        externalUrl: properties['External URL']?.url || undefined,
        repository: properties.Repository?.rich_text?.[0]?.plain_text || '',
        evidenceQuality: properties['Evidence Quality']?.select?.name || 'Medium',
        includeInPortfolio: properties['Include in Portfolio']?.checkbox || false,
        privacyLevel: properties['Privacy Level']?.select?.name || 'Public',
        githubLabels: properties['GitHub Labels']?.multi_select?.map((label: any) => label.name) || [],
        author: properties.Author?.rich_text?.[0]?.plain_text || '',
        createdTime: page.created_time,
        lastEditedTime: page.last_edited_time,
      };
    });

    return activities;
  } catch (error) {
    console.error('Error fetching Notion activities:', error);
    return [];
  }
}

/**
 * Create a new activity in Notion
 */
export async function createNotionActivity(activityData: Omit<NotionActivity, 'id' | 'createdTime' | 'lastEditedTime'>): Promise<NotionActivity | null> {
  try {
    const response = await notion.pages.create({
      parent: { database_id: process.env.NOTION_ACTIVITIES_DATABASE_ID! },
      properties: {
        'Title': {
          title: [{ text: { content: activityData.title } }],
        },
        'Description': {
          rich_text: [{ text: { content: activityData.description } }],
        },
        'Activity Type': {
          select: { name: activityData.activityType },
        },
        'Source': {
          select: { name: activityData.source },
        },
        'Project': {
          relation: [{ id: activityData.projectId }],
        },
        'Date': {
          date: { start: activityData.date },
        },
        'Year': {
          number: activityData.year,
        },
        'Month': {
          select: { name: activityData.month },
        },
        ...(activityData.externalUrl && { 'External URL': { url: activityData.externalUrl } }),
        'Repository': {
          rich_text: [{ text: { content: activityData.repository } }],
        },
        'Evidence Quality': {
          select: { name: activityData.evidenceQuality },
        },
        'Include in Portfolio': {
          checkbox: activityData.includeInPortfolio,
        },
        'Privacy Level': {
          select: { name: activityData.privacyLevel },
        },
        'GitHub Labels': {
          multi_select: activityData.githubLabels.map(label => ({ name: label })),
        },
        'Author': {
          rich_text: [{ text: { content: activityData.author } }],
        },
      },
    });

    return {
      id: response.id,
      ...activityData,
      createdTime: new Date().toISOString(),
      lastEditedTime: new Date().toISOString(),
    };
  } catch (error) {
    console.error('Error creating Notion activity:', error);
    return null;
  }
}

/**
 * Get all blog posts from Notion database
 */
export async function getNotionBlogPosts(): Promise<NotionBlogPost[]> {
  try {
    const response = await notion.search({
      query: '',
      filter: {
        property: 'object',
        value: 'page',
      },
      sort: {
        direction: 'descending',
        timestamp: 'last_edited_time',
      },
    });

    // Filter pages that belong to our blog database and are published
    const blogPages = response.results.filter((page: any) => 
      page.parent?.database_id === process.env.NOTION_BLOG_DATABASE_ID &&
      page.properties?.['Published']?.checkbox === true
    );

    const posts = await Promise.all(
      blogPages.map(async (page: any) => {
        const properties = page.properties;
        
        // Get the full content
        const content = await getNotionPageContent(page.id);

        return {
          id: page.id,
          title: properties.Title?.title?.[0]?.plain_text || 'Untitled',
          excerpt: properties.Excerpt?.rich_text?.[0]?.plain_text || '',
          content,
          published: properties.Published?.checkbox || false,
          publishedDate: properties['Published Date']?.date?.start || page.created_time,
          tags: properties.Tags?.multi_select?.map((tag: any) => tag.name) || [],
          slug: properties.Slug?.rich_text?.[0]?.plain_text || 
                properties.Title?.title?.[0]?.plain_text?.toLowerCase().replace(/\s+/g, '-') || 'untitled',
        };
      })
    );

    return posts;
  } catch (error) {
    console.error('Error fetching Notion blog posts:', error);
    return [];
  }
}

/**
 * Get content from a Notion page
 */
export async function getNotionPageContent(pageId: string, section?: string): Promise<string> {
  try {
    const mdblocks = await n2m.pageToMarkdown(pageId);
    const mdString = n2m.toMarkdownString(mdblocks);
    
    if (section) {
      // Extract specific section from markdown
      const lines = mdString.parent.split('\n');
      let inSection = false;
      const sectionContent: string[] = [];
      
      for (const line of lines) {
        if (line.startsWith(`# ${section}`) || line.startsWith(`## ${section}`)) {
          inSection = true;
          continue;
        }
        if (inSection && (line.startsWith('# ') || line.startsWith('## '))) {
          break;
        }
        if (inSection) {
          sectionContent.push(line);
        }
      }
      
      return sectionContent.join('\n').trim();
    }
    
    return mdString.parent;
  } catch (error) {
    console.error(`Error getting content from page ${pageId}:`, error);
    return '';
  }
}

/**
 * Get a single project by slug
 */
export async function getNotionProjectBySlug(slug: string): Promise<NotionProject | null> {
  try {
    const projects = await getNotionProjects();
    return projects.find(project => project.slug === slug) || null;
  } catch (error) {
    console.error('Error fetching project by slug:', error);
    return null;
  }
}

/**
 * Get a single blog post by slug
 */
export async function getNotionBlogPostBySlug(slug: string): Promise<NotionBlogPost | null> {
  try {
    const posts = await getNotionBlogPosts();
    return posts.find(post => post.slug === slug) || null;
  } catch (error) {
    console.error('Error fetching blog post by slug:', error);
    return null;
  }
}

/**
 * Get all tasks from Notion Tasks database
 */
export async function getNotionTasks(projectId?: string): Promise<NotionTask[]> {
  try {
    const response = await notion.search({
      query: '',
      filter: {
        property: 'object',
        value: 'page',
      },
      sort: {
        direction: 'descending',
        timestamp: 'last_edited_time',
      },
    });

    // Filter pages that belong to our tasks database
    let taskPages = response.results.filter((page: any) => 
      page.parent?.database_id === process.env.NOTION_TASKS_DATABASE_ID
    );

    // Additional filtering by project if specified
    if (projectId) {
      taskPages = taskPages.filter((page: any) => 
        page.properties?.Project?.relation?.some((rel: any) => rel.id === projectId)
      );
    }

    const tasks = taskPages.map((page: any) => {
      const properties: NotionPageProperties = page.properties;

      return {
        id: page.id,
        title: properties.Title?.title?.[0]?.plain_text || 'Untitled',
        description: properties.Description?.rich_text?.[0]?.plain_text || '',
        status: properties.Status?.select?.name || 'To Do',
        priority: properties.Priority?.select?.name || 'Medium',
        dueDate: properties['Due Date']?.date?.start || undefined,
        projectId: properties.Project?.relation?.[0]?.id || undefined,
        labels: properties.Labels?.multi_select?.map((label: any) => label.name) || [],
        source: properties.Source?.select?.name || 'Manual',
        githubIssueNumber: properties['GitHub Issue Number']?.number || undefined,
        githubRepository: properties['GitHub Repository']?.rich_text?.[0]?.plain_text || undefined,
        githubUrl: properties['GitHub URL']?.url || undefined,
        createdTime: page.created_time,
        lastEditedTime: page.last_edited_time,
      };
    });

    return tasks;
  } catch (error) {
    console.error('Error fetching Notion tasks:', error);
    return [];
  }
}

/**
 * Create a new task in Notion Tasks database
 */
export async function createNotionTask(taskData: Omit<NotionTask, 'id' | 'createdTime' | 'lastEditedTime'>): Promise<NotionTask | null> {
  try {
    const response = await notion.pages.create({
      parent: { database_id: process.env.NOTION_TASKS_DATABASE_ID! },
      properties: {
        'Title': {
          title: [{ text: { content: taskData.title } }],
        },
        'Description': {
          rich_text: [{ text: { content: taskData.description } }],
        },
        'Status': {
          select: { name: taskData.status },
        },
        'Priority': {
          select: { name: taskData.priority },
        },
        ...(taskData.dueDate && { 'Due Date': { date: { start: taskData.dueDate } } }),
        ...(taskData.projectId && { 'Project': { relation: [{ id: taskData.projectId }] } }),
        'Labels': {
          multi_select: taskData.labels.map(label => ({ name: label })),
        },
        'Source': {
          select: { name: taskData.source },
        },
        ...(taskData.githubIssueNumber && { 'GitHub Issue Number': { number: taskData.githubIssueNumber } }),
        ...(taskData.githubRepository && { 'GitHub Repository': { rich_text: [{ text: { content: taskData.githubRepository } }] } }),
        ...(taskData.githubUrl && { 'GitHub URL': { url: taskData.githubUrl } }),
      },
    });

    return {
      id: response.id,
      ...taskData,
      createdTime: new Date().toISOString(),
      lastEditedTime: new Date().toISOString(),
    };
  } catch (error) {
    console.error('Error creating Notion task:', error);
    return null;
  }
}

/**
 * Update an existing task in Notion
 */
export async function updateNotionTask(taskId: string, updates: Partial<NotionTask>): Promise<NotionTask | null> {
  try {
    const properties: any = {};

    if (updates.title) properties['Title'] = { title: [{ text: { content: updates.title } }] };
    if (updates.description) properties['Description'] = { rich_text: [{ text: { content: updates.description } }] };
    if (updates.status) properties['Status'] = { select: { name: updates.status } };
    if (updates.priority) properties['Priority'] = { select: { name: updates.priority } };
    if (updates.dueDate) properties['Due Date'] = { date: { start: updates.dueDate } };
    if (updates.labels) properties['Labels'] = { multi_select: updates.labels.map(label => ({ name: label })) };
    if (updates.githubIssueNumber) properties['GitHub Issue Number'] = { number: updates.githubIssueNumber };
    if (updates.githubRepository) properties['GitHub Repository'] = { rich_text: [{ text: { content: updates.githubRepository } }] };
    if (updates.githubUrl) properties['GitHub URL'] = { url: updates.githubUrl };

    const response = await notion.pages.update({
      page_id: taskId,
      properties,
    });

    // Return updated task (you might want to fetch it fresh instead)
    return {
      id: taskId,
      ...updates,
      lastEditedTime: new Date().toISOString(),
    } as NotionTask;
  } catch (error) {
    console.error('Error updating Notion task:', error);
    return null;
  }
}
