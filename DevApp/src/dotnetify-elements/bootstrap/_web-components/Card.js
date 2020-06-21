import { Card, CardImage } from "../_components/Card";
import createCardComponent, { createCardImageComponent } from "../../web-components/structure/CardComponent";

createCardComponent(Card, "d-card");
createCardImageComponent(CardImage, "d-card-image");

export default Card;
export { Card, CardImage };
