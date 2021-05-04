import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Alert, Button } from 'reactstrap';
import { Grid, Menu, Message, Header, Divider, Image, Form, Segment, Rating } from 'semantic-ui-react';

import Cos from "../images/cos.png";
import BackService from '../services/BackService';
import AuthService from '../services/AuthService';
import NavBar from './NavBar';

class UserAccount extends Component {

  constructor(props) {
    super(props);
    this.state = {activeBlock: 'profile', user: undefined, userReviews: []};
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();
    this.setState({user: user});

    this.fetchReviews();
  }

  handleClick = (e, { name }) => this.setState({ activeBlock: name })

  fetchReviews = () => {
    BackService.getUserReviews('Mike')
        .then( response => {
              this.setState({
                userReviews: response.data
              })
            }, error => {
              console.log(error);
            });
  }

  render() {
    let userInfo = "";
    let profileBlock = "";
    let editBlock = "";
    let opinionBlock = "";
    let passwordBlock = "";

    const user = this.state.user;
    const { activeBlock } = this.state;
    // login
    if (user && user.token) {

      userInfo = (
            <Menu vertical>
              <Menu.Item name='profile' active={activeBlock === 'profile'} color={'blue'}
                onClick={this.handleClick}>Twój profil</Menu.Item>
              <Menu.Item name='edit' active={activeBlock === 'edit'} color={'violet'}
                onClick={this.handleClick}>Edytuj swoje dane</Menu.Item>
              <Menu.Item name='password' active={activeBlock === 'password'} color={'pink'}
                onClick={this.handleClick}>Zmień hasło</Menu.Item>
              <Menu.Item name='opinion' active={activeBlock === 'opinion'} color={'green'}
                onClick={this.handleClick}>Twoje opinie</Menu.Item>
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
                {
                    this.state.userReviews.map(review =>(
                    <div key={review.id}>
                       <Rating maxRating={5} defaultRating={review.starsAmount} size={'large'} disabled />
                       <p>{review.opinion}</p>
                       <Divider />
                    </div>
                    ))
                }
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
      <div style={{background: '#fdfffd'}}>
        <NavBar/>
        <Grid container columns={2} stackable style={{ padding: '3em', minHeight:  '100vh'}}>
            <Grid.Column width={4}> {userInfo} </Grid.Column>
            {this.state.activeBlock === 'profile' && <Grid.Column width={12}>{profileBlock}</Grid.Column>}
            {this.state.activeBlock === 'edit' && <Grid.Column width={12}>{editBlock}</Grid.Column>}
            {this.state.activeBlock === 'password' && <Grid.Column width={12}>{passwordBlock}</Grid.Column>}
            {this.state.activeBlock === 'opinion' && <Grid.Column width={12}>{opinionBlock}</Grid.Column>}
        </Grid>
      </div>
    );
  }
}

export default UserAccount;