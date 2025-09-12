import React from 'react';
import { 
  Box, 
  Text, 
  Timeline,
  NavList
} from '@primer/react';
import { GitCommitIcon } from '@primer/octicons-react';

interface ActivitySidebarProps {
  timeline?: Array<{
    title: string;
    subtitle: string;
  }>;
}

const ActivitySidebar: React.FC<ActivitySidebarProps> = ({ timeline = [] }) => {
  const defaultTimeline = [
    { title: "Planning", subtitle: "Project planning and requirements gathering" },
    { title: "Development", subtitle: "Core development and implementation" },
    { title: "Testing", subtitle: "Testing and quality assurance" },
    { title: "Launch", subtitle: "Project launch and deployment" }
  ];

  const timelineData = timeline.length > 0 ? timeline : defaultTimeline;

  return (
    <Box sx={{ p: 3 }}>
      <NavList.Group title="Project Timeline">
        <Timeline aria-label="Project development timeline">
          {timelineData.map((item, idx) => (
            <Timeline.Item key={idx}>
              <Timeline.Badge>
                <GitCommitIcon aria-label="Milestone" />
              </Timeline.Badge>
              <Timeline.Body>
                <div className="d-flex flex-column" style={{ gap: '4px' }}>
                  <Text className="text-large text-semibold color-fg-default">
                    {item.title}
                  </Text>
                  <Text className="text-small color-fg-muted">{item.subtitle}</Text>
                </div>
              </Timeline.Body>
            </Timeline.Item>
          ))}
        </Timeline>
      </NavList.Group>
    </Box>
  );
};

export default ActivitySidebar;
