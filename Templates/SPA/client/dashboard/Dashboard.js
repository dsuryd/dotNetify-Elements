import React from 'react';
import { VMContext } from 'dotnetify-elements/components';
import { Card } from 'dotnetify-elements/components/Card';
import { Frame, Panel } from 'dotnetify-elements/components/Panel';
import { withTheme } from 'dotnetify-elements/components/Theme';
import { BarChart, LineChart, PieChart } from 'dotnetify-elements/components/Chart';

import { getAuthHeaders } from '../auth';
import InfoCard from './InfoCard';
import ActivitiesCard from './ActivitiesCard';

const infoPanelCss = `
   flex: 1 1 20%;
   @media (max-width: 1280px) { flex: 1 1 40%; }    
   @media (max-width: 880px) { flex: 1 1 100%; }       
`;

const getVmOptions = _ => ({
  exceptionHandler: _ => auth.signOut()
});

const Dashboard = _ => (
  <VMContext vm="Dashboard" options={getAuthHeaders()}>
    <Frame css="max-width: calc(100% - 3rem)">
      <Panel horizontal wrap childProps={{ css: infoPanelCss }}>
        <Panel>
          <InfoCard id="Download" color="#1c8adb" />
        </Panel>
        <Panel>
          <InfoCard id="Upload" color="#5cb85c" />
        </Panel>
        <Panel>
          <InfoCard id="Latency" color="#f0ad4e" />
        </Panel>
        <Panel>
          <InfoCard id="Users" color="#d9534f" />
        </Panel>
      </Panel>
      <Panel>
        <Card>
          <Panel horizontal>
            <Panel flex="70%">
              <h4>Network Traffic</h4>
              <LineChart id="Traffic" height="75px" />
            </Panel>
            <Panel flex="30%">
              <h4>Utilization</h4>
              <PieChart id="Utilization" />
            </Panel>
          </Panel>
        </Card>
        <Panel horizontal>
          <Panel flex="40%">
            <ActivitiesCard flex id="RecentActivities" />
          </Panel>
          <Panel flex="60%">
            <Card flex>
              <h4>Server Usage</h4>
              <BarChart id="ServerUsage" height="70px" />
            </Card>
          </Panel>
        </Panel>
      </Panel>
    </Frame>
  </VMContext>
);

export default withTheme(Dashboard);
