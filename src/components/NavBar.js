import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavbarText, NavItem, NavLink } from 'reactstrap';

import AuthService from '../services/AuthService';

class NavBar extends Component {
    constructor(props) {
        super(props);
        this.state = {isOpen: false};
        this.toggle = this.toggle.bind(this);

        this.state = {
         showUser: false,
         showAdmin: false,
         username: undefined,
         login: false
    };
  }

  componentDidMount() {
      const user = AuthService.getCurrentUser();

      if (user) {
        const roles = [];
        user.authorities.forEach(authority => {
          roles.push(authority.authority)
        });

        this.setState({
          login: true,
          username: user.username,
          showUser: roles.includes("ROLE_USER"),
          showAdmin: roles.includes("ROLE_ADMIN")
        });
      }
    }

    toggle() {
        this.setState({
          isOpen: !this.state.isOpen
        });
    }

    doLogout = () => {
        AuthService.logout();
        this.props.history.push('/');
        window.location.reload();
      }

    render() {
        return <Navbar color="dark" dark expand="md">
              <NavbarBrand>Górski</NavbarBrand>
              <Nav className="mr-auto">
                {this.state.showUser && <NavLink href="/">Dobierz sprzęt</NavLink>}
                {this.state.showAdmin && <NavLink href="/admin/uzytkownicy">Użytkownicy</NavLink>}
                {this.state.showAdmin && <NavLink href="/admin/produkty">Produkty</NavLink>}
              </Nav>
              <NavbarToggler onClick={this.toggle}/>
              <Collapse isOpen={this.state.isOpen} navbar>
                {
                  this.state.login ? (
                    <Nav className="ml-auto" navbar>
                      <NavItem>
                          <NavbarText>
                            <a href="/moje_konto">{this.state.username}</a>
                          </NavbarText>
                      </NavItem>
                      <NavItem>
                        <NavLink href="#" onClick={this.doLogout}>Wyloguj się</NavLink>
                      </NavItem>
                    </Nav>
                  ) : (
                    <Nav className="ml-auto" navbar>
                      <NavItem>
                        <NavLink href="/logowanie">Logowanie</NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink href="/rejestracja">Rejestracja</NavLink>
                      </NavItem>
                    </Nav>
                  )
                }
              </Collapse>
            </Navbar>;
          }
}

export default withRouter(NavBar);