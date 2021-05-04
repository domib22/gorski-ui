import React, {Component} from 'react';
import {TabContent, TabPane, Nav, NavItem, NavLink, Button, CardGroup, Card, CardText, CardBody, CardLink, CardTitle, CardSubtitle, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {Divider, Rating, Message, Form, Menu, Segment} from 'semantic-ui-react';
import classnames from 'classnames';
import '../styles/Selection.css';

import BackService from '../services/BackService';
import AuthService from '../services/AuthService';

class SelectionResult extends Component {
    constructor(props) {
        super(props);
        this.state = {user: undefined, products: [], reviews: [], activeTab: '1', activeProduct: "", activeId: 0, modal: false, opinion: '', stars: ''};
    }

    componentDidMount() {
        const user = AuthService.getCurrentUser();
        this.setState({user: user});

        const gender = this.props.gender;
        const season = this.props.season;
        const criteria = `productGender:${gender},season:${season}`;
        this.fetchResult(criteria);
    }

    handleChange = (event) => {
        this.setState(
            {[event.target.name]: event.target.value}
        );
    };

    handleRate = (event, {rating}) => {
        this.setState({stars: rating});
    };

    handleSubmit = (event) => {
        event.preventDefault();
        const id = this.state.activeId;

        BackService.addReview(id, this.state.stars, this.state.opinion, this.state.user.username)
            .then(response => {this.fetchReviews(id);})
    }

    toggle = (tab) => {
        if(this.state.activeTab !== tab) {
            this.setState({activeTab: tab})
        };
    }

    handleClick = (e, { id, name }) => {
        this.setState({ activeProduct: name, activeId: id });
        this.fetchReviews(id);
        this.isModal();
    }

    isModal = () => this.setState({ modal: !this.state.modal });

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

    fetchResult = (criteria) => {
        BackService.getProducts(criteria)
            .then( response => {
                this.setState({
                  products: response.data
                })
                }, error => {
                  console.log(error);
                });
    }

    render() {
        return (
            <div style={{padding: 30, minHeight: '100vh', background: '#efeaff'}}>
                <h2 style={{textAlign: "center"}}>Nasze propozycje</h2>
                <Divider/>

                <Nav tabs>
                    <NavItem>
                      <NavLink style={{color: "black"}}
                        className={classnames({ active: this.state.activeTab === '1' })}
                        onClick={() => { this.toggle('1'); }}
                      >
                        <h4>Kurtki</h4>
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink style={{color: "black"}}
                        className={classnames({ active: this.state.activeTab === '2' })}
                        onClick={() => { this.toggle('2'); }}
                      >
                        <h4>Spodnie</h4>
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink style={{color: "black"}}
                        className={classnames({ active: this.state.activeTab === '3' })}
                        onClick={() => { this.toggle('3'); }}
                      >
                        <h4>Polary i bluzy</h4>
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink style={{color: "black"}}
                        className={classnames({ active: this.state.activeTab === '4' })}
                        onClick={() => { this.toggle('4'); }}
                      >
                        <h4>Bielizna termoaktywna</h4>
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink style={{color: "black"}}
                        className={classnames({ active: this.state.activeTab === '5' })}
                        onClick={() => { this.toggle('5'); }}
                      >
                        <h4>Buty</h4>
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink style={{color: "black"}}
                        className={classnames({ active: this.state.activeTab === '6' })}
                        onClick={() => { this.toggle('6'); }}
                      >
                        <h4>Skarpety</h4>
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink style={{color: "black"}}
                        className={classnames({ active: this.state.activeTab === '7' })}
                        onClick={() => { this.toggle('7'); }}
                      >
                        <h4>Czapki</h4>
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink style={{color: "black"}}
                        className={classnames({ active: this.state.activeTab === '8' })}
                        onClick={() => { this.toggle('8'); }}
                      >
                        <h4>Plecaki</h4>
                      </NavLink>
                    </NavItem>
                    {
                        (this.props.season === 'SUMMER' && this.props.level === 'LOW') || (
                        <NavItem>
                          <NavLink style={{color: "black"}}
                            className={classnames({ active: this.state.activeTab === '9' })}
                            onClick={() => { this.toggle('9'); }}
                          >
                            <h4>Rękawiczki</h4>
                          </NavLink>
                        </NavItem> )
                    }
                    {
                        this.props.overnight !== 'NOTHING' && (
                        <NavItem>
                          <NavLink style={{color: "black"}}
                            className={classnames({ active: this.state.activeTab === '10' })}
                            onClick={() => { this.toggle('10'); }}
                          >
                            <h4>Śpiwory</h4>
                          </NavLink>
                        </NavItem> )
                    }
                    {
                        this.props.overnight === 'TENT' && (
                        <NavItem>
                          <NavLink style={{color: "black"}}
                            className={classnames({ active: this.state.activeTab === '11' })}
                            onClick={() => { this.toggle('11'); }}
                          >
                            <h4>Namioty</h4>
                          </NavLink>
                        </NavItem> )
                    }
                </Nav>

                <TabContent activeTab={this.state.activeTab}>
                    <TabPane tabId="1">
                        <CardGroup style={{marginBottom: 20}}>
                            {
                                this.state.products.filter(product0 => product0.category==='JACKETS').map(product =>(
                                    <div key={product.id}>
                                        <Card style={{maxWidth: "320px", height: "100%", position: "relative"}}>
                                            <CardBody>
                                                <CardTitle tag="h5" style={{fontWeight: "bold"}}>{product.name}</CardTitle>
                                                <CardSubtitle tag="h6" className="mb-2 text-muted">~{product.price}zł</CardSubtitle>
                                            </CardBody>
                                            <img style={{margin: "0 auto"}} src={process.env.PUBLIC_URL + `productsPictures/${product.pictureName}.jpg`} alt="Card cap" />
                                            <CardBody>
                                                <CardText style={{textOverflow: 'ellipsis',  overflow: 'hidden'}}>{product.description}</CardText>
                                            </CardBody>
                                            <CardLink href={product.link} target="_blank" style={{padding: "0 0 10px 15px"}}><Button color='success' >Zobacz w sklepie</Button></CardLink>
                                            <Menu.Item id={product.id} name={product.name} onClick={this.handleClick} >
                                                <Button style={{padding: 15, width: "100%", background:"white", borderRadius: 0, borderColor: "green"}}>
                                                <Rating maxRating={5} size={'large'} defaultRating={'4'} disabled/>
                                            </Button></Menu.Item>
                                        </Card>
                                    </div> ))
                            }
                        </CardGroup>
                    </TabPane>
                    <TabPane tabId="2">
                        <CardGroup>
                            {
                              this.state.products.filter(product0 => product0.category==='PANTS').map(product =>(
                                  <div key={product.id}>
                                      <Card style={{maxWidth: "320px", height: "100%", position: "relative"}}>
                                            <CardBody>
                                                <CardTitle tag="h5" style={{fontWeight: "bold"}}>{product.name}</CardTitle>
                                                <CardSubtitle tag="h6" className="mb-2 text-muted">~{product.price}zł</CardSubtitle>
                                            </CardBody>
                                            <img style={{margin: "0 auto"}} src={process.env.PUBLIC_URL + `productsPictures/${product.pictureName}.jpg`} alt="Card cap" />
                                            <CardBody>
                                                <CardText style={{textOverflow: 'ellipsis',  overflow: 'hidden'}}>{product.description}</CardText>
                                            </CardBody>
                                            <CardLink href={product.link} target="_blank" style={{padding: "0 0 10px 15px"}}><Button color='success' >Zobacz w sklepie</Button></CardLink>
                                            <Menu.Item id={product.id} name={product.name} onClick={this.handleClick} >
                                            <Button style={{padding: 15, width: "100%", background:"white", borderRadius: 0, borderColor: "green"}}>
                                                <Rating maxRating={5} size={'large'} defaultRating={'4'} disabled/>
                                            </Button></Menu.Item>
                                      </Card>
                                  </div> ))
                            }
                        </CardGroup>
                    </TabPane>
                    <TabPane tabId="3">
                        <CardGroup>
                            {
                                this.state.products.filter(product0 => product0.category==='FLEECES_SWEATSHIRTS').map(product =>(
                                <div key={product.id}>
                                    <Card style={{maxWidth: "320px", height: "100%", position: "relative"}}>
                                            <CardBody>
                                                <CardTitle tag="h5" style={{fontWeight: "bold"}}>{product.name}</CardTitle>
                                                <CardSubtitle tag="h6" className="mb-2 text-muted">~{product.price}zł</CardSubtitle>
                                            </CardBody>
                                            <img style={{margin: "0 auto"}} src={process.env.PUBLIC_URL + `productsPictures/${product.pictureName}.jpg`} alt="Card cap" />
                                            <CardBody>
                                                <CardText style={{textOverflow: 'ellipsis',  overflow: 'hidden'}}>{product.description}</CardText>
                                            </CardBody>
                                            <CardLink href={product.link} target="_blank" style={{padding: "0 0 10px 15px"}}><Button color='success' >Zobacz w sklepie</Button></CardLink>
                                            <Menu.Item id={product.id} name={product.name} onClick={this.handleClick} >
                                            <Button style={{padding: 15, width: "100%", background:"white", borderRadius: 0, borderColor: "green"}}>
                                                <Rating maxRating={5} size={'large'} defaultRating={'4'} disabled/>
                                            </Button></Menu.Item>
                                    </Card>
                                </div> ))
                            }
                        </CardGroup>
                    </TabPane>
                    <TabPane tabId="4">
                        <CardGroup>
                            {
                                this.state.products.filter(product0 => product0.category==='THERMOACTIVE_UNDERWEAR').map(product =>(
                                <div key={product.id}>
                                    <Card style={{maxWidth: "320px", height: "100%", position: "relative"}}>
                                            <CardBody>
                                                <CardTitle tag="h5" style={{fontWeight: "bold"}}>{product.name}</CardTitle>
                                                <CardSubtitle tag="h6" className="mb-2 text-muted">~{product.price}zł</CardSubtitle>
                                            </CardBody>
                                            <img style={{margin: "0 auto"}} src={process.env.PUBLIC_URL + `productsPictures/${product.pictureName}.jpg`} alt="Card cap" />
                                            <CardBody>
                                                <CardText style={{textOverflow: 'ellipsis',  overflow: 'hidden'}}>{product.description}</CardText>
                                            </CardBody>
                                            <CardLink href={product.link} target="_blank" style={{padding: "0 0 10px 15px"}}><Button color='success' >Zobacz w sklepie</Button></CardLink>
                                            <Menu.Item id={product.id} name={product.name} onClick={this.handleClick} >
                                            <Button style={{padding: 15, width: "100%", background:"white", borderRadius: 0, borderColor: "green"}}>
                                                <Rating maxRating={5} size={'large'} defaultRating={'4'} disabled/>
                                            </Button></Menu.Item>
                                    </Card>
                                </div> ))
                            }
                        </CardGroup>
                    </TabPane>
                    <TabPane tabId="5">
                        <CardGroup>
                            {
                                this.state.products.filter(product0 => product0.category==='SHOES').map(product =>(
                                <div key={product.id}>
                                    <Card style={{maxWidth: "320px", height: "100%", position: "relative"}}>
                                            <CardBody>
                                                <CardTitle tag="h5" style={{fontWeight: "bold"}}>{product.name}</CardTitle>
                                                <CardSubtitle tag="h6" className="mb-2 text-muted">~{product.price}zł</CardSubtitle>
                                            </CardBody>
                                            <img style={{margin: "0 auto"}} src={process.env.PUBLIC_URL + `productsPictures/${product.pictureName}.jpg`} alt="Card cap" />
                                            <CardBody>
                                                <CardText style={{textOverflow: 'ellipsis',  overflow: 'hidden'}}>{product.description}</CardText>
                                            </CardBody>
                                            <CardLink href={product.link} target="_blank" style={{padding: "0 0 10px 15px"}}><Button color='success' >Zobacz w sklepie</Button></CardLink>
                                            <Menu.Item id={product.id} name={product.name} onClick={this.handleClick} >
                                            <Button style={{padding: 15, width: "100%", background:"white", borderRadius: 0, borderColor: "green"}}>
                                                <Rating maxRating={5} size={'large'} defaultRating={'4'} disabled/>
                                            </Button></Menu.Item>
                                    </Card>
                                </div> ))
                            }
                        </CardGroup>
                    </TabPane>
                    <TabPane tabId="6">
                        <CardGroup>
                            {
                                this.state.products.filter(product0 => product0.category==='SOCKS').map(product =>(
                                <div key={product.id}>
                                    <Card style={{maxWidth: "320px", height: "100%", position: "relative"}}>
                                            <CardBody>
                                                <CardTitle tag="h5" style={{fontWeight: "bold"}}>{product.name}</CardTitle>
                                                <CardSubtitle tag="h6" className="mb-2 text-muted">~{product.price}zł</CardSubtitle>
                                            </CardBody>
                                            <img style={{margin: "0 auto"}} src={process.env.PUBLIC_URL + `productsPictures/${product.pictureName}.jpg`} alt="Card cap" />
                                            <CardBody>
                                                <CardText style={{textOverflow: 'ellipsis',  overflow: 'hidden'}}>{product.description}</CardText>
                                            </CardBody>
                                            <CardLink href={product.link} target="_blank" style={{padding: "0 0 10px 15px"}}><Button color='success' >Zobacz w sklepie</Button></CardLink>
                                            <Menu.Item id={product.id} name={product.name} onClick={this.handleClick} >
                                            <Button style={{padding: 15, width: "100%", background:"white", borderRadius: 0, borderColor: "green"}}>
                                                <Rating maxRating={5} size={'large'} defaultRating={'4'} disabled/>
                                            </Button></Menu.Item>
                                    </Card>
                                </div> ))
                            }
                        </CardGroup>
                    </TabPane>
                    <TabPane tabId="7">
                        <CardGroup>
                            {
                                this.state.products.filter(product0 => product0.category==='HATS').map(product =>(
                                <div key={product.id}>
                                    <Card style={{maxWidth: "320px", height: "100%", position: "relative"}}>
                                            <CardBody>
                                                <CardTitle tag="h5" style={{fontWeight: "bold"}}>{product.name}</CardTitle>
                                                <CardSubtitle tag="h6" className="mb-2 text-muted">~{product.price}zł</CardSubtitle>
                                            </CardBody>
                                            <img style={{margin: "0 auto"}} src={process.env.PUBLIC_URL + `productsPictures/${product.pictureName}.jpg`} alt="Card cap" />
                                            <CardBody>
                                                <CardText style={{textOverflow: 'ellipsis',  overflow: 'hidden'}}>{product.description}</CardText>
                                            </CardBody>
                                            <CardLink href={product.link} target="_blank" style={{padding: "0 0 10px 15px"}}><Button color='success' >Zobacz w sklepie</Button></CardLink>
                                            <Menu.Item id={product.id} name={product.name} onClick={this.handleClick} >
                                            <Button style={{padding: 15, width: "100%", background:"white", borderRadius: 0, borderColor: "green"}}>
                                                <Rating maxRating={5} size={'large'} defaultRating={'4'} disabled/>
                                            </Button></Menu.Item>
                                    </Card>
                                </div> ))
                            }
                        </CardGroup>
                    </TabPane>
                    <TabPane tabId="8">
                        <CardGroup>
                            {
                                this.state.products.filter(product0 => product0.category==='BACKPACKS').map(product =>(
                                <div key={product.id}>
                                    <Card style={{maxWidth: "320px", height: "100%", position: "relative"}}>
                                            <CardBody>
                                                <CardTitle tag="h5" style={{fontWeight: "bold"}}>{product.name}</CardTitle>
                                                <CardSubtitle tag="h6" className="mb-2 text-muted">~{product.price}zł</CardSubtitle>
                                            </CardBody>
                                            <img style={{margin: "0 auto"}} src={process.env.PUBLIC_URL + `productsPictures/${product.pictureName}.jpg`} alt="Card cap" />
                                            <CardBody>
                                                <CardText style={{textOverflow: 'ellipsis',  overflow: 'hidden'}}>{product.description}</CardText>
                                            </CardBody>
                                            <CardLink href={product.link} target="_blank" style={{padding: "0 0 10px 15px"}}><Button color='success' >Zobacz w sklepie</Button></CardLink>
                                            <Menu.Item id={product.id} name={product.name} onClick={this.handleClick} >
                                            <Button style={{padding: 15, width: "100%", background:"white", borderRadius: 0, borderColor: "green"}}>
                                                <Rating maxRating={5} size={'large'} defaultRating={'4'} disabled/>
                                            </Button></Menu.Item>
                                    </Card>
                                </div> ))
                            }
                        </CardGroup>
                    </TabPane>
                    <TabPane tabId="9">
                        <CardGroup>
                            {
                                this.state.products.filter(product0 => product0.category==='GLOVES').map(product =>(
                                <div key={product.id}>
                                    <Card style={{maxWidth: "320px", height: "100%", position: "relative"}}>
                                            <CardBody>
                                                <CardTitle tag="h5" style={{fontWeight: "bold"}}>{product.name}</CardTitle>
                                                <CardSubtitle tag="h6" className="mb-2 text-muted">~{product.price}zł</CardSubtitle>
                                            </CardBody>
                                            <img style={{margin: "0 auto"}} src={process.env.PUBLIC_URL + `productsPictures/${product.pictureName}.jpg`} alt="Card cap" />
                                            <CardBody>
                                                <CardText style={{textOverflow: 'ellipsis',  overflow: 'hidden'}}>{product.description}</CardText>
                                            </CardBody>
                                            <CardLink href={product.link} target="_blank" style={{padding: "0 0 10px 15px"}}><Button color='success' >Zobacz w sklepie</Button></CardLink>
                                            <Menu.Item id={product.id} name={product.name} onClick={this.handleClick} >
                                            <Button style={{padding: 15, width: "100%", background:"white", borderRadius: 0, borderColor: "green"}}>
                                                <Rating maxRating={5} size={'large'} defaultRating={'4'} disabled/>
                                            </Button></Menu.Item>
                                    </Card>
                                </div> ))
                            }
                        </CardGroup>
                    </TabPane>
                    <TabPane tabId="10">
                        <CardGroup>
                            {
                                this.state.products.filter(product0 => product0.category==='SLEEPING_BAGS').map(product =>(
                                <div key={product.id}>
                                    <Card style={{maxWidth: "320px", height: "100%", position: "relative"}}>
                                            <CardBody>
                                                <CardTitle tag="h5" style={{fontWeight: "bold"}}>{product.name}</CardTitle>
                                                <CardSubtitle tag="h6" className="mb-2 text-muted">~{product.price}zł</CardSubtitle>
                                            </CardBody>
                                            <img style={{margin: "0 auto"}} src={process.env.PUBLIC_URL + `productsPictures/${product.pictureName}.jpg`} alt="Card cap" />
                                            <CardBody>
                                                <CardText style={{textOverflow: 'ellipsis',  overflow: 'hidden'}}>{product.description}</CardText>
                                            </CardBody>
                                            <CardLink href={product.link} target="_blank" style={{padding: "0 0 10px 15px"}}><Button color='success' >Zobacz w sklepie</Button></CardLink>
                                            <Menu.Item id={product.id} name={product.name} onClick={this.handleClick} >
                                            <Button style={{padding: 15, width: "100%", background:"white", borderRadius: 0, borderColor: "green"}}>
                                                <Rating maxRating={5} size={'large'} defaultRating={'4'} disabled/>
                                            </Button></Menu.Item>
                                    </Card>
                                </div> ))
                            }
                        </CardGroup>
                    </TabPane>
                    <TabPane tabId="11">
                        <CardGroup>
                            {
                                this.state.products.filter(product0 => product0.category==='TENTS').map(product =>(
                                <div key={product.id}>
                                    <Card style={{maxWidth: "320px", height: "100%", position: "relative"}}>
                                            <CardBody>
                                                <CardTitle tag="h5" style={{fontWeight: "bold"}}>{product.name}</CardTitle>
                                                <CardSubtitle tag="h6" className="mb-2 text-muted">~{product.price}zł</CardSubtitle>
                                            </CardBody>
                                            <img style={{margin: "0 auto"}} src={process.env.PUBLIC_URL + `productsPictures/${product.pictureName}.jpg`} alt="Card cap" />
                                            <CardBody>
                                                <CardText style={{textOverflow: 'ellipsis',  overflow: 'hidden'}}>{product.description}</CardText>
                                            </CardBody>
                                            <CardLink href={product.link} target="_blank" style={{padding: "0 0 10px 15px"}}><Button color='success' >Zobacz w sklepie</Button></CardLink>
                                            <Menu.Item id={product.id} name={product.name} onClick={this.handleClick} >
                                            <Button style={{padding: 15, width: "100%", background:"white", borderRadius: 0, borderColor: "green"}}>
                                                <Rating maxRating={5} size={'large'} defaultRating={'4'} disabled/>
                                            </Button></Menu.Item>
                                    </Card>
                                </div> ))
                            }
                        </CardGroup>
                    </TabPane>
                </TabContent>

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

export default SelectionResult;