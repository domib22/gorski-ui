import React, {Component} from 'react';
import { Alert } from 'reactstrap';
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react';

import AuthService from '../services/AuthService';
import NavBar from './NavBar';

const validateForm = (error) => {
  let validate = true;

  Object.values(error).forEach(
    (value) => value.length > 0 && (validate = false)
  );
  return validate;
}

class Registration extends Component {
    constructor(props) {
        super(props);
        this.state = {username: '', password: '', gender: 'MAN', valid: true, success: false,
                      error: {username: '', password: ''}, message: '', checked: true};
    }

    toggle = () => { this.setState({checked: !this.state.checked}); }

    handleChange = (event) => {
        const { name, value } = event.target;
        let error = this.state.error;

        switch (name) {
            case 'username':
                error.username = value.length < 4 ? 'Zbyt krótka nazwa użytkownika! (min. 4 znaki)' : '';
                break;
            case 'password':
                error.password = value.length < 6 ? 'Zbyt krótkie hasło! (min. 6 znaków)' : '';
                break;
            default:
                break;
        }

        this.setState( {error, [name]: value}, ()=> {console.log(error)} )
      }

    doRegister = (event) => {
        event.preventDefault();
        const validate = validateForm(this.state.error);
        this.setState( {valid: validate} );

        if (this.state.checked === true) { // agree the terms
            if (validate) {
              var mess = '';
              AuthService.register(this.state.username, this.state.password, this.state.gender)
               .then( response => {
                   mess = "Utworzono konto! Możesz się zalogować :)";
                   this.setState({
                       message: mess,
                       success: true
                   });
                   }, error => {
                       if (error.response.status === 422) {
                           mess = "Użytkownik z takim loginem już istnieje!";
                       } else if (error.response.status === 400) {
                           mess = "Brak wymaganych danych! Sprawdź czy wszystkie pola są wypełnione."
                       } else {
                           mess = "Niepoprawne dane :/";
                       }
                       console.log(error.toString());
                       this.setState({
                           success: false,
                           message: mess
                       });
                   }
               )
            }
        } else {    // not agree the terms
            console.log("Error: Non-acceptance of the regulations");
            this.setState({
                success: false,
                message: "Zaakceptuj regulamin!"
            });
        }

    };

    render() {
        const error = this.state.error;
        let alert = '';

        if(this.state.message) {
            if(this.state.success) {
                alert = (
                    <Alert color="success">
                      {this.state.message}
                    </Alert>
                );
            } else {
                alert = (
                    <Alert color="danger">
                      {this.state.message}
                    </Alert>
                );
            }
        }

        return (
            <div style={{background: '#fdfffd'}}>
              <NavBar/>
              <Grid container textAlign='center' style={{padding: '3em', minHeight: '100vh'}}>
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
                        {
                          error.username && (
                              <Alert color="danger">
                                  {error.username}
                              </Alert>
                          )
                        }
                        <Form.Input fluid icon='lock' iconPosition='left'
                          placeholder='Hasło'
                          type='password'
                          name='password'
                          onChange={this.handleChange}
                        />
                        {
                          error.password && (
                              <Alert color="danger">
                                  {error.password}
                              </Alert>
                          )
                        }
                       <div className="form-group">
                          <select name="gender" onChange={this.handleChange} className="form-control">
                              <option value="MAN">Mężczyzna</option>
                              <option value="WOMAN">Kobieta</option>
                          </select>
                       </div>
                       <Form.Checkbox required label='Akceptuję regulamin.' checked={this.state.checked} onClick={this.toggle} />

                        <Button color='teal' fluid size='large' type='submit' name='submit' onClick={this.doRegister}>
                          Zarejestruj się
                        </Button>
                        {
                          !this.state.valid ? (
                            <Alert key="valid" color="danger">
                              Coś poszło nie tak :/ Sprawdź wszystkie pola jeszcze raz!
                            </Alert>
                          ) : (alert)
                        }
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