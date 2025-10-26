import styles from './ProgressPage.module.scss';
import { Timeline, TimelineItem } from '@root/components/Timeline';
import GraphDemo from '@root/components/GraphDemo';
import { LinedGraphBackground } from '@root/components/LinedGraphBackground';

// Example static data fixture
export const timelineDataFixture: TimelineItem[] = [
  {
    title: 'Inquiry Received',
    description: 'Received a targeted financial question from the user. Initiated research protocol to define analytical objectives.',
    dataPoint: '1 inquiry processed',
  },
  {
    title: 'Data Aggregation & Screening',
    description: 'Collected and screened financial records across multiple databases to identify relevant data points for analysis.',
    dataPoint: '12,487 records reviewed',
  },
  {
    title: 'In-depth Quantitative Analysis',
    description: 'Applied advanced models to analyze market analysis, extracting key metrics and identifying patterns aligned with the user query.',
    dataPoint: '3,200 transactions analyzed',
  },
  {
    title: 'Validation & Cross-Referencing',
    description: 'Cross-referenced findings with industry benchmarks and external reports to ensure accuracy and contextual relevance.',
    dataPoint: '13 sources validated',
  },
  {
    title: 'Executive Summary Delivered',
    description: "Synthesized insights into a concise, actionable report addressing the user's question, supported by data visualizations and recommendations.",
  },
];

export default function ProgressPage() {
  return (
    <div>
      <LinedGraphBackground>
        <div className={styles.row}>
          <div style={{ minWidth: '50dvw', maxWidth: '50dvw', background: 'white', overflow: 'hidden' }}>
            <GraphDemo />
          </div>
          <div style={{ minWidth: '50dvw', padding: '7%', height: '100%' }}>
            <div style={{ display: 'flex', background: 'white', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
              <Timeline items={timelineDataFixture} />
            </div>
          </div>
        </div>
      </LinedGraphBackground>
    </div>
  );
}
