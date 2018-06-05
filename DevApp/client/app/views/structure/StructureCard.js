import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Button, Card, Element, Markdown, Panel, TabItem, defaultTheme, withTheme } from 'dotnetify-elements';
import { TabsArticle, RenderCustomize, RenderExample } from '../../components';
import pizzaImage from '../../images/card-img-example.jpg';

const StructureCard = props => (
   <TabsArticle vm="StructureCard" id="Overview">
      <TabItem label="Overview" name="Overview">
         <Markdown id="Overview">
            <CardExample />
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

const TitleElement = props => (
   <div style={{ fontSize: '1.8rem' }}>
      <Element {...props} />
   </div>
);

class CardExample extends React.Component {
   render() {
      const buildCode = props => `
\`\`\`jsx
import React from 'react';
import { Element, VMContext } from 'dotnetify-elements';
import pizzaImage from '../../images/card-img-example.jpg';

const TitleElement = props => (
   <div style={{ fontSize: '1.8rem' }}>
      <Element {...props} />
   </div>
);

const MyApp = _ => (
   <VMContext vm="CardExample">
      <Panel horizontal>
      <Card css="width: 350px">
         <header>
            <TitleElement id="Title" />
         </header>
         <Element id="Content" />
         <footer>
            <Button id="Register" />
         </footer>
      </Card>
      <Card>
         <img src={pizzaImage} />
         <TitleElement id="SpecialsTitle" />
         <Element id="Specials" />
      </Card>
      </Panel>
   </VMContext>
);
\`\`\``;
      const setState = state => this.setState(state);
      return (
         <RenderExample vm="CardExample" propTypes={Card.propTypes} buildCode={buildCode} onChange={setState}>
            <Panel horizontal gap="5rem" css="margin-bottom: 2rem">
               <Card css="width: 350px">
                  <header>
                     <TitleElement id="Title" />
                  </header>
                  <Element id="Content" />
                  <footer>
                     <Button id="Register" />
                  </footer>
               </Card>
               <Card>
                  <img src={pizzaImage} />
                  <TitleElement id="SpecialsTitle" />
                  <Element id="Specials" />
               </Card>
            </Panel>
         </RenderExample>
      );
   }
}

class CardCustomize extends React.Component {
   state = {};

   render() {
      const componentTypes = Card.componentTypes;
      const handleSelected = state => this.setState(state);
      const select = value => ({});
      return (
         <RenderCustomize name="Card" componentTypes={componentTypes} select={select} onSelected={handleSelected}>
            <Card css="width: 400px">
               <img src={pizzaImage} style={{ width: '400px', height: '100px' }} />
               <header>Header</header>
               <div>Body</div>
               <footer>Footer</footer>
            </Card>
         </RenderCustomize>
      );
   }
}

export default withTheme(StructureCard);
