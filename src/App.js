import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Start from './components/Start';
import Login from './components/Login';
import Reg from './components/Registration';
import Account from './components/UserAccount.js';
import Selection from './components/Selection';
import Result from './components/SelectionResult';
import Users from './components/Users';
import Products from './components/Products';
import Footer from './components/Footer';

class App extends Component {
    render() {
        return (
            <Router>
              <Switch> (JSK attribute) path: "/"
                <Route exact path="/" component={Start} />
                <Route path="/logowanie" component={Login} />
                <Route path="/rejestracja" component={Reg} />
                <Route path="/moje_konto" component={Account} />
                <Route exact path="/dobor_sprzetu" component={Selection} />
                <Route path="/dobor_sprzetu/nasze_propozycje" component={Result} />
                <Route path="/admin/uzytkownicy" component={Users} />
                <Route path="/admin/produkty" component={Products} />
              </Switch>
              <Footer />
            </Router>
        );
    }
}

export default App;

