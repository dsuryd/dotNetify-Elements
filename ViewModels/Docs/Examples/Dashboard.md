##### Dashboard.js

```jsx
import React from 'react';
import { Card, Frame, Panel, Markdown, Tab, TabItem, VMContext, withTheme } from 'dotnetify-elements';
import { BarChart, LineChart, PieChart } from 'dotnetify-elements';
import InfoCard from './InfoCard';
import ActivitiesCard from './ActivitiesCard';

const infoPanelCss = `
   flex: 1 1 20%;
   @media (max-width: 1500px) { flex: 1 1 40%; }    
   @media (max-width: 880px) { flex: 1 1 100%; }       
`;

const Dashboard = _ => (
   <VMContext vm="AdminDashboard">
      <Frame>
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
```

##### InfoCard.js

```jsx
import React from 'react';
import styled from 'styled-components';
import { Card, CardImage, Element } from 'dotnetify-elements';

const InfoIcon = styled.i.attrs({
   className: 'material-icons'
})`
   font-size: 3rem;
   padding: 1.5rem;
   color: white;   
   background: ${props => props.color};
   opacity: .8;
`;

const cardCss = `
   .card-body { padding: .5rem 1.5rem }
   h3 { font: 600 2rem Helvetica; }
`;

export default class InfoCard extends Element {
   render() {
      const { color, icon, label } = this.attrs;
      return (
         <Card horizontal css={cardCss}>
            <CardImage>
               <InfoIcon color={color}>{icon}</InfoIcon>
            </CardImage>
            <label>{label}</label>
            <h3>{this.value}</h3>
         </Card>
      );
   }
}
```

##### ActivitiesCard.js

```jsx
import React from 'react';
import styled from 'styled-components';
import { Card, Cell, Element, Panel } from 'dotnetify-elements';

const panelCss = `
   overflow-x: hidden;
   .cell { border: none; }
   .cell-body { padding: .5rem 0 }
`;

const statusColors = [ '', 'silver', 'limegreen', 'red', 'gray', 'orange' ];
const userIconColors = [ '#00ce6f', '#a95df0', '#2ea7eb' ];

const UserIcon = styled.span`
   width: 25px;
   height: 25px;
   border-radius: 50%;
   color: white;
   background: ${props => props.color};
   font-weight: bold;
   margin-right: 1rem;
   text-align: center;
`;

const StatusIcon = styled.span`
   height: 14px;
   width: 14px;
   margin-left: 1rem;
   background-color: ${props => statusColors[props.status]};
   border-radius: 50%;
   display: inline-block;
`;

const Activity = ({ person }) => {
   const initial = person.PersonName[0].toUpperCase();
   const iconColor = userIconColors[initial.charCodeAt(0) % 3];
   return (
      <Panel horizontal css={panelCss}>
         <Cell flex>
            <UserIcon color={iconColor}>{initial}</UserIcon>
            {person.PersonName}
         </Cell>
         <Cell flex right middle>
            {person.Status}
            <StatusIcon status={person.StatusId} />
         </Cell>
      </Panel>
   );
};

export default class ActivitiesCard extends Element {
   render() {
      const activities = this.value || [];
      return (
         <Card horizontal>
            <h4>Activities</h4>
            {activities.map((person, idx) => <Activity key={idx} person={person} />)}
         </Card>
      );
   }
}
```

##### AdminDashboard.cs

```csharp
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reactive.Linq;
using DotNetify;
using DotNetify.Elements;
using DotNetify.Routing;

namespace dotNetify_Elements
{
   public class AdminDashboard : BaseVM, IRoutable
   {
      private IDisposable _subscription;

      public RoutingState RoutingState { get; set; } = new RoutingState();

      public AdminDashboard(ILiveDataService liveDataService)
      {
         AddProperty<string>("Download")
            .WithAttribute(new { Label = "Download", Icon = "cloud_download" })
            .SubscribeTo(liveDataService.Download);

         AddProperty<string>("Upload")
            .WithAttribute(new { Label = "Upload", Icon = "cloud_upload" })
            .SubscribeTo(liveDataService.Upload);

         AddProperty<string>("Latency")
            .WithAttribute(new { Label = "Latency", Icon = "network_check" })
            .SubscribeTo(liveDataService.Latency);

         AddProperty<int>("Users")
            .WithAttribute(new { Label = "Users", Icon = "face" })
            .SubscribeTo(liveDataService.Users);

         AddProperty<int[]>("Traffic").SubscribeTo(liveDataService.Traffic);

         AddProperty<int[]>("Utilization")
            .WithAttribute(new ChartAttribute { Labels = new string[] { "Memory", "Disk", "Network" } })
            .SubscribeTo(liveDataService.Utilization);

         AddProperty<int[]>("ServerUsage").SubscribeTo(liveDataService.ServerUsage)
            .WithAttribute(new ChartAttribute { Labels = new string[] { "dns", "sql", "nethst", "w2k", "ubnt", "uat", "ftp", "smtp", "exch", "demo" } });

         AddProperty<Activity[]>("RecentActivities")
            .SubscribeTo(liveDataService.RecentActivity.Select(value =>
            {
               var activities = new Queue<Activity>(Get<Activity[]>("RecentActivities")?.Reverse() ?? new Activity[] { });
               activities.Enqueue(value);
               if (activities.Count > 4)
                  activities.Dequeue();

               return activities.Reverse().ToArray();
            }));

         // Regulate data update interval to no less than every 200 msecs.
         _subscription = Observable
            .Interval(TimeSpan.FromMilliseconds(200))
            .StartWith(0)
            .Subscribe(_ => PushUpdates());
      }

      public override void Dispose()
      {
         _subscription?.Dispose();
         base.Dispose();
      }
   }
}
```