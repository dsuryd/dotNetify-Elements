import { Modal } from '../../structure/Modal';
import styled from 'styled-components';
import * as rs from 'reactstrap';

Object.assign(Modal.componentTypes, {
   Container: styled(rs.Modal)`${props => props.theme.Modal.Container}`,
   HeaderContainer: styled(rs.ModalHeader)`${props => props.theme.Modal.HeaderContainer}`,
   BodyContainer: styled(rs.ModalBody)`${props => props.theme.Modal.BodyContainer}`,
   FooterContainer: styled(rs.ModalFooter)`${props => props.theme.Modal.FooterContainer}`
});

export { Modal };
