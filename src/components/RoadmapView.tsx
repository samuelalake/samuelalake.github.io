import React, { useState } from 'react';
import { NotionTask } from '../lib/notion';
import { 
  Box,
  Text, 
  Label, 
  Link,
  Heading,
  Button,
  ActionMenu,
  ActionList
} from '@primer/react';
import { Table, DataTable } from '@primer/react/experimental';
import { 
  IssueOpenedIcon, 
  CheckIcon, 
  ClockIcon, 
  AlertIcon,
  ProjectIcon,
  TableIcon,
  ChevronDownIcon
} from '@primer/octicons-react';
import ProjectBoard from './ProjectBoard';

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

const RoadmapView: React.FC<RoadmapViewProps> = ({ 
  tasks, 
  groupedByStatus, 
  groupedByPriority, 
  showFilters = true 
}) => {
  const [viewMode, setViewMode] = useState<'board' | 'table'>('board');

  // Helper function to get status icon
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Done':
        return <CheckIcon size={16} />;
      case 'In Progress':
        return <ClockIcon size={16} />;
      case 'Todo':
        return <IssueOpenedIcon size={16} />;
      default:
        return <IssueOpenedIcon size={16} />;
    }
  };

  // Helper function to get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Done':
        return 'purple'; // Purple for closed/merged
      case 'In Progress':
        return 'green'; // Green for open/in progress
      case 'Todo':
        return 'green'; // Green for open
      default:
        return 'green'; // Green for open by default
    }
  };

  // Helper function to get status label variant
  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'Done':
        return 'success';
      case 'In Progress':
        return 'attention';
      case 'Todo':
        return 'default';
      default:
        return 'secondary';
    }
  };

  return (
    <Box sx={{ width: '100%' }}>
      {/* Main Board Container */}
      <Box sx={{ 
        //overflow: 'hidden'
      }}>
        {/* View Header */}
        <Box sx={{ 
          bg: 'canvas.inset',
          pt: 3, px: 3,
          borderBottom: '1px solid',
          borderBottomColor: 'border.default'
        }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            {/* Sprint Selector */}
            <ActionMenu>
              <ActionMenu.Button
                variant="default"
                trailingAction={ChevronDownIcon}
                sx={{ fontSize: 1 }}
              >
                <span>
                  <Text sx={{ color: 'fg.muted' }}>Sprint:</Text>{' '}
                  <Text sx={{ color: 'fg.default' }}>Sprint 1</Text>
                </span>
              </ActionMenu.Button>
              <ActionMenu.Overlay>
                <ActionList>
                  <ActionList.Item>Sprint 1</ActionList.Item>
                  <ActionList.Item>Sprint 2</ActionList.Item>
                </ActionList>
              </ActionMenu.Overlay>
            </ActionMenu>
          </Box>

                   {/* View Tabs */}
                   <Box sx={{ display: 'flex', alignItems: 'center' }}>
                     <Box sx={{ 
                       display: 'flex',
                       height: '37px',
                       alignItems: 'center',
                       px: 3,
                       py: 2,
                       borderRadius: '6px 6px 0 0',
                       //border: viewMode === 'board' ? '1px solid' : '1px solid',
                       borderColor: 'border.default',
                       //borderBottom: viewMode === 'board' ? 'none' : '1px solid',
                       //borderBottomColor: viewMode === 'board' ? 'transparent' : 'border.default',
                       bg: viewMode === 'board' ? 'canvas.default' : 'transparent',
                       gap: 1,
                       cursor: 'pointer',
                       color: viewMode === 'board' ? 'fg.default' : 'fg.muted'
                     }}
                     onClick={() => setViewMode('board')}
                     >
                       <ProjectIcon size={16} />
                       <Text sx={{ fontSize: 1, fontWeight: 'normal' }}>Board view</Text>
                     </Box>
                     <Box sx={{ 
                       display: 'flex',
                       height: '37px',
                       alignItems: 'center',
                       px: 3,
                       py: 2,
                       borderRadius: '6px 6px 0 0',
                       //border: viewMode === 'table' ? '1px solid' : '1px solid',
                       borderColor: 'border.default',
                       //borderBottom: viewMode === 'table' ? 'none' : '1px solid',
                       //borderBottomColor: viewMode === 'table' ? 'transparent' : 'border.default',
                       bg: viewMode === 'table' ? 'canvas.default' : 'transparent',
                       gap: 1,
                       cursor: 'pointer',
                       color: viewMode === 'table' ? 'fg.default' : 'fg.muted'
                     }}
                     onClick={() => setViewMode('table')}
                     >
                       <TableIcon size={16} />
                       <Text sx={{ fontSize: 1, fontWeight: 'normal' }}>Table view</Text>
                     </Box>
                   </Box>
        </Box>

        {/* Project Board */}
        {viewMode === 'board' ? (
          <ProjectBoard 
            tasks={tasks}
            groupedByStatus={groupedByStatus}
          />
        ) : (
          <Box 
            sx={{
              // Only target the table container to remove border radius
              '& [class*="Table"]': {
                borderRadius: '0 !important',
                //border: 'none !important'
              },
              // Style the header to look like regular rows
              '& thead tr th': {
                backgroundColor: 'transparent',
                //borderBottom: '1px solid',
                //borderBottomColor: 'border.default',
                color: 'fg.muted',
              }
            }}
          >
            <Table.Container sx={{ border: 'none', borderRadius: 0 }}>
              <DataTable
                aria-labelledby="tasks-table"
                data={tasks}
                columns={[
                {
                  header: 'Title',
                  field: 'title',
                  rowHeader: true,
                  renderCell: (row) => {
                    const task = row as NotionTask;
                    return (
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Box sx={{ color: getStatusColor(task.status) }}>
                          {getStatusIcon(task.status)}
                        </Box>
                        <Box>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Text sx={{ fontWeight: 'normal' }}>{task.title}</Text>
                            {task.githubIssueNumber && (
                              <Text sx={{ fontSize: 0, color: 'fg.muted', fontWeight: 'normal' }}>
                                #{task.githubIssueNumber}
                              </Text>
                            )}
                          </Box>
                          {task.description && (
                            <Text sx={{ fontSize: 0, color: 'fg.muted', mt: 1 }}>
                              {task.description}
                            </Text>
                          )}
                        </Box>
                      </Box>
                    );
                  },
                },
                {
                  header: 'Status',
                  field: 'status',
                  renderCell: (row) => {
                    const task = row as NotionTask;
                    return (
                      <Label size="small" variant={getStatusVariant(task.status)}>
                        {task.status || 'No Status'}
                      </Label>
                    );
                  },
                },
              ]}
              />
            </Table.Container>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default RoadmapView;