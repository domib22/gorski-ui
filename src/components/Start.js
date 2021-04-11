import React, {Component} from 'react';
import { Icon, Button } from 'semantic-ui-react';
import { Jumbotron } from 'reactstrap';

import mount from '../images/mountains1.jpg';
import AuthService from '../services/AuthService';
import NavBar from './NavBar';
import Footer from './Footer';

class Start extends Component {

    constructor(props) {
        super(props);
        this.state = {user: undefined};
    }

    componentDidMount() {
        const user = AuthService.getCurrentUser();
        this.setState({user: user});
    }

    render() {
        const user = this.state.user;

        return (
            <div>
                <NavBar/>
                <div style={{minHeight: '100vh'}}>
                    <Jumbotron style={{width: '100%', margin: 0}}>
                      <h1 className="display-3">Dobierz sprzęt górski</h1>
                      <p className="lead">Nie masz pojęcia co powinieneś zabrać ze sobą w góry, a kolejne przeczytane fora i blogi tylko mieszają Ci w głowie?</p>
                      <hr className="my-2" />
                      <p>Nie martw się! Pomożemy dobrać niezbędną odzież oraz wyposażenie!</p>
                      <br/>
                      <p className="lead">
                          {
                              (user && user.token) ? (   // logged in
                              <a href='/dobor_sprzetu'>
                                <Button animated color="blue">
                                  <Button.Content visible> Rozpocznij </Button.Content>
                                  <Button.Content hidden>
                                      <Icon name='arrow right' />
                                  </Button.Content>
                                </Button>
                              </a>
                              ) : (   // not logged in
                              <a href='/logowanie'>
                                <Button animated color="blue">
                                  <Button.Content visible> Rozpocznij </Button.Content>
                                  <Button.Content hidden>
                                      <Icon name='arrow right' />
                                  </Button.Content>
                                </Button>
                              </a>
                              )
                          }
                      </p>
                    </Jumbotron>
                    <div>
                      <img src={mount} alt="Mountain landscape" width="100%"/>
                    </div>
                </div>
                <Footer/>
            </div>
        )
    }

}

export default Start;