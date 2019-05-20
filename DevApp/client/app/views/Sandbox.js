import React from 'react';
import { Markdown, withTheme } from 'dotnetify-elements';
import Article from '../components/Article';

const Sandbox = _ => (
   <Article vm="Sandbox" id="Content">
      <Markdown id="Content">
         <BasicDemo />
      </Markdown>
   </Article>
);

const BasicDemo = () => (
   <d-main>
      <d-header>
         <div>Header</div>
      </d-header>
      <d-nav width="10px">
         <div>Nav</div>
      </d-nav>
      <d-section>
         <d-vm-context vm="HelloWorld">
            <d-element id="Greetings">
               <d-card test="test">
                  <h1 slot="value" />
               </d-card>
            </d-element>
         </d-vm-context>
      </d-section>
      <d-footer>
         <div>Footer</div>
      </d-footer>
   </d-main>
);

export default withTheme(Sandbox);
