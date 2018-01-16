import React from 'react';
import styled from 'styled-components';
import { Navbar, NavbarToggler } from 'reactstrap';

export const NavToggle = props => (
    <Navbar light style={{paddingLeft: 0}}>
       <NavbarToggler />
    </Navbar>
);