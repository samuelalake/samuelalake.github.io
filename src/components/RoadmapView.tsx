import React, { useState } from 'react';
import { NotionTask } from '../lib/notion';
import { 
  Box,
  Text, 
  Label, 
  ActionMenu,
  ActionList
} from '@primer/react';
import { Table, DataTable } from '@primer/react/experimental';
import { 
  IssueOpenedIcon, 
  CheckIcon, 
  ClockIcon, 
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
      case 'To Do':
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
      case 'To Do':
        return 'green'; // Green for open
      default:
        return 'green'; // Green for open by default
    }
  };

  // Helper function to get status label variant
  const getStatusVariant = (status: string): "default" | "primary" | "secondary" | "accent" | "success" | "attention" | "severe" | "danger" | "done" | "sponsors" => {
    switch (status) {
      case 'Done':
        return 'success';
      case 'In Progress':
        return 'attention';
      case 'To Do':
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
          pt: 3, px: 3
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

          {/* View Tabs with Cutout Effect */}
          <Box sx={{ 
            bg: 'canvas.inset',
            display: 'flex',
            py: 0
          }}>
            <Box sx={{ 
              display: 'flex',
              alignItems: 'center',
              appearance: 'none',
              border: 0,
              bg: 'transparent',
              px: 3,
              py: 2,
              cursor: 'pointer',
              color: viewMode === 'board' ? 'fg.default' : 'fg.muted',
              textDecoration: 'none',
              transition: 'color 0.2s ease-in-out',
              mb: '-1px',
              ...(viewMode === 'board' && {
                borderTop: '1px solid',
                borderLeft: '1px solid', 
                borderRight: '1px solid',
                borderBottom: 0,
                borderColor: 'border.default',
                borderRadius: '6px 6px 0 0',
                bg: 'canvas.default',
                position: 'relative',
                zIndex: 1,
                mb: 0
              })
            }}
            onClick={() => setViewMode('board')}
            >
              <ProjectIcon size={16} />
              <Text sx={{ fontSize: 1, fontWeight: 'normal', ml: 1 }}>Board view</Text>
            </Box>
            <Box sx={{ 
              display: 'flex',
              alignItems: 'center',
              appearance: 'none',
              border: 0,
              bg: 'transparent',
              px: 3,
              py: 2,
              cursor: 'pointer',
              color: viewMode === 'table' ? 'fg.default' : 'fg.muted',
              textDecoration: 'none',
              transition: 'color 0.2s ease-in-out',
              mb: '-1px',
              ...(viewMode === 'table' && {
                borderTop: '1px solid',
                borderLeft: '1px solid',
                borderRight: '1px solid', 
                borderBottom: 0,
                borderColor: 'border.default',
                borderRadius: '6px 6px 0 0',
                bg: 'canvas.default',
                position: 'relative',
                zIndex: 1,
                mb: 0
              })
            }}
            onClick={() => setViewMode('table')}
            >
              <TableIcon size={16} />
              <Text sx={{ fontSize: 1, fontWeight: 'normal', ml: 1 }}>Table view</Text>
            </Box>
          </Box>
        </Box>

        {/* Content Area - Connected to Selected Tab */}
        <Box sx={{ 
          bg: 'canvas.default',
          borderTop: '1px solid',
          borderTopColor: 'border.default',
          mt: '-1px' // Pull content up to meet the tab line
        }}>
          {viewMode === 'board' ? (
            <ProjectBoard 
              tasks={tasks}
              groupedByStatus={groupedByStatus}
            />
          ) : (
            <Box 
              sx={{
                '& td, & th': {
                  borderRight: '1px solid',
                  borderRightColor: 'border.subtle',
                },
                '& thead tr th': {
                  backgroundColor: 'transparent',
                  color: 'fg.muted',
                  fontWeight: 'normal',
                  borderTop: 'none !important',
                  borderBottom: '1px solid',
                  borderBottomColor: 'border.default',
                },
                //Remove left border from first column
                '& td:first-child, & th:first-child': {
                  borderLeft: 'none !important'
                },
                // Remove right border from last column
                '& td:last-child, & th:last-child': {
                  borderRight: 'none !important'
                },
                //Remove bottom border from last row
                '& tbody tr:last-child td, & tbody tr:last-child th': {
                  borderBottom: 'none !important'
                }
              }}
            >
              <Table.Container sx={{ 
                borderRadius: '0 !important',
                boxShadow: 'none !important',
                overflow: 'visible'
              }}>
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
    </Box>
  );
};

export default RoadmapView;