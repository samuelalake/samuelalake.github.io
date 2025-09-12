import React from 'react';
import { 
  Box, 
  Text, 
  Label
} from '@primer/react';
import { 
  IssueOpenedIcon,
  GitPullRequestIcon,
  IssueClosedIcon
} from '@primer/octicons-react';
import { NotionTask } from '../lib/notion';

interface IssueCardProps {
  id: number;
  title: string;
  status: 'open' | 'closed' | 'merged';
  task?: NotionTask;
}

const IssueCard: React.FC<IssueCardProps> = ({ title, status, task }) => {
  const getStatusIcon = () => {
    switch (status) {
      case 'closed':
        return <IssueClosedIcon size={16} />;
      case 'merged':
        return <GitPullRequestIcon size={16} />;
      default:
        return <IssueOpenedIcon size={16} />;
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case 'closed':
        return 'purple'; // Purple for closed/merged
      case 'merged':
        return 'purple'; // Purple for closed/merged
      case 'open':
      default:
        return 'green'; // Green for open
    }
  };

  return (
    <Box
      sx={{
        border: '1px solid',
        borderColor: 'border.default',
        borderRadius: 2,
        p: 3,
        mb: 2,
        bg: 'canvas.default',
        '&:hover': {
          borderColor: 'border.muted',
          bg: 'canvas.subtle',
        },
      }}
    >
      {/* Header */}
      <Box sx={{ mb: 2 }}>
        {/* Icon and issue number on top line */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
          <Box sx={{ color: getStatusColor() }}>
            {getStatusIcon()}
          </Box>
          {task?.githubIssueNumber && (
            <Text sx={{ fontSize: 0, color: 'fg.muted', fontWeight: 'normal' }}>
              #{task.githubIssueNumber}
            </Text>
          )}
        </Box>
        {/* Title below */}
        <Text sx={{ fontWeight: 'normal', fontSize: 1 }}>
          {title}
        </Text>
      </Box>

      {/* Description */}
      {task?.description && (
        <Text sx={{ fontSize: 0, color: 'fg.muted', mb: 2, lineHeight: 1.4 }}>
          {task.description}
        </Text>
      )}

      {/* Labels and metadata */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
        {/* Task labels */}
        {task?.labels?.map((label, index) => (
          <Label key={index} size="small" variant="secondary">
            {label}
          </Label>
        ))}
      </Box>
    </Box>
  );
};

export default IssueCard;
