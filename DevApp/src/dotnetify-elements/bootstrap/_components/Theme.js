import lightTheme from '../../theme-light';
import darkTheme from '../../theme-dark';
import { Theme, withTheme } from '../../layout/Theme';

const window = window || global || {};
window.dotNetifyElements = { ...window.dotNetifyElements, lightTheme, darkTheme, withTheme };

export default Theme;
export { Theme, lightTheme, darkTheme, withTheme };
