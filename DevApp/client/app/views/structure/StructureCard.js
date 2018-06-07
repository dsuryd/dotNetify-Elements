import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Button, Card, Element, Image, Markdown, Panel, TabItem, VMContext, defaultTheme, withTheme } from 'dotnetify-elements';
import { TabsArticle, RenderCustomize, RenderExample } from '../../components';

const StructureCard = props => (
   <TabsArticle vm="StructureCard" id="Overview">
      <TabItem label="Overview" name="Overview">
         <Markdown id="Overview">
            <CardExample />
            <CardImageExample />
         </Markdown>
      </TabItem>
      <TabItem label="API" name="API">
         <Markdown id="API" />
      </TabItem>
      <TabItem label="Customize">
         <CardCustomize />
      </TabItem>
   </TabsArticle>
);

class CardExample extends React.Component {
   render() {
      const buildCode = props => `
\`\`\`jsx
import React from 'react';
import { Button, Card, Markdown, Panel, VMContext } from 'dotnetify-elements';

const MyApp = _ => (
   <VMContext vm="CardExample">
      <Card width="400px">
         <header>
            <Markdown id="Title" />
         </header>
         <Markdown id="Content" />
         <footer>
            <Panel right><Button id="Register" /></Panel>
         </footer>
      </Card>
   </VMContext>
);
\`\`\``;
      const setState = state => this.setState(state);
      return (
         <RenderExample vm="CardExample" propTypes={Card.propTypes} buildCode={buildCode} onChange={setState}>
            <Panel css="margin-bottom: 2rem">
               <Card width="400px">
                  <header>
                     <Markdown id="Title" />
                  </header>
                  <Markdown id="Content" />
                  <footer>
                     <Panel right>
                        <Button id="Register" />
                     </Panel>
                  </footer>
               </Card>
            </Panel>
         </RenderExample>
      );
   }
}

const CardImageExample = _ => (
   <VMContext vm="CardImageExample">
      <Panel css="margin-bottom: 2rem">
         <Card width="360px">
            <Image id="Picture" />
            <Markdown id="Content" />
         </Card>
      </Panel>
   </VMContext>
);

class CardCustomize extends React.Component {
   state = {};
   imageData = 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22255%22%20height%3D%22180%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20255%20180%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_163d32075fc%20text%20%7B%20fill%3Argba(255%2C255%2C255%2C.75)%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A13pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_163d32075fc%22%3E%3Crect%20width%3D%22255%22%20height%3D%22180%22%20fill%3D%22%23777%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%2294.2578125%22%20y%3D%2296%22%3EImage%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E';

   render() {
      const componentTypes = Card.componentTypes;
      const handleSelected = state => this.setState(state);
      const select = value => ({});
      return (
         <RenderCustomize name="Card" componentTypes={componentTypes} select={select} onSelected={handleSelected}>
            <Card width="255px">
               <img src={this.imageData} />
               <header>Header</header>
               <div>Body</div>
               <footer>Footer</footer>
            </Card>
         </RenderCustomize>
      );
   }
}

export default withTheme(StructureCard);
