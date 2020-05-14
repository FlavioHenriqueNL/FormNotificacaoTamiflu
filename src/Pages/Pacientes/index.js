import React from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import AddPaciente from './Components/AddPaciente'
import ListaPacientes from './Components/ListaPacientes';
import firebase from '../../Database/connection';

import './Components/index.css';

export default class Notificacoes extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      pacientes: [],
      nomeNotificador: ""

    }
    firebase.auth().onAuthStateChanged((logged) => {
      if(logged){
        firebase.firestore().collection("usuarios").doc(logged.uid).get().then(
          snap =>{
            if(snap.exists){
                let s = this.state;
                s.nomeNotificador = snap.data().Nome;
                s.categoriaProfissional = snap.data().CategoriaProfissional;
                this.setState(s);
            }else{
                console.log("Error.");
            }
          }
        )
      }
    });

    
  }
  signOut = () =>{
    
    firebase.auth().signOut().then(
      () => {
        this.setState({});
      }
    );
  }
  
  teste = () =>{
    firebase.firestore().collection("pacientes").where('nomeNotificador', '==', this.state.nomeNotificador).get().then(
      snap => {
        let s = this.state;
        s.pacientes = []
        snap.forEach(paciente =>{
          this.state.pacientes.push({
            id:paciente.id,
            nome: paciente.data().nome,
            dosagem: paciente.data().dosagem,
            nomeNotificador: paciente.data().nomeNotificador,
            dataNotificacao: paciente.data().dataNotificacao,
          });
        })
        this.setState(s);
      }
    );
  }
  teste2 = () =>{
    firebase.firestore().collection("pacientes").get().then(
      snap => {
        let s = this.state;
        s.pacientes = []
        snap.forEach(paciente =>{
          this.state.pacientes.push({
            id:paciente.id,
            nome: paciente.data().nome,
            dosagem: paciente.data().dosagem,
            nomeNotificador: paciente.data().nomeNotificador,
            dataNotificacao: paciente.data().dataNotificacao,
          });
        })
        this.setState(s);
      }
    );
  }

  render(){
    if(this.state.categoriaProfissional === "Administrador") this.teste2();
    else this.teste();

    return(
      <div>
      <Container className='topo'>
        <Row className="mt-3 mb-1 align-items-center">
          <Col className="titulo" xs={9}>
            <h4>Seja bem vindo!</h4>
            <h2>{this.state.nomeNotificador}</h2>
            <p>{this.state.categoriaProfissional}</p>
            
          </Col>
          <Col xs={3} className="text-right">
             <button className="btn btn-danger" onClick={this.signOut}>Sair do sistema</button>
          </Col>
        </Row>
        <Row className="mt-1 align-items-center">
          <Col xs={9}>
            
            <h1>Lista de pacientes cadastrados</h1>
          </Col>
          <Col xs={3} className="text-right">
             <AddPaciente className="atendimentoComponent"/>
             
          </Col>
        </Row>
      </Container>
      <Container>
        <Row>
          <ListaPacientes lista={this.state.pacientes} />
        </Row>
      </Container>
      </div>
    );
  }
}