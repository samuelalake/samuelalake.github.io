import React from 'react';
import { 
  Box, 
  Heading, 
  Text, 
  CounterLabel,
  Button
} from '@primer/react';
import { 
  IssueOpenedIcon,
  GitPullRequestIcon,
  IssueClosedIcon
} from '@primer/octicons-react';
import IssueCard from './IssueCard';
import { NotionTask } from '../lib/notion';

interface ProjectBoardProps {
  tasks: NotionTask[];
  groupedByStatus: {
    todo: NotionTask[];
    inProgress: NotionTask[];
    done: NotionTask[];
  };
}

interface KanbanColumnProps {
  title: string;
  count: number;
  indicatorColor: string;
  indicatorBg: string;
  children: React.ReactNode;
  description?: string;
}

const KanbanColumn: React.FC<KanbanColumnProps> = ({ 
  title, 
  count, 
  indicatorColor, 
  indicatorBg, 
  children, 
  description 
}) => {
  return (
    <Box sx={{ 
      minWidth: '350px',
      width: '350px',
      border: '1px solid',
      borderColor: 'border.default',
      borderRadius: 2,
      bg: 'canvas.inset',
      mr: 2,
      overflow: 'hidden'
    }}>
      {/* Column Header */}
      <Box sx={{ 
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        p: 3,
        bg: 'canvas.inset'
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Box sx={{
            width: '16px',
            height: '16px',
            borderRadius: '8px',
            border: '2px solid',
            borderColor: indicatorColor,
            bg: indicatorBg
          }} />
          <Heading sx={{ fontSize: 2, fontWeight: 'semibold' }}>
            {title}
          </Heading>
          <CounterLabel sx={{ 
            bg: 'neutral.subtle',
            color: 'fg.muted',
            fontSize: 0
          }}>
            {count}
          </CounterLabel>
        </Box>
      </Box>

      {/* Column Description */}
      {description && (
        <Box sx={{ px: 3, pb: 2 }}>
          <Text sx={{ fontSize: 1, color: 'fg.muted' }}>
            {description}
          </Text>
        </Box>
      )}

      {/* Column Content */}
      <Box sx={{ p: 2, minHeight: '400px' }}>
        {children}
      </Box>


    </Box>
  );
};

const ProjectBoard: React.FC<ProjectBoardProps> = ({ tasks, groupedByStatus }) => {
  // Convert NotionTask to mock issue format for display
  const convertTaskToIssue = (task: NotionTask) => {
    let status: 'open' | 'closed' | 'merged' = 'open';
    
    if (task.status === 'Done') {
      status = 'closed';
    } else if (task.status === 'In Progress') {
      status = 'open';
    }

    return {
      id: parseInt(task.id.replace(/\D/g, '')) || Math.random() * 1000,
      title: task.title,
      status,
      task
    };
  };


  return (
    <Box sx={{ 
      display: 'flex',
      p: 3,
      gap: 2,
      overflowX: 'auto',
      //overflow: 'hidden',
      minHeight: '600px'
    }}>

      {/* Todo Column */}
      <KanbanColumn 
        title="Todo" 
        count={groupedByStatus.todo.length}
        indicatorColor="success.emphasis"
        indicatorBg="success.subtle"
        description="This item hasn't been started"
      >
        {groupedByStatus.todo.map((task) => {
          const issue = convertTaskToIssue(task);
          return (
            <IssueCard 
              key={task.id}
              id={issue.id}
              title={issue.title}
              status={issue.status}
              task={task}
            />
          );
        })}
      </KanbanColumn>

      {/* In Progress Column */}
      <KanbanColumn 
        title="In Progress" 
        count={groupedByStatus.inProgress.length}
        indicatorColor="attention.emphasis"
        indicatorBg="attention.subtle"
        description="This is actively being worked on"
      >
        {groupedByStatus.inProgress.map((task) => {
          const issue = convertTaskToIssue(task);
          return (
            <IssueCard 
              key={task.id}
              id={issue.id}
              title={issue.title}
              status={issue.status}
              task={task}
            />
          );
        })}
      </KanbanColumn>

      {/* Done Column */}
      <KanbanColumn 
        title="Done" 
        count={groupedByStatus.done.length}
        indicatorColor="accent.emphasis"
        indicatorBg="canvas.inset"
        description="This has been completed"
      >
        {groupedByStatus.done.map((task) => {
          const issue = convertTaskToIssue(task);
          return (
            <IssueCard 
              key={task.id}
              id={issue.id}
              title={issue.title}
              status={issue.status}
              task={task}
            />
          );
        })}
      </KanbanColumn>
    </Box>
  );
};

export default ProjectBoard;
