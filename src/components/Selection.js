import React, {Component} from 'react';
import { Form, Segment, Grid, Button } from 'semantic-ui-react';
import '../styles/Selection.css';

import AuthService from '../services/AuthService';
import NavBar from './NavBar';
import Result from './SelectionResult';

class Selection extends Component {
    constructor(props) {
        super(props);
        this.state = {user: undefined, result: false, gender: 'MALE', season: 'WINTER', length: 'ONE', overnight: 'NOTHING', level: 'LOW', costOption: false};
    }

    componentDidMount() {
        const user = AuthService.getCurrentUser();
        this.setState({user: user});
    }

    handleChange = (event) => {
        this.setState(
            {[event.target.name]: event.target.value}
        );
    };

    toggleCost = () => {
        this.setState({costOption: !this.state.costOption});
    }

    toggleResult = () => {
        this.setState({result: true});
    }

    render() {
        const user = this.state.user;
        var stylePadding = {paddingLeft: 80, paddingRight: 80, textAlign: 'left'};

        return (
          <div className="box">
            <NavBar/>
            {
                this.state.result
                  ? ( <Result gender={this.state.gender} season={this.state.season} length={this.state.length}
                       overnight={this.state.overnight} level={this.state.level} costOption={this.state.costOption} /> )
                  : (
                    <Grid container textAlign='center' style={{padding: 30, minHeight: '100vh'}}>
                    <Grid.Column style={{maxWidth: 600}}>
                        <Form id="selection">
                        <h4 style={{padding: '1.5em'}}>Jak będzie wyglądać Twoja wyprawa?</h4>
                            <Segment size='big' vertical >
                                <Form.Field style={stylePadding}>
                                    <label>Twoja płeć</label>
                                    <select name="gender" onChange={this.handleChange} className="form-control">
                                        <option value="MALE">Mężczyzna</option>
                                        <option value="FEMALE">Kobieta</option>
                                    </select>
                                </Form.Field>
                            </Segment>
                            <Segment size='big' vertical >
                                <Form.Field style={stylePadding}>
                                    <label>Warunki pogodowe</label>
                                    <select name="season" onChange={this.handleChange} className="form-control">
                                        <option value="WINTER">Zimowe</option>
                                        <option value="SUMMER">Letnie</option>
                                        <option value="SPRING_AUTUMN">Wiosenno/Jesienne</option>
                                    </select>
                                 </Form.Field>
                                 </Segment>
                                 <Segment size='big' vertical >
                                 <Form.Field style={stylePadding}>
                                    <label>Długość wycieczki</label>
                                    <select name="length" onChange={this.handleChange} className="form-control">
                                        <option value="ONE">Jednodniowa</option>
                                        <option value="MORE">Kilkudniowa</option>
                                    </select>
                                 </Form.Field>
                                 </Segment>
                                 {
                                    (this.state.length === 'MORE') && (
                                    <Segment size='big' vertical >
                                    <Form.Field style={stylePadding}>
                                       <label data-title="Pamiętaj: Jeśli nocujesz w schronisku pewnie będzie możliwość dokupienia pościeli.&nbsp;"> ? | Planowany rodzaj noclegu</label>
                                       <select name="overnight" onChange={this.handleChange} className="form-control">
                                           <option value="NOTHING">w budynku (z zapewnioną pościelą)</option>
                                           <option value="SLEEPING_BAG">w budynku (bez pościeli)</option>
                                           {
                                            this.state.season !== 'WINTER' && (
                                            <option value="TENT">w namiocie</option>
                                            )
                                           }
                                       </select>
                                    </Form.Field>
                                    </Segment>
                                    )
                                 }
                                 <Segment size='big' vertical >
                                 <Form.Field style={stylePadding}>
                                    <label>W jakie góry wyruszasz?</label>
                                    <select name="level" onChange={this.handleChange} className="form-control">
                                        <option value="LOW">Niskie (jak Beskidy czy Bieszczady)</option>
                                        <option value="HIGH">Wysokie (Tatry Wysokie)</option>
                                    </select>
                                 </Form.Field>
                                 <Form.Checkbox label='Pokaż TYLKO najniższe ceny' checked={this.state.costOption} onClick={this.toggleCost} />
                            </Segment>
                        </Form>
                        <Button fluid positive style={{padding: 15, fontSize: '1.4em'}} onClick={this.toggleResult}>Zobacz nasze propozycje!</Button>
                    </Grid.Column>
                    </Grid> )
            }
          </div>
        )
    }
}

export default Selection;
