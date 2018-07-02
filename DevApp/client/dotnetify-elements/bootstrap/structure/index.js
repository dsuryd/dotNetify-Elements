import styled from 'styled-components';
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
Field.componentTypes.PlainTextComponent = PlainText;
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
   Container: styled(rs.Modal)`${props => props.theme.Modal.Container}`,
   HeaderContainer: styled(rs.ModalHeader)`${props => props.theme.Modal.HeaderContainer}`,
   BodyContainer: styled(rs.ModalBody)`${props => props.theme.Modal.BodyContainer}`,
   FooterContainer: styled(rs.ModalFooter)`${props => props.theme.Modal.FooterContainer}`
});

export { Card, CardHeader, CardBody, CardFooter, Cell, CellHeader, CellBody, Collapsible, Field, Modal, Tab, TabItem };
