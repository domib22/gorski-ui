import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Start from './components/Start';
import Login from './components/Login';
import Reg from './components/Registration';
import Account from './components/UserAccount.js';

class App extends Component {
    render() {
        return (
            <Router>
              <Switch> (JSK attribute) path: "/"
                <Route exact path="/" component={Start} />
                <Route path="/logowanie" component={Login} />
                <Route path="/rejestracja" component={Reg} />
                <Route path="/moje_konto" component={Account} />
              </Switch>
            </Router>
        );
    }
}

export default App;

