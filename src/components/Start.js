import React, {Component} from 'react';
import { Icon, Button } from 'semantic-ui-react';
import { Jumbotron } from 'reactstrap';

import NavBar from './NavBar';

class Start extends Component {

    componentDidMount() {
    }

    render() {
        return (
            <div>
              <NavBar/>
              <Jumbotron>
                <h1 className="display-3">Dobierz sprzęt górski</h1>
                <p className="lead">Nie masz pojęcia co powinieneś zabrać ze sobą w góry, a kolejne przeczytane fora i blogi tylko mieszają Ci w głowie?</p>
                <hr className="my-2" />
                <p>Nie martw się! Pomożemy dobrać niezbędną odzież i wyposażenie!</p>
                <br/>
                <p className="lead">
                  <Button animated color="blue">
                        <Button.Content visible>Rozpocznij</Button.Content>
                        <Button.Content hidden>
                          <Icon name='arrow right' />
                        </Button.Content>
                  </Button>
                </p>
              </Jumbotron>
            </div>
        )
    }

}

export default Start;