import { Image } from '../../display/Image';

const window = window || global || {};
window.dotNetifyElements = { ...window.dotNetifyElements, Image };

export default Image;
export { Image };
