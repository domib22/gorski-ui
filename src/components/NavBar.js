import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Image } from 'semantic-ui-react';
import { Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';

import logo from '../images/logo.png';
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
        const styleNav = {color: 'rgb(230, 230, 230)', textDecoration: 'none'};

        return (
            <Navbar color="dark" dark expand="md">
              <Image src={logo} size="tiny"/><NavbarBrand>Górski</NavbarBrand>
              <Nav className="mr-auto">
                <NavLink style={styleNav} href="/">Dobierz sprzęt </NavLink>
                {this.state.showAdmin && <NavLink style={styleNav} href="/admin/uzytkownicy">Użytkownicy</NavLink>}
                {this.state.showAdmin && <NavLink style={styleNav} href="/admin/produkty">Produkty</NavLink>}
              </Nav>
              <NavbarToggler onClick={this.toggle}/>
              <Collapse isOpen={this.state.isOpen} navbar>
                {
                  this.state.login ? (
                    <Nav className="ml-auto" navbar>
                      <NavItem>
                        <NavLink href="/moje_konto" style={styleNav}>{this.state.username}</NavLink>
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
            </Navbar>
            )
    }
}

export default withRouter(NavBar);