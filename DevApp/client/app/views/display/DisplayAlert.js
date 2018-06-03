import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Alert, Markdown, TabItem, defaultTheme, withTheme } from 'dotnetify-elements';
import { TabsArticle, RenderCustomize, RenderExample } from '../../components';

const DisplayAlert = props => (
   <TabsArticle vm="DisplayAlert" id="Overview">
      <TabItem label="Overview" name="Overview">
         <Markdown id="Overview" />
      </TabItem>
      <TabItem label="API" name="API">
         <Markdown id="API" />
      </TabItem>
      <TabItem label="Customize">
         <AlertCustomize />
      </TabItem>
   </TabsArticle>
);

class AlertCustomize extends React.Component {
   state = {};

   render() {
      const componentTypes = Alert.componentTypes;
      const handleSelected = state => this.setState(state);
      const select = value => ({});
      return (
         <RenderCustomize name="Alert" componentTypes={componentTypes} select={select} onSelected={handleSelected}>
            <Alert>Alert Content</Alert>
         </RenderCustomize>
      );
   }
}

export default withTheme(DisplayAlert);
