import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Alert, Button, CardGroup, Card, CardText, CardBody, CardLink, CardTitle, CardSubtitle, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Grid, Menu, Message, Header, Divider, Image, Form, Segment, Rating } from 'semantic-ui-react';

import Cos from "../images/cos.png";
import BackService from '../services/BackService';
import AuthService from '../services/AuthService';
import NavBar from './NavBar';

class UserAccount extends Component {

  constructor(props) {
    super(props);
    this.state = {activeBlock: 'profile', user: undefined, userReviews: [], ownedProducts: [], reviews: [], modal: false, activeProduct: '', activeId: 0, opinion: '', stars: ''};
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();
    this.setState({user: user});

    this.fetchUserReviews(user.username);
    this.fetchOwnedProducts(user.username);
  }

  handleClick = (e, { name }) => this.setState({ activeBlock: name })

  handleClickOpinion = (e, { id, name }) => {
    this.setState({ activeProduct: name, activeId: id });
    this.fetchReviews(id);
    this.isModal();
  }

  handleRate = (event, {rating}) => {
    this.setState({stars: rating});
  };

  handleChange = (event) => {
    this.setState(
        {[event.target.name]: event.target.value}
    );
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const id = this.state.activeId;

    BackService.addReview(id, this.state.stars, this.state.opinion, this.state.user.username)
        .then(response => {this.fetchReviews(id);})
  }

  isModal = () => this.setState({ modal: !this.state.modal });

  fetchUserReviews = (username) => {
    BackService.getUserReviews(username)
        .then( response => {
              this.setState({
                userReviews: response.data
              })
            }, error => {
              console.log(error);
            });
  }

  fetchReviews = (id) => {
          BackService.getReviews(id)
              .then( response => {
                    this.setState({
                      reviews: response.data
                    })
                  }, error => {
                    console.log(error);
                  });
      }

  fetchOwnedProducts = (username) => {
      BackService.getOwnedProducts(username)
          .then( response => {
                this.setState({
                  ownedProducts: response.data
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
    let productsBlock = "";

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
              <Menu.Item name='products' active={activeBlock === 'products'} color={'orange'}
                onClick={this.handleClick}>Twój sprzęt</Menu.Item>
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
                    this.state.userReviews.map(review=>(
                        <div key={review.id}>
                            <Rating maxRating={5} defaultRating={review.starsAmount} size={'large'} disabled/>
                            <p>{review.opinion}</p>
                            <Divider/>
                        </div>
                    ))
                }
            </Message>
      );
      productsBlock = (
            <Message>
                <Header as='h1'>Twoje wyposażenie</Header>
                <Divider />
                <CardGroup>
                {
                    this.state.ownedProducts.map(product =>(
                        <div key={product.id} style={{marginBottom: 5}}>
                            <Card style={{width: "240px", height: "100%", position: "relative"}}>
                                <CardBody>
                                    <CardTitle tag="h6" style={{fontWeight: "bold"}}>{product.name}</CardTitle>
                                </CardBody>
                                <img style={{margin: "0 auto", marginBottom: 15}} src={process.env.PUBLIC_URL + `productsPicturesSmall/${product.pictureName}.jpg`} alt="Card cap" />
                                <CardLink href={product.link} target="_blank" style={{margin: "0 auto", paddingBottom: 10}}><Button color='success' >Zobacz w sklepie</Button></CardLink>
                                <Menu.Item id={product.id} name={product.name} onClick={this.handleClickOpinion} >
                                    <Button style={{padding: 15, width: "100%", background:"white", color:"black", fontWeight:"bold", borderRadius: 0, borderColor: "green"}}>
                                    Podziel się opinią
                                </Button></Menu.Item>
                            </Card>
                        </div> ))
                }
                </CardGroup>
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
            {this.state.activeBlock === 'products' && <Grid.Column width={12}>{productsBlock}</Grid.Column>}
            {this.state.activeBlock === 'opinion' && <Grid.Column width={12}>{opinionBlock}</Grid.Column>}
        </Grid>
        <Modal isOpen={this.state.modal} toggle={this.isModal} size="lg">
            <ModalHeader toggle={this.isModal} style={{background: "#088dcf", color: "#fff"}}>{this.state.activeProduct}</ModalHeader>
            <ModalBody>
                <h5>Opinie użytkowników:</h5>
                <Divider />
                {
                     this.state.reviews.map(review =>(
                     <div key={review.id}>
                        <Rating maxRating={5} defaultRating={review.starsAmount} size={'large'} disabled />
                        <p>{review.opinion}</p>
                        <p style={{color: 'green'}}>{review.userName}</p>
                        <Divider />
                     </div>
                     ))
                }
                {
                    this.state.user && (
                    <Form className='attached fluid segment' style={{background: "#fafafa"}}>
                        <Rating maxRating={5} onRate={this.handleRate} size={'large'} style={{paddingBottom: 20}} clearable/>
                        <Form.TextArea name="opinion" onChange={this.handleChange} placeholder='Twoja opinia...' type='text'/>
                        <Button onClick={this.handleSubmit} color="primary" style={{padding: "10px 20px 10px 20px"}}>Podziel się opinią o produkcie</Button>
                    </Form>)
                }
            </ModalBody>
            <ModalFooter>
                <Button color="secondary" onClick={this.isModal}>Wyjdź</Button>
            </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default UserAccount;