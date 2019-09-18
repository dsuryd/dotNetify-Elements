import { Collapsible } from '../../structure/Collapsible';
import Collapse from 'reactstrap/lib/Collapse';

Collapsible.componentTypes.CollapsePanel = Collapse;

const window = window || global || {};
window.dotNetifyElements = { ...window.dotNetifyElements, Collapsible };

export default Collapsible;
export { Collapsible };
