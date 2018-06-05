import { Card as _Card, CardImage, CardHeader, CardBody, CardFooter } from './Card';
import { Cell as _Cell, CellHeader, CellBody } from './Cell';
import { Tab as _Tab, TabItem as _TabItem } from './Tab';
import { PlainText } from '../form/PlainText';

import { Card } from '../../structure/Card';
import { Cell } from '../../structure/Cell';
import { Collapsible } from '../../structure/Collapsible';
import { Field } from '../../structure/Field';
import { Modal } from '../../structure/Modal';
import { Tab, TabItem } from '../../structure/Tab';

import * as rs from 'reactstrap';

Collapsible.componentTypes.CollapsePanel = rs.Collapse;
Field.componentTypes.PlainTextContainer = PlainText;
Tab.componentTypes.TabContainer = _Tab;
TabItem.componentTypes.TabItemComponent = _TabItem;

Object.assign(Card.componentTypes, {
   Container: _Card,
   ImageContainer: CardImage,
   HeaderContainer: CardHeader,
   BodyContainer: CardBody,
   FooterContainer: CardFooter
});

Object.assign(Cell.componentTypes, {
   Container: _Cell,
   HeaderContainer: CellHeader,
   BodyContainer: CellBody
});

Object.assign(Modal.componentTypes, {
   Container: rs.Modal,
   HeaderContainer: rs.ModalHeader,
   BodyContainer: rs.ModalBody,
   FooterContainer: rs.ModalFooter
});

export { Card, CardHeader, CardBody, CardFooter, Cell, CellHeader, CellBody, Collapsible, Field, Modal, Tab, TabItem };
