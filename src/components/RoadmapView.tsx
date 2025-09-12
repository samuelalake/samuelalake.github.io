import React, { useState } from 'react';
import { NotionTask } from '../lib/notion';
import { Box, Text, Label, Link } from '@primer/react';
import { IssueOpenedIcon, CheckIcon, ClockIcon, AlertIcon } from '@primer/octicons-react';

interface RoadmapViewProps {
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
  showFilters?: boolean;
}

type ViewMode = 'status' | 'priority' | 'list';
type FilterSource = 'all' | 'github' | 'manual';

const RoadmapView: React.FC<RoadmapViewProps> = ({ 
  tasks, 
  groupedByStatus, 
  groupedByPriority, 
  showFilters = true 
}) => {
  const [viewMode, setViewMode] = useState<ViewMode>('status');
  const [filterSource, setFilterSource] = useState<FilterSource>('all');

  // Filter tasks based on source
  const filteredTasks = tasks.filter(task => {
    if (filterSource === 'all') return true;
    if (filterSource === 'github') return task.source === 'GitHub';
    if (filterSource === 'manual') return task.source === 'Manual';
    return true;
  });

  // Apply filters to grouped data
  const filteredGroupedByStatus = {
    todo: groupedByStatus.todo.filter(task => filteredTasks.includes(task)),
    inProgress: groupedByStatus.inProgress.filter(task => filteredTasks.includes(task)),
    done: groupedByStatus.done.filter(task => filteredTasks.includes(task)),
  };

  const filteredGroupedByPriority = {
    urgent: groupedByPriority.urgent.filter(task => filteredTasks.includes(task)),
    high: groupedByPriority.high.filter(task => filteredTasks.includes(task)),
    medium: groupedByPriority.medium.filter(task => filteredTasks.includes(task)),
    low: groupedByPriority.low.filter(task => filteredTasks.includes(task)),
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Done':
        return <CheckIcon size={16} />;
      case 'In Progress':
        return <ClockIcon size={16} />;
      default:
        return <IssueOpenedIcon size={16} />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Urgent':
        return 'danger';
      case 'High':
        return 'severe';
      case 'Medium':
        return 'attention';
      case 'Low':
        return 'accent';
      default:
        return 'secondary';
    }
  };

  const TaskCard: React.FC<{ task: NotionTask }> = ({ task }) => (
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
      <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {getStatusIcon(task.status)}
          <Text sx={{ fontWeight: 'semibold', fontSize: 1 }}>
            {task.githubUrl ? (
              <Link href={task.githubUrl} target="_blank" rel="noopener noreferrer">
                {task.title}
              </Link>
            ) : (
              task.title
            )}
          </Text>
        </Box>
        <Label variant={getPriorityColor(task.priority)} size="small">
          {task.priority}
        </Label>
      </Box>
      
      {task.description && (
        <Text sx={{ fontSize: 0, color: 'fg.muted', mb: 2, lineHeight: 1.4 }}>
          {task.description}
        </Text>
      )}
      
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
        {task.labels.map((label, index) => (
          <Label key={index} size="small" variant="secondary">
            {label}
          </Label>
        ))}
        
        {task.source === 'GitHub' && task.githubRepository && (
          <Label size="small" variant="accent">
            📁 {task.githubRepository}
          </Label>
        )}
        
        {task.githubIssueNumber && (
          <Label size="small" variant="secondary">
            #{task.githubIssueNumber}
          </Label>
        )}
      </Box>
    </Box>
  );

  const StatusColumn: React.FC<{ title: string; tasks: NotionTask[]; icon: React.ReactNode }> = ({ 
    title, 
    tasks, 
    icon 
  }) => (
    <Box sx={{ flex: 1, minWidth: 0 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
        {icon}
        <Text sx={{ fontWeight: 'semibold', fontSize: 2 }}>{title}</Text>
        <Label size="small" variant="secondary">{tasks.length}</Label>
      </Box>
      <Box>
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
        {tasks.length === 0 && (
          <Text sx={{ color: 'fg.muted', fontStyle: 'italic', textAlign: 'center', py: 4 }}>
            No tasks
          </Text>
        )}
      </Box>
    </Box>
  );

  const PrioritySection: React.FC<{ title: string; tasks: NotionTask[]; color: string }> = ({ 
    title, 
    tasks, 
    color 
  }) => (
    <Box sx={{ mb: 4 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
        <AlertIcon size={16} />
        <Text sx={{ fontWeight: 'semibold', fontSize: 2 }}>{title}</Text>
        <Label size="small" variant={color as any}>{tasks.length}</Label>
      </Box>
      <Box sx={{ display: 'grid', gap: 2 }}>
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
        {tasks.length === 0 && (
          <Text sx={{ color: 'fg.muted', fontStyle: 'italic', textAlign: 'center', py: 2 }}>
            No {title.toLowerCase()} priority tasks
          </Text>
        )}
      </Box>
    </Box>
  );

  return (
    <Box sx={{ width: '100%' }}>
      {showFilters && (
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: 3, 
          mb: 4, 
          p: 3, 
          bg: 'canvas.subtle', 
          borderRadius: 2,
          flexWrap: 'wrap'
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Text sx={{ fontWeight: 'semibold', fontSize: 1 }}>View:</Text>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <button
                onClick={() => setViewMode('status')}
                style={{
                  padding: '4px 8px',
                  fontSize: '12px',
                  border: '1px solid #d0d7de',
                  borderRadius: '6px',
                  backgroundColor: viewMode === 'status' ? '#0969da' : 'transparent',
                  color: viewMode === 'status' ? 'white' : '#24292f',
                  cursor: 'pointer'
                }}
              >
                By Status
              </button>
              <button
                onClick={() => setViewMode('priority')}
                style={{
                  padding: '4px 8px',
                  fontSize: '12px',
                  border: '1px solid #d0d7de',
                  borderRadius: '6px',
                  backgroundColor: viewMode === 'priority' ? '#0969da' : 'transparent',
                  color: viewMode === 'priority' ? 'white' : '#24292f',
                  cursor: 'pointer'
                }}
              >
                By Priority
              </button>
              <button
                onClick={() => setViewMode('list')}
                style={{
                  padding: '4px 8px',
                  fontSize: '12px',
                  border: '1px solid #d0d7de',
                  borderRadius: '6px',
                  backgroundColor: viewMode === 'list' ? '#0969da' : 'transparent',
                  color: viewMode === 'list' ? 'white' : '#24292f',
                  cursor: 'pointer'
                }}
              >
                List View
              </button>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Text sx={{ fontWeight: 'semibold', fontSize: 1 }}>Source:</Text>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <button
                onClick={() => setFilterSource('all')}
                style={{
                  padding: '4px 8px',
                  fontSize: '12px',
                  border: '1px solid #d0d7de',
                  borderRadius: '6px',
                  backgroundColor: filterSource === 'all' ? '#0969da' : 'transparent',
                  color: filterSource === 'all' ? 'white' : '#24292f',
                  cursor: 'pointer'
                }}
              >
                All Sources
              </button>
              <button
                onClick={() => setFilterSource('github')}
                style={{
                  padding: '4px 8px',
                  fontSize: '12px',
                  border: '1px solid #d0d7de',
                  borderRadius: '6px',
                  backgroundColor: filterSource === 'github' ? '#0969da' : 'transparent',
                  color: filterSource === 'github' ? 'white' : '#24292f',
                  cursor: 'pointer'
                }}
              >
                GitHub Issues
              </button>
              <button
                onClick={() => setFilterSource('manual')}
                style={{
                  padding: '4px 8px',
                  fontSize: '12px',
                  border: '1px solid #d0d7de',
                  borderRadius: '6px',
                  backgroundColor: filterSource === 'manual' ? '#0969da' : 'transparent',
                  color: filterSource === 'manual' ? 'white' : '#24292f',
                  cursor: 'pointer'
                }}
              >
                Manual Tasks
              </button>
            </Box>
          </Box>

          <Box sx={{ ml: 'auto' }}>
            <Text sx={{ fontSize: 1, color: 'fg.muted' }}>
              {filteredTasks.length} tasks total
            </Text>
          </Box>
        </Box>
      )}

      {viewMode === 'status' && (
        <Box sx={{ display: 'flex', gap: 4, overflowX: 'auto', pb: 2 }}>
          <StatusColumn 
            title="To Do" 
            tasks={filteredGroupedByStatus.todo} 
            icon={<IssueOpenedIcon size={16} />} 
          />
          <StatusColumn 
            title="In Progress" 
            tasks={filteredGroupedByStatus.inProgress} 
            icon={<ClockIcon size={16} />} 
          />
          <StatusColumn 
            title="Done" 
            tasks={filteredGroupedByStatus.done} 
            icon={<CheckIcon size={16} />} 
          />
        </Box>
      )}

      {viewMode === 'priority' && (
        <Box>
          <PrioritySection title="Urgent" tasks={filteredGroupedByPriority.urgent} color="danger" />
          <PrioritySection title="High" tasks={filteredGroupedByPriority.high} color="severe" />
          <PrioritySection title="Medium" tasks={filteredGroupedByPriority.medium} color="attention" />
          <PrioritySection title="Low" tasks={filteredGroupedByPriority.low} color="accent" />
        </Box>
      )}

      {viewMode === 'list' && (
        <Box>
          {filteredTasks
            .sort((a, b) => {
              // Sort by priority first, then by updated date
              const priorityOrder = { 'Urgent': 4, 'High': 3, 'Medium': 2, 'Low': 1 };
              const aPriority = priorityOrder[a.priority as keyof typeof priorityOrder] || 2;
              const bPriority = priorityOrder[b.priority as keyof typeof priorityOrder] || 2;
              
              if (aPriority !== bPriority) {
                return bPriority - aPriority;
              }
              
              return new Date(b.lastEditedTime).getTime() - new Date(a.lastEditedTime).getTime();
            })
            .map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          
          {filteredTasks.length === 0 && (
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <Text sx={{ color: 'fg.muted', fontSize: 2 }}>
                No tasks found
              </Text>
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
};

export default RoadmapView;