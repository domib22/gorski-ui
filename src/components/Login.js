import React, {Component} from 'react';
import { Alert } from 'reactstrap';
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react';

import AuthService from '../services/AuthService';
import NavBar from './NavBar';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {username: '', password: '', error: ''};
    }

    handleChange = (event) => {
        this.setState({[event.target.name] : event.target.value});
    }

    doLogin = async (event) => {
        event.preventDefault();

        AuthService.login(this.state.username, this.state.password)
            .then(
                () => {
                  this.props.history.push('/moje_konto');
                },
                error => {
                  this.setState({error: "Niepoprawne hasło lub nazwa użytkownika!"});
                }
            );
    }

    render() {
        return (
            <div style={{background: '#fdfdff'}}>
              <NavBar/>
              <Grid container textAlign='center' style={{padding: '3em', minHeight: '100vh'}}>
                  <Grid.Column style={{ maxWidth: 450 }}>
                    <Header as='h2' color='blue' textAlign='center'>
                      Logowanie
                    </Header>
                    <Form size='large'>
                      <Segment stacked>
                        <Form.Input fluid icon='user' iconPosition='left'
                          placeholder='Login'
                          type='text'
                          name='username'
                          onChange={this.handleChange}
                        />
                        <Form.Input fluid icon='lock' iconPosition='left'
                          placeholder='Hasło'
                          type='password'
                          name='password'
                          onChange={this.handleChange}
                        />

                        <Button color='blue' fluid size='large' type='submit' name='submit' onClick={this.doLogin}>
                          Zaloguj się
                        </Button>
                        {
                          this.state.error && (
                            <Alert color="danger">
                              {this.state.error}
                            </Alert>
                          )
                         }
                      </Segment>
                    </Form>
                    <Message>
                      Nie masz konta? <a href='/rejestracja'>Zarejestruj się</a>
                    </Message>
                  </Grid.Column>
              </Grid>
            </div>
        );
    }
}

export default Login;