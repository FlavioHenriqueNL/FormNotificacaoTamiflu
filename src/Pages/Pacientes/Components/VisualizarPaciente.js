import React from 'react';
import {Modal, Button} from 'react-bootstrap';
import firebase from '../../../Database/connection';
import './adicionarPaciente.css';
import './print.css'
import logo from '../../Login/img/logo.svg';

export default class VisualizarPaciente extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      showModal: false,
      nome: '',
      sexo: '',
      endereco: '',
      dataNascimento:'',
      diagnostico: '',
      tempoGestacao:'',
      telefone: '',
      ubs:'',
      dosagem: '',
      outrosMedicamentos: [],
      reacoes: [],
      nomeNotificador: '',
      categoriaProfissional:'',
      dataNotificacao:'',
      hipertenso: false,
      diabetico: false,
      nefropata: false,
      hempatopatico: false,
      tabagista: false
    }

    

    
    this.mostrarModal = this.mostrarModal.bind(this);
    this.esconderModal = this.esconderModal.bind(this);
}



mostrarModal(){
    let s = this.state;
    s.showModal = true;
    this.setState(s);
    
}
esconderModal(){
    let s = this.state;
    s.showModal = false;
    this.setState(s);
}

  



render(){
    firebase.firestore().collection('pacientes').doc(this.props.parametro).get().then(
        snap =>{
          if(snap.exists){
              let s = this.state;
              s.nomeNotificador = snap.data().nomeNotificador;
              s.categoriaProfissional = snap.data().CategoriaProfissional;
              s.nome = snap.data().nome;
              s.sexo = snap.data().sexo;
              s.endereco = snap.data().endereco;
              s.dataNascimento = snap.data().dataNascimento;
              s.diagnostico = snap.data().diagnostico;
              s.tempoGestacao = snap.data().tempoGestacao;
              s.telefone = snap.data().telefone;
              s.ubs = snap.data().ubs;
              s.dosagem = snap.data().dosagem;
              s.outrosMedicamentos = snap.data().outrosMedicamentos;
              s.reacoes = snap.data().reacoes;
              s.hipertenso = snap.data().hipertenso;
              s.diabetico = snap.data().diabetico;
              s.nefropata = snap.data().nefropata;
              s.hempatopatico = snap.data().hempatopatico;
              s.tabagista = snap.data().tabagista;
              s.dataNotificacao = snap.data().dataNotificacao;  
              this.setState(s);
          }else{
              console.log("Error.");
          }
        }
    );
    return(
     <>
      <Button variant="warning" onClick={this.mostrarModal}>Visualizar</Button>

      <Modal show={this.state.showModal} onHide={this.esconderModal} id="ModalPaciente">
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body id="printable">
          <header>
              <div className="container">
                  <div className="row">
                      <div className="cabecalho">
                          <figure className="col-4">
                              <img className="img-fluid" src={logo} alt=""/>
                          </figure>
                          <div className="info col">
                              <h2>Prefeitura Municipal de Arapiraca</h2>
                              <h3>Secretaria Municipal de Saúde</h3> 
                          </div>
                      </div>
                  </div>
                  <h1>Formulário para notificação de reação adversa a oseltamivir (tamiflu)</h1>
              </div>
          </header>
          <form action="" id="form-print" >
            <div className="container">
                <fieldset id="dados-paciente">
                    <legend>Dados do paciente</legend>
                    <div className="form-row align-items-center justify-content-center">
                        <div className="form-group col">
                            <label htmlFor="nome">Nome</label>
                            <input type="text" className="form-control" id="nome" placeholder="Nome do Paciente" value={this.state.nome}/>
                        </div>
                        <div className="form-group col-auto">
                            <fieldset className="sexo">
                                <legend>Sexo</legend>
                                <input class='form-control' type="text" value={this.state.sexo}/>
                            </fieldset>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="endereco">Endereço</label>
                        <input type="text" className="form-control" name="" id="endereco" placeholder="Endereço" value={this.state.endereco}/>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-4">
                            <label htmlFor="nascimento">Nascimento</label>
                            <input type="text" className="form-control" name="" id="nascimento" placeholder="Data de Nascimento" value={this.state.dataNascimento}/>
                        </div>
                        <div className="form-group col-4">
                            <label htmlFor="telefone">Telefone</label>
                            <input type="text" className="form-control" name="" id="telefone" placeholder="Telefone: (xx)9xxxx-xxxx" value={this.state.telefone}/>
                        </div>
                        <div className="form-group col-4">
                            <label htmlFor="ubs">UBS de referência</label>
                            <input type="text" className="form-control" name="" id="UBS" placeholder="UBS de Referência" value={this.state.ubs}/>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-6">
                            <label htmlFor="gestacao">Em caso de gravidez, indicar o tempo de gestação</label>
                            <input type="text" className="form-control" name="" id="gestacao" placeholder="Tempo de gestação" value={this.state.tempoGestacao} />
                        </div>
                        <div className="form-group col-6">
                            <label htmlFor="diagnostico">Diagnóstico</label>
                            <input type="text" className="form-control disabled" name="" id="" placeholder="Diagnóstico Principal" value={this.state.diagnostico}/> 
                        </div>
                    </div>
                    
                </fieldset>
        
                <fieldset id="medicamentos">
                    <legend>Medicamentos</legend>                        
                      <label htmlFor="outraDosagem">Outras dosagens</label>
                      <input type="text" className="form-control" name="" id="outraDosagem" placeholder="... digite a dosagem." value={this.state.dosagem} />  
                    <div className="form-group" id="tabela-medicamentos">
                        <p><b>Cite o nome de outros medicamentos de que o paciente faz uso, prescritos ou não.</b> Incluir: Automedicação, fitoterápicos, chás e outros.</p>
                        <table className="table table-striped">
                            <thead>
                                <tr className="bg-info">
                                    <th>Nome comercial ou genérico</th>
                                    <th>Dose diária</th>
                                    <th>Via de administração</th>
                                    <th>Data início uso</th>
                                    <th>Data fim uso</th>
                                </tr>
                            </thead>
                            <tbody>
                              {
                                this.state.outrosMedicamentos.map((medicamento,index)=>
                                  <tr key={index}> 
                                    <td>{medicamento.nome}</td>
                                    <td>{medicamento.dose}</td>
                                    <td>{medicamento.via}</td> 
                                    <td>{medicamento.inicio}</td>
                                    <td>{medicamento.fim}</td>
                                  </tr>
                                )
                              }
                            </tbody>
                        </table>
                    </div>
                    <div className="form-group" id="tabela-reacao">
                      <p><b>Descrição da reação adversa.</b> Se o paciente ainda não se recuperou, ignore essa tabela.</p>
                      <table className="table table-striped">
                          <thead>
                              <tr className="bg-info">
                                  <th className="w-50">Reação</th>
                                  <th>Data de início da reação</th>
                                  <th>Data do fim da reação</th>
                              </tr>
                          </thead>
                          <tbody>
                              {
                              this.state.reacoes.map((reacao,index)=>
                                <tr key={index}> 
                                  <td>{reacao.nome}</td>
                                  <td>{reacao.inicio}</td>
                                  <td>{reacao.fim}</td>
                                </tr>
                              )
                            }
                          </tbody>
                      </table>
                    </div>
                </fieldset>
        
                <fieldset id="doencas-concomitantes">
                    <legend>Doenças Concomitantes</legend>
                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="hipertensao">Hipertensão Arterial</label>
                            <input type="checkbox" id="hipertensao" checked={this.state.hipertenso} value="Hipertensão Arterial"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="diabetes">Diabetes</label>
                            <input type="checkbox" id="diabetes" checked={this.state.diabetico} value="Diabetes"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="nefropatias">Nefropatias</label>
                            <input type="checkbox" id="nefropatias" checked={this.state.nefropata} value="Nefropatias" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="hepatopatias">Hepatopatias</label>
                            <input type="checkbox" id="hepatopatias" checked={this.state.hempatopatico} value="Hepatopatias" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="tabagista">Tabagista</label>
                            <input type="checkbox" id="tabagista" checked={this.state.tabagista} value="Tabagista"/>
                        </div>
                    </div>
                </fieldset>

                <fieldset>
                    <legend>Notificador</legend>
                    <div className="form-row">
                        <div className="form-group col">
                            <label htmlFor="notificador">Notificador</label>
                            <input className="form-control" type="text" id="notificador" value={this.state.nomeNotificador}/>
                        </div>
                        <div className="form-group col">
                            <label htmlFor="categoriaprofissional">Categoria Profissional</label>
                            <input className="form-control" type="text" id="notificador" value={this.state.categoriaProfissional}/>
                        </div>
                        <div className="form-group col">
                            <label htmlFor="datacriacao">Data</label>
                            <input className="form-control" type="text" id="notificador" value={this.state.dataNotificacao}/>
                        </div>
                    </div>
                </fieldset>



                <div className="button-group">
                    <Button className="btn btn-danger" onClick={this.esconderModal}><i className="fas fa-times-circle"></i> Fechar</Button>
                    <Button className="btn btn-success" onClick={(e) => {e.preventDefault(); window.print()}} type="submit"><i className="fas fa-save"></i> Imprimir</Button>
                </div>


            </div>
        </form>


        </Modal.Body>
      </Modal>
     </>
    );
  }
}

