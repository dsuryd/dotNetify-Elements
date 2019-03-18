import { Modal } from '../../structure/Modal';
import styled from 'styled-components';
import rsModal from 'reactstrap/lib/Modal';
import rsModalBody from 'reactstrap/lib/ModalBody';
import rsModalFooter from 'reactstrap/lib/ModalFooter';
import rsModalHeader from 'reactstrap/lib/ModalHeader';
import lightTheme from './../../theme-light';

Object.assign(Modal.componentTypes, {
   Container: styled(rsModal)`${props => props.theme.Modal.Container}`,
   HeaderContainer: styled(rsModalHeader)`${props => props.theme.Modal.HeaderContainer}`,
   BodyContainer: styled(rsModalBody)`${props => props.theme.Modal.BodyContainer}`,
   FooterContainer: styled(rsModalFooter)`${props => props.theme.Modal.FooterContainer}`
});

Modal.componentTypes.Container.defaultProps = { theme: lightTheme };
Modal.componentTypes.HeaderContainer.defaultProps = { theme: lightTheme };
Modal.componentTypes.BodyContainer.defaultProps = { theme: lightTheme };
Modal.componentTypes.FooterContainer.defaultProps = { theme: lightTheme };

export default Modal;
export { Modal };
