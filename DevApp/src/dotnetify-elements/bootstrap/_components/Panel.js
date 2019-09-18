import { Frame } from '../../layout/Frame';
import { Panel } from '../../layout/Panel';

const window = window || global || {};
window.dotNetifyElements = { ...window.dotNetifyElements, Frame, Panel };

export default Panel;
export { Frame, Panel };
