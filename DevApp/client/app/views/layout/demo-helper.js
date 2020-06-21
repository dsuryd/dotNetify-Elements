import styled from "styled-components";
import { Theme } from "dotnetify-elements";
import * as utils from "dotnetify-elements/utils";

export const themeToggleEvent = utils.createEventEmitter();

export const demoTheme = {
  ...Theme.currentTheme,
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
  display: flex;
  align-items: center;
  justify-content: center;
  width: 200px;
  height: 50px;
  color: white;
  font-size: x-large;
  background: #999;
`;

export const Square = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  color: white;
  font-size: x-large;
  background: #999;
`;
