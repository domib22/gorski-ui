import React, {Component} from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Form, Segment } from 'semantic-ui-react';

class AddUser extends Component {
    constructor(props) {
        super(props);
        this.state = { modal: false, name: '', price: '0', productGender: 'UNISEX', season: 'YEAR_ROUND', category: 'JACKETS', pictureName: '', link: '' };
    }

    handleChange = (event) => {
        this.setState(
            {[event.target.name]: event.target.value}
        );
    };

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.addProduct(this.state.name, this.state.price, this.state.productGender, this.state.season, this.state.category, this.state.pictureName, this.state.link);
        this.toggle(this.state.toggle);
    }

    toggle = () => {this.setState({modal: !this.state.modal});}

    render() {
        return (
            <div>
                  <Button color="success" onClick={this.toggle}>Dodaj nowy produkt</Button>
                  <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Nowy produkt</ModalHeader>
                    <ModalBody>
                    <Form size='large'>
                        <Segment>
                          <Form.Input
                            placeholder='Nazwa'
                            type='text'
                            name='name'
                            onChange={this.handleChange}
                          />
                          <Form.Input
                            placeholder='Cena'
                            type='number'
                            name='price'
                            onChange={this.handleChange}
                          />
                          <div className="form-group">
                             <select name="productGender" onChange={this.handleChange} className="form-control">
                                 <option value="UNISEX">Uniwersalny</option>
                                 <option value="MALE">Męski</option>
                                 <option value="FEMALE">Damski</option>
                             </select>
                          </div>
                          <div className="form-group">
                             <select name="season" onChange={this.handleChange} className="form-control">
                                 <option value="YEAR_ROUND">Cały rok</option>
                                 <option value="WINTER">Zima</option>
                                 <option value="SUMMER">Lato</option>
                                 <option value="SPRING_AUTUMN">Wiosna-jesień</option>
                             </select>
                          </div>
                          <div className="form-group">
                             <select name="category" onChange={this.handleChange} className="form-control">
                                 <option value="JACKETS">Kurtki</option>
                                 <option value="PANTS">Spodnie</option>
                                 <option value="FLEECES_SWEATSHIRTS">Polary/bluzy</option>
                                 <option value="THERMOACTIVE_UNDERWEAR">Bielizna termoaktywna</option>
                                 <option value="SHOES">Buty</option>
                                 <option value="SOCKS">Skarpetki</option>
                                 <option value="GLOVES">Okulary</option>
                                 <option value="HATS">Czapki</option>
                                 <option value="GAITERS">Legginsy</option>
                                 <option value="BACKPACKS">Plecaki</option>
                             </select>
                          </div>
                          <Form.Input
                            placeholder='Plik'
                            type='text'
                            name='pictureName'
                            onChange={this.handleChange}
                          />
                          <Form.Input
                            placeholder='Link do produktu'
                            type='text'
                            name='link'
                            onChange={this.handleChange}
                          />
                        </Segment>
                     </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.handleSubmit}>Dodaj produkt</Button>{' '}
                        <Button color="secondary" onClick={this.toggle}>Anuluj</Button>
                     </ModalFooter>
                  </Modal>
            </div>
        )
    }

}

export default AddUser;