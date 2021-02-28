import React, {Component} from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Form, Segment } from 'semantic-ui-react';

class AddUser extends Component {
    constructor(props) {
        super(props);
        this.state = {modal: false, username: '', password: '', userGender: 'MAN'};
    }

    handleChange = (event) => {
        this.setState(
            {[event.target.name]: event.target.value}
        );
    };

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.addUser(this.state.username, this.state.password, this.state.userGender);
        this.toggle(this.state.toggle);
    }

    toggle = () => {this.setState({modal: !this.state.modal});}

    render() {
        return (
            <div>
                  <Button color="success" onClick={this.toggle}>Dodaj nowego użytkownika</Button>
                  <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Nowy użytkownik</ModalHeader>
                    <ModalBody>
                    <Form size='large'>
                        <Segment>
                          <Form.Input icon='user' iconPosition='left'
                            placeholder='Login'
                            type='text'
                            name='username'
                            onChange={this.handleChange}
                          />
                          <Form.Input icon='lock' iconPosition='left'
                            placeholder='Hasło'
                            type='password'
                            name='password'
                            onChange={this.handleChange}
                          />
                         <div className="form-group">
                            <select name="userGender" onChange={this.handleChange} className="form-control">
                                <option value="MAN">Mężczyzna</option>
                                <option value="WOMAN">Kobieta</option>
                            </select>
                         </div>
                        </Segment>
                     </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.handleSubmit}>Dodaj użytkownika</Button>{' '}
                        <Button color="secondary" onClick={this.toggle}>Anuluj</Button>
                     </ModalFooter>
                  </Modal>
            </div>
        )
    }

}

export default AddUser;

