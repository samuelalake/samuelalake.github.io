import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface MarkdownContent {
  content: string;
  data: Record<string, unknown>;
}

export function getMarkdownContent(slug: string, type: 'brief' | 'roadmap'): MarkdownContent | null {
  try {
    const filePath = path.join(process.cwd(), 'content', 'projects', `${slug}-${type}.md`);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);
    
    return {
      content,
      data
    };
  } catch (error) {
    console.warn(`Could not load markdown content for ${slug}-${type}:`, error);
    return null;
  }
}

export function getAllMarkdownContent(slug: string): {
  brief: MarkdownContent | null;
  roadmap: MarkdownContent | null;
} {
  return {
    brief: getMarkdownContent(slug, 'brief'),
    roadmap: getMarkdownContent(slug, 'roadmap')
  };
}
