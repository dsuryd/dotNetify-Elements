import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Main, Section } from 'dotnetify-elements/components/LayoutGrid';
import { Frame, Panel } from 'dotnetify-elements/components/Panel';
import { Form } from 'dotnetify-elements/components/Form';
import { Alert } from 'dotnetify-elements/components/Alert';
import { Button } from 'dotnetify-elements/components/Button';
import { TextField } from 'dotnetify-elements/components/TextField';
import { PasswordField } from 'dotnetify-elements/components/PasswordField';
import { VMContext } from 'dotnetify-elements/components';
import auth from './auth';

export const Logo = styled.div`
  display: flex;
  align-items: center;
  margin-left: 1rem;
  background-image: url(http://dotnetify.net/content/images/dotnetify-logo.png);
  background-size: 100% 100%;
  width: 200px;
  height: 39px;
`;

export class Login extends React.Component {
  static propTypes = {
    onAuthenticated: PropTypes.func
  };

  state = { error: null };

  handleLogin = ({ User, Password }) => {
    this.setState({ error: null });
    auth.signIn(User, Password).then(_ => this.props.onAuthenticated()).catch(error => {
      if (error.message == '400') this.setState({ error: "Invalid password (hint: it's 'dotnetify')" });
      else this.setState({ error: error.message });
    });
    return false;
  };

  render() {
    const { error } = this.state;
    return (
      <VMContext vm="Login">
        <Main>
          <Section>
            <Frame middle center>
              <Logo />
              <Form onSubmit={this.handleLogin}>
                <Panel>
                  <TextField id="User" horizontal />
                  <PasswordField id="Password" horizontal />
                  <Alert danger>{error}</Alert>
                  <Panel right>
                    <Button submit label="Login" />
                  </Panel>
                </Panel>
              </Form>
            </Frame>
          </Section>
        </Main>
      </VMContext>
    );
  }
}
