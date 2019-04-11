import React from 'react';
import { Image, Markdown, Panel, TabItem, withTheme } from 'dotnetify-elements';
import { TabsArticle, RenderCustomize, RenderExample } from '../../components';

const DisplayImage = props => (
   <TabsArticle vm="DisplayImage" id="Overview">
      <TabItem label="Overview" itemKey="Overview">
         <Markdown id="Overview">
            <ImageExample />
         </Markdown>
      </TabItem>
      <TabItem label="API" itemKey="API">
         <Markdown id="API" />
      </TabItem>
      <TabItem label="Customize">
         <ImageCustomize />
      </TabItem>
   </TabsArticle>
);

class ImageExample extends React.Component {
   render() {
      const buildCode = props => `
\`\`\`jsx
import React from 'react';
import { Image, VMContext } from 'dotnetify-elements';

const MyApp = _ => (
   <VMContext vm="ImageExample">
      <Image id="Picture"${props} />
   </VMContext>
);
\`\`\``;
      const buildWebComponentCode = props => `
\`\`\`jsx
<d-vm-context vm="ImageExample">
   <d-image id="Picture"${props} />
</d-vm-context>
\`\`\``;
      const setState = state => this.setState(state);
      let propTypes = {};

      const setWebComponent = show => this.setState({ webComponent: show });
      const webComponent = this.state && this.state.webComponent;
      const selectBuildCode = webComponent ? buildWebComponentCode : buildCode;

      return (
         <RenderExample
            vm="ImageExample"
            propTypes={propTypes}
            buildCode={selectBuildCode}
            onChange={setState}
            onWebComponent={setWebComponent}
         >
            <Panel css="margin-bottom: 2rem">
               {!webComponent ? (
                  <Image id="Picture" {...this.state} />
               ) : (
                  <d-vm-context vm="ImageExample">
                     <d-image id="Picture" {...this.state} />
                  </d-vm-context>
               )}
            </Panel>
         </RenderExample>
      );
   }
}

class ImageCustomize extends React.Component {
   state = {};
   imageData = 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22255%22%20height%3D%22180%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20255%20180%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_163d32075fc%20text%20%7B%20fill%3Argba(255%2C255%2C255%2C.75)%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A13pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_163d32075fc%22%3E%3Crect%20width%3D%22255%22%20height%3D%22180%22%20fill%3D%22%23777%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%2294.2578125%22%20y%3D%2296%22%3EImage%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E';

   render() {
      const componentTypes = Image.componentTypes;
      const handleSelected = state => this.setState(state);
      const select = value => ({});
      return (
         <RenderCustomize name="Image" componentTypes={componentTypes} select={select} onSelected={handleSelected}>
            <Image src={this.imageData} />
         </RenderCustomize>
      );
   }
}

export default withTheme(DisplayImage);
