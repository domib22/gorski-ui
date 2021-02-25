import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Container } from 'reactstrap';
import { Alert } from "react-bootstrap";

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
                  <Alert variant="info">
                    <h2>Witaj {user.username}!</h2>
                  </Alert>
                </div>
              );
    } else { // not login
      userInfo = <div style={{marginTop:"20px"}}>
                    <Alert variant="primary">
                      <h2>Profile Component</h2>
                      <Button color="success"><Link to="/logowanie"><span style={{color:"white"}}>Logowanie</span></Link></Button>
                    </Alert>
                  </div>
    }

    return (
      <div>
        <Container fluid>
        {userInfo}
        </Container>
      </div>
    );
  }
}

export default UserAccount;