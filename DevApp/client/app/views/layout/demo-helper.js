import React from 'react';
import styled from 'styled-components';
import { defaultTheme } from 'dotnetify-elements';
import * as utils from 'dotnetify-elements/utils';

export const themeToggleEvent = utils.createEventEmitter();

export const demoTheme = {
   ...defaultTheme,
   Main: `border: 2px dashed tomato`,
   Header: `background: #666`,
   Nav: `background: #eee; width: 100px;`,
   Section: `background: #ddd`,
   Footer: `background: #fff`
};

export const DemoArea = styled.div`
   height: 480px;
   margin: 0 auto;
`;

export const DemoLabel = styled.div`
   display: flex;
   flex: ${utils.flexAuto};
   font-size: 2rem;
   font-weight: bold;
   align-items: center;
   justify-content: center;
   color: #bbb;
`;

export const Rectangle = styled.div`
   width: 20rem;
   height: 3rem;
   border: 1px solid #aaa;
   background: #ccc;
   display: flex;
`;

export const Square = styled.div`
   width: 6rem;
   height: 6rem;
   border: 1px solid #aaa;
   background: #ccc;
`;
