import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import Reg from './components/Registration';

class App extends Component {
    render() {
        return (
            <Router>
              <Switch> (JSK attribute) path: "/"
                <Route path="/logowanie" component={Login} />
                <Route path="/rejestracja" component={Reg} />
              </Switch>
            </Router>
        );
    }
}

export default App;

