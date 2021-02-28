import React, {Component} from 'react';
import { Icon } from 'semantic-ui-react';
import { Jumbotron, Button } from 'reactstrap';

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
                <p className="lead">
                  <Button color="primary">Rozpocznij <Icon name='right arrow' /></Button>
                </p>
              </Jumbotron>
            </div>
        )
    }

}

export default Start;