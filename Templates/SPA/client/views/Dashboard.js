import React from 'react';
import styled from 'styled-components';
import { Card, CardImage, Element, Frame, Panel, VMContext, withTheme } from 'dotnetify-elements';

const BigIcon = styled.i.attrs({
   className: 'material-icons'
})`
   font-size: 3rem;
   color: white;
   padding: 2rem;
   background: #1c8adb;
`;

const infoBoxCss = `
   min-width: 300px; 
   padding-bottom: 1rem;
`;

const Dashboard = _ => (
   <VMContext vm="Dashboard">
      <Frame>
         <Panel horizontal wrap childProps={{ css: infoBoxCss }}>
            <Panel flex>
               <Card horizontal>
                  <CardImage>
                     <BigIcon>face</BigIcon>
                  </CardImage>
                  <h3>Download</h3>
                  <Element id="Download" />
               </Card>
            </Panel>
            <Panel flex>
               <Card horizontal>
                  <CardImage>
                     <BigIcon>face</BigIcon>
                  </CardImage>
                  <h3>Upload</h3>
                  <Element id="Upload" />
               </Card>
            </Panel>
            <Panel flex>
               <Card horizontal>
                  <CardImage>
                     <BigIcon>face</BigIcon>
                  </CardImage>
                  <h3>Latency</h3>
                  <Element id="Latency" />
               </Card>
            </Panel>
            <Panel flex>
               <Card horizontal>
                  <CardImage>
                     <BigIcon>face</BigIcon>
                  </CardImage>
                  <h3>Users</h3>
                  <Element id="Users" />
               </Card>
            </Panel>
         </Panel>
      </Frame>
   </VMContext>
);

export default withTheme(Dashboard);
