import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Alert } from 'reactstrap';

import NavBar from './NavBar';
import AuthService from '../services/AuthService';

class UserAccount extends Component {

  constructor(props) {
    super(props);
    this.state = {user: undefined};
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();
    this.setState({user: user});
  }

  render() {
    let userInfo = "";
    const user = this.state.user;

    // login
    if (user && user.token) {

      let roles = "";

      user.authorities.forEach(authority => {
        roles = roles + " " + authority.authority
      });

      userInfo = (
                <div style={{marginTop:"20px"}}>
                  <Alert color="info">
                    <h2>Witaj {user.username}!</h2>
                  </Alert>
                </div>
              );
    } else { // not logged in
      userInfo = <div style={{marginTop:"20px"}}>
                    <Alert color="primary">
                      <h2>Nie jesteś zalogowanym użytkownikiem</h2>
                      <Link to="/logowanie"><Button color="success"><span style={{color:"white"}}>Logowanie</span></Button></Link>
                    </Alert>
                  </div>
    }

    return (
      <div>
        <NavBar/>
        <Container fluid>
        {userInfo}
        </Container>
      </div>
    );
  }
}

export default UserAccount;