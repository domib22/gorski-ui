import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Start from './components/Start';
import Login from './components/Login';
import Reg from './components/Registration';
import Account from './components/UserAccount.js';
import Users from './components/Users';
import Products from './components/Products';
import NavBar from './components/NavBar';
import Footer from './components/Footer';

class App extends Component {
    render() {
        return (
            <Router>
              <NavBar />
              <Switch> (JSK attribute) path: "/"
                <Route exact path="/" component={Start} />
                <Route path="/logowanie" component={Login} />
                <Route path="/rejestracja" component={Reg} />
                <Route path="/moje_konto" component={Account} />
                <Route path="/admin/uzytkownicy" component={Users} />
                <Route path="/admin/produkty" component={Products} />
              </Switch>
              <Footer />
            </Router>
        );
    }
}

export default App;

