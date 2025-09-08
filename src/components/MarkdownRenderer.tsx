import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import { Text, Box, Link } from '@primer/react';

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

export default function MarkdownRenderer({ content, className }: MarkdownRendererProps) {
  return (
    <Box className={className}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
        components={{
          // Custom components for better styling with Primer
          h1: ({ children }) => (
            <h1 className="h1 text-bold color-fg-default mb-3">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="h2 text-semibold color-fg-default mb-2 mt-4">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="h3 text-semibold color-fg-default mb-2 mt-3">
              {children}
            </h3>
          ),
          h4: ({ children }) => (
            <h4 className="h4 text-semibold color-fg-default mb-1 mt-3">
              {children}
            </h4>
          ),
          p: ({ children }) => (
            <Text className="text-medium color-fg-default mb-3">
              {children}
            </Text>
          ),
          ul: ({ children }) => (
            <ul className="color-fg-default mb-3" style={{ paddingLeft: '20px' }}>
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="color-fg-default mb-3" style={{ paddingLeft: '20px' }}>
              {children}
            </ol>
          ),
          li: ({ children }) => (
            <li className="text-medium color-fg-default mb-1">
              {children}
            </li>
          ),
          a: ({ href, children }) => (
            <Link href={href} target="_blank" rel="noopener noreferrer">
              {children}
            </Link>
          ),
          code: ({ children, className }) => {
            const isInline = !className;
            if (isInline) {
              return (
                <code className="color-bg-neutral-muted color-fg-default px-1 py-0.5 rounded" style={{ fontSize: '0.85em' }}>
                  {children}
                </code>
              );
            }
            return (
              <code className={className}>
                {children}
              </code>
            );
          },
          pre: ({ children }) => (
            <pre className="color-bg-neutral-muted color-fg-default p-3 rounded overflow-x-auto mb-3" style={{ fontSize: '0.85em' }}>
              {children}
            </pre>
          ),
          blockquote: ({ children }) => (
            <blockquote className="color-border-default border-left pl-3 ml-0 mb-3" style={{ borderLeftWidth: '4px' }}>
              {children}
            </blockquote>
          ),
          table: ({ children }) => (
            <div className="overflow-x-auto mb-3">
              <table className="color-fg-default" style={{ borderCollapse: 'collapse', width: '100%' }}>
                {children}
              </table>
            </div>
          ),
          th: ({ children }) => (
            <th className="color-bg-neutral-muted color-fg-default text-semibold p-2 border" style={{ borderColor: 'var(--color-border-default)' }}>
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="color-fg-default p-2 border" style={{ borderColor: 'var(--color-border-default)' }}>
              {children}
            </td>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </Box>
  );
}
