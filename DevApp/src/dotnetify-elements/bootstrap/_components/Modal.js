import { Modal } from '../../structure/Modal';
import styled from 'styled-components';
import rsModal from 'reactstrap/lib/Modal';
import rsModalBody from 'reactstrap/lib/ModalBody';
import rsModalFooter from 'reactstrap/lib/ModalFooter';
import rsModalHeader from 'reactstrap/lib/ModalHeader';
import * as utils from '../utils';

Object.assign(Modal.componentTypes, {
   Container: styled(rsModal)`${props => props.theme.Modal.Container}`,
   HeaderContainer: styled(rsModalHeader)`${props => props.theme.Modal.HeaderContainer}`,
   BodyContainer: styled(rsModalBody)`${props => props.theme.Modal.BodyContainer}`,
   FooterContainer: styled(rsModalFooter)`${props => props.theme.Modal.FooterContainer}`
});

Modal.componentTypes.Container.defaultProps = { theme: utils.getDefaultTheme() };
Modal.componentTypes.HeaderContainer.defaultProps = { theme: utils.getDefaultTheme() };
Modal.componentTypes.BodyContainer.defaultProps = { theme: utils.getDefaultTheme() };
Modal.componentTypes.FooterContainer.defaultProps = { theme: utils.getDefaultTheme() };

const window = window || global || {};
window.dotNetifyElements = { ...window.dotNetifyElements, Modal };

export default Modal;
export { Modal };
