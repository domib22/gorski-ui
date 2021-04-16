import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Alert, Button } from 'reactstrap';
import { Grid, Menu, Message, Header, Divider, Image, Form, Segment } from 'semantic-ui-react';

import Cos from "../images/cos.png";
import AuthService from '../services/AuthService';

class UserAccount extends Component {

  constructor(props) {
    super(props);
    this.state = {user: undefined, showProfile: true, showEdition: false, showOpinion: false, showPassword: false};
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();
    this.setState({user: user});
  }

  toggleProfile = () => {
    this.setState({showProfile: true, showEdition: false, showOpinion: false, showPassword: false});
  }
  toggleEdition = () => {
    this.setState({showProfile: false, showEdition: true, showOpinion: false, showPassword: false});
  }
  togglePassword = () => {
      this.setState({showProfile: false, showEdition: false, showOpinion: false, showPassword: true});
  }
  toggleOpinion = () => {
    this.setState({showProfile: false, showEdition: false, showOpinion: true, showPassword: false});
  }

  render() {
    let userInfo = "";
    let profileBlock = "";
    let editBlock = "";
    let opinionBlock = "";
    let passwordBlock = "";

    const user = this.state.user;

    // login
    if (user && user.token) {

      userInfo = (
            <Menu vertical>
              <Menu.Item onClick={this.toggleProfile}>Twój profil</Menu.Item>
              <Menu.Item onClick={this.toggleEdition}>Edytuj swoje dane</Menu.Item>
              <Menu.Item onClick={this.togglePassword}>Zmień hasło</Menu.Item>
              <Menu.Item onClick={this.toggleOpinion}>Twoje opinie</Menu.Item>
            </Menu>
      );
      profileBlock = (
            <Message>
                <Header as='h1'>Witaj {user.username}</Header>
                <Divider />
                <Image src={Cos} avatar size="tiny"/><br/>
                <Button color="link">Zmień zdjęcie</Button>
            </Message>
      );
      editBlock = (
            <Message>
                <Header as='h1'>Edycja danych</Header>
                <Divider />
                <Form size='large'>
                   <Segment style={{maxWidth: 300, marginBottom: 10}}>
                        <div className="form-group">
                            <select name="gender" className="form-control">
                                <option value="MAN">Mężczyzna</option>
                                <option value="WOMAN">Kobieta</option>
                            </select>
                        </div>
                     <Button color="primary">Zapisz dane</Button>
                   </Segment>
                </Form>
            </Message>
      );
      passwordBlock = (
            <Message>
                <Header as='h1'>Zmiana hasła</Header>
                <Divider />
                <Form size='large'>
                   <Segment style={{maxWidth: 300, marginBottom: 10}}>
                     <Form.Input icon='lock' iconPosition='left'
                       placeholder='Obecne hasło'
                       type='password'
                       name='password'
                     />
                     <Form.Input icon='lock' iconPosition='left'
                       placeholder='Nowe hasło'
                       type='password'
                       name='password'
                     />
                     <Button color="primary">Zmień hasło</Button>
                   </Segment>
                </Form>
            </Message>
      );
      opinionBlock = (
            <Message>
                <Header as='h1'>Twoje opinie</Header>
                <Divider />
            </Message>
      );
    } else { // not logged in
      userInfo = <div style={{marginTop:"20px"}}>
                    <Alert color="primary">
                      <h2>Nie jesteś zalogowanym użytkownikiem</h2>
                      <Link to="/logowanie"><Button color="success"><span style={{color:"white"}}>Logowanie</span></Button></Link>
                    </Alert>
                  </div>
    }

    return (
      <div>
        <Grid container columns={2} stackable style={{ padding: '3em', minHeight:  '100vh'}}>
            <Grid.Column width={4}> {userInfo} </Grid.Column>
            {this.state.showProfile && <Grid.Column width={12}>{profileBlock}</Grid.Column>}
            {this.state.showEdition && <Grid.Column width={12}>{editBlock}</Grid.Column>}
            {this.state.showPassword && <Grid.Column width={12}>{passwordBlock}</Grid.Column>}
            {this.state.showOpinion && <Grid.Column width={12}>{opinionBlock}</Grid.Column>}
        </Grid>
      </div>
    );
  }
}

export default UserAccount;