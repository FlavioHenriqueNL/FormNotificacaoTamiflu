import React from 'react';
import {withRouter} from 'react-router-dom';
import firebase from '../../Database/connection';
import './login.css';
import {Container, Row, Col, Form} from 'react-bootstrap';
import logo from './img/logo.svg';

class Login extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      email: "",
      senha: "",
      error: null
    }
  }

  componentDidMount(){
    firebase.auth().onAuthStateChanged((authenticated)=>{
     if(authenticated) return this.props.history.push('/');
    });
  }

  logar = e =>{
    e.preventDefault();
    const {email,senha} = this.state;
    firebase.auth().signInWithEmailAndPassword(email,senha)
      .then((user)=>{
        this.props.history.push('/');
      })
      .catch((error) => {
        alert(error);
      })
  }

  render(){
    return(
      <main id="login">
        <section>
          <Container className="py-5">
              <Row className="row justify-content-center align-items-center header">
                  
                <Col xs={6} md={4} className="">
                    <img className="img-fluid" src={logo} alt="Prefeitura Municipal de Arapiraca"/>
                </Col>
                <Col xs="auto" className="info text-center">
                    <h2>Prefeitura Municipal de Arapiraca</h2>
                    <h3>Secretaria Municipal de Saúde</h3>
                </Col>
                  
              </Row>
              <Row className="row justify-content-center">
                <Col xs={9}>
                  <Form onSubmit={this.logar}>
                    <Container>
                      <Form.Group>
                        <Form.Label htmlFor="entrando">Login</Form.Label>
                        <Form.Control id="entrando" type="email" placeholder="Email" onChange={ e => this.setState({email: e.target.value})} />
                      </Form.Group>
                      <Form.Group>
                        <Form.Label htmlFor="senha">Senha</Form.Label>
                        <Form.Control id="senha" type="password" placeholder="Password" onChange={ e => this.setState({senha: e.target.value})}/>
                      </Form.Group>
                
                      <input type="submit" value="Entrar"/>
                    </Container>
                  </Form>
                </Col>
              </Row>
          </Container>
        </section>
      </main>
    );
  }
}

export default withRouter(Login);