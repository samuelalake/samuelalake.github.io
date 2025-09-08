import { Client } from '@notionhq/client';
import { NotionToMarkdown } from 'notion-to-md';

// Initialize Notion client
const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

// Initialize Notion to Markdown converter
const n2m = new NotionToMarkdown({ notionClient: notion });

export interface NotionProject {
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

/**
 * Get all projects from Notion database
 */
export async function getNotionProjects(): Promise<NotionProject[]> {
  try {
    const response = await notion.databases.query({
      database_id: process.env.NOTION_PROJECTS_DATABASE_ID!,
      filter: {
        property: 'Published',
        checkbox: {
          equals: true,
        },
      },
      sorts: [
        {
          property: 'Created',
          direction: 'descending',
        },
      ],
    });

    const projects = await Promise.all(
      response.results.map(async (page: any) => {
        const properties = page.properties;
        
        // Get the brief and roadmap content
        const briefContent = await getNotionPageContent(page.id, 'Brief');
        const roadmapContent = await getNotionPageContent(page.id, 'Roadmap');

        return {
          id: page.id,
          title: properties.Title?.title?.[0]?.plain_text || 'Untitled',
          description: properties.Description?.rich_text?.[0]?.plain_text || '',
          brief: briefContent,
          roadmap: roadmapContent,
          status: properties.Status?.select?.name || 'Draft',
          tags: properties.Tags?.multi_select?.map((tag: any) => tag.name) || [],
          createdTime: page.created_time,
          lastEditedTime: page.last_edited_time,
          coverImage: properties.Cover?.files?.[0]?.file?.url,
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
 * Get all blog posts from Notion database
 */
export async function getNotionBlogPosts(): Promise<NotionBlogPost[]> {
  try {
    const response = await notion.databases.query({
      database_id: process.env.NOTION_BLOG_DATABASE_ID!,
      filter: {
        property: 'Published',
        checkbox: {
          equals: true,
        },
      },
      sorts: [
        {
          property: 'Published Date',
          direction: 'descending',
        },
      ],
    });

    const posts = await Promise.all(
      response.results.map(async (page: any) => {
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
async function getNotionPageContent(pageId: string, section?: string): Promise<string> {
  try {
    const mdblocks = await n2m.pageToMarkdown(pageId);
    const mdString = n2m.toMarkdownString(mdblocks);
    
    if (section) {
      // Extract specific section from markdown
      const lines = mdString.parent.split('\n');
      let inSection = false;
      let sectionContent: string[] = [];
      
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
