import { Card, CardImage } from '../_components/Card';
import createWebComponent from '../../utils/web-component';

let cardComponent = createWebComponent(Card, 'd-card');
let cardImageComponent = createWebComponent(CardImage, 'd-card-image');

cardComponent.prototype._isContainer = true;
cardImageComponent.prototype._isContainer = true;

export default Card;
export { Card, CardImage };
