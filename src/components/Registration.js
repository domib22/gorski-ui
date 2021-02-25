import React, {Component} from 'react';
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react';

import AuthService from '../services/AuthService';

class Registration extends Component {
    constructor(props) {
        super(props);
        this.state = {username: '', password: '', gender: 'MAN'};
    }

    handleChange = (event) => {
        this.setState({[event.target.name] : event.target.value});
    }

    doRegister = (event) => {
        event.preventDefault();
        return AuthService.register(this.state.username, this.state.password, this.state.gender);
    };

    render() {
        return (
          <div>
            <Grid textAlign='center' style={{ height: '80vh' }} verticalAlign='middle'>
                <Grid.Column style={{ maxWidth: 450 }}>
                  <Header as='h2' color='teal' textAlign='center'>
                    Rejestracja
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
                     <div className="form-group">
                        <select name="gender" onChange={this.handleChange} className="form-control">
                            <option value="MAN">Mężczyzna</option>
                            <option value="WOMAN">Kobieta</option>
                        </select>
                     </div>

                      <Button color='teal' fluid size='large' type='submit' name='submit' onClick={this.doRegister}>
                        Zarejestruj się
                      </Button>
                    </Segment>
                  </Form>
                  <Message>
                    Masz już konto? <a href='/logowanie'>Zaloguj się</a>
                  </Message>
                </Grid.Column>
            </Grid>
          </div>
        );
    }
}

export default Registration;