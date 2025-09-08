import Head from 'next/head'
import { Text, Heading, Checkbox, Timeline, CheckboxGroup, PageLayout } from "@primer/react";
import MainLayout from '../components/layout/MainLayout'
import { GitCommitIcon } from '@primer/octicons-react';

interface TimelineItemData {
  title: string;
  subtitle: string;
}

const ITEMS: TimelineItemData[] = [
  { title: "Composa", subtitle: "Some tagline here" },
  { title: "Composa", subtitle: "Some tagline here" },
  { title: "Composa", subtitle: "Some tagline here" },
];

function TimelineItem({ item }: { item: TimelineItemData }) {
  return (
    <Timeline.Item>
      <Timeline.Badge>
        <GitCommitIcon aria-label="Commit" />
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
  );
}

export default function Activity() {
  return (
    <>
      <Head>
        <title>Activity - Samuel Alake</title>
        <meta name="description" content="Timeline of Samuel Alake's professional activity and contributions" />
      </Head>
      
      <MainLayout>
        <div className="mx-auto max-w-[1200px] px-4 py-4">
          <PageLayout>
            <PageLayout.Content>
              {/* UnderlineNav already shows the page label; keep heading for a11y only */}
              <Heading as="h2" className="sr-only">Activity</Heading>
              <div 
                className="d-grid"
                style={{ 
                  gap: '32px',
                  gridTemplateColumns: '1fr 260px'
                }}
              >
                {/* Timeline */}
                <Timeline>
                  {ITEMS.map((item, idx) => (
                    <TimelineItem key={idx} item={item} />
                  ))}
                </Timeline>

                
              </div>
            </PageLayout.Content>
            <PageLayout.Pane position="end">
              {/* Filters */}
              <div>
                  <CheckboxGroup>
                    <CheckboxGroup.Label className="text-semibold color-fg-default">Filter by type</CheckboxGroup.Label>
                    <div className="mt-2 d-flex flex-column" style={{ gap: '8px' }}>
                      <label className="d-flex flex-items-start" style={{ gap: '8px' }}>
                        <Checkbox value="commits" />
                        <Text className="text-small color-fg-default">Commits</Text>
                      </label>
                      <label className="d-flex flex-items-start" style={{ gap: '8px' }}>
                        <Checkbox value="pull-requests" />
                        <Text className="text-small color-fg-default">Pull Requests</Text>
                      </label>
                      <label className="d-flex flex-items-start" style={{ gap: '8px' }}>
                        <Checkbox value="issues" />
                        <Text className="text-small color-fg-default">Issues</Text>
                      </label>
                      <label className="d-flex flex-items-start" style={{ gap: '8px' }}>
                        <Checkbox value="releases" />
                        <Text className="text-small color-fg-default">Releases</Text>
                      </label>
                    </div>
                  </CheckboxGroup>
                </div>
            </PageLayout.Pane>
          </PageLayout>
        </div>
      </MainLayout>
    </>
  );
}
