import React from 'react';
import {Modal, Button} from 'react-bootstrap';
import firebase from '../../../Database/connection';
import './adicionarPaciente.css';
import logo from '../../Login/img/logo.svg';
import moment from 'moment';


export default class AddPaciente extends React.Component{

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
      hipertenso: false,
      diabetico: false,
      nefropata: false,
      hematopatico: false,
      tabagista: false,
      nomeNotificador: '',
      categoriaProfissional:''
    }

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

    this.mostrarModal = this.mostrarModal.bind(this);
    this.esconderModal = this.esconderModal.bind(this);
    this.addMedicamento = this.addMedicamento.bind(this);
    this.removeMedicamento = this.removeMedicamento.bind(this);
    this.salvar = this.salvar.bind(this);
  }
  salvar(e){
    e.preventDefault();
    firebase.firestore().collection('pacientes').doc(this.props.parametro).update(
      {
        nome: this.state.nome,
        sexo: this.state.sexo,
        endereco: this.state.endereco,
        dataNascimento: this.state.dataNascimento,
        diagnostico: this.state.diagnostico,
        tempoGestacao: this.state.tempoGestacao,
        telefone: this.state.telefone,
        ubs: this.state.ubs,
        dosagem: this.state.dosagem,
        outrosMedicamentos: this.state.outrosMedicamentos,
        reacoes: this.state.reacoes,
        hipertenso: this.state.hipertenso,
        diabetico: this.state.diabetico,
        nefropata: this.state.nefropata,
        hempatopatico: this.state.hempatopatico,
        tabagista: this.state.tabagista,
        uidNotificador: firebase.auth().currentUser.uid,
        nomeNotificador: this.state.nomeNotificador,
        CategoriaProfissional: this.state.categoriaProfissional,
      }
    ).then(()=>{
        alert("Informações atualizadas com sucesso!");
        this.esconderModal();
    });
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

  addMedicamento(e){
    e.preventDefault();
    this.setState({outrosMedicamentos:[...this.state.outrosMedicamentos, {}]});
    console.log(this.state.outrosMedicamentos);
  }
  handleMedicamentos(e,index,id){
    let s = this.state;
    s.outrosMedicamentos[index][id] = e.target.value;
    this.setState(s);
  }
  removeMedicamento(e, index){
    e.preventDefault();
    let s = this.state;
    let array = s.outrosMedicamentos;
    array.splice(index,1);
    s.outrosMedicamentos = array;
    this.setState(s);    
  }
  addReacao(e){
    e.preventDefault();
    this.setState({reacoes:[...this.state.reacoes, {}]});
    console.log(this.state.reacoes);
  }
  handleReacoes(e,index,id){
    let s = this.state;
    s.reacoes[index][id] = e.target.value;
    this.setState(s);
  }
  removeReacao(e, index){
    e.preventDefault();
    let s = this.state;
    let array = s.reacoes;
    array.splice(index,1);
    s.reacoes = array;
    this.setState(s);    
  }
  


  render(){
    return(
     <>
      <Button variant="primary" onClick={this.mostrarModal}>Editar</Button>

      <Modal show={this.state.showModal} onHide={this.esconderModal} id="ModalPaciente">
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
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
          <form action="" id="form-print">
            <div className="container">
                <fieldset id="dados-paciente">
                    <legend>Dados do paciente</legend>
                    <div className="form-row align-items-center justify-content-center">
                        <div className="form-group col">
                            <label htmlFor="nome">Nome</label>
                            <input type="text" className="form-control" id="nome" placeholder="Nome do Paciente" defaultValue={this.state.nome} onChange={e =>this.setState({nome: e.target.value})}/>
                        </div>
                        <div className="form-group col-auto">
                            <fieldset className="sexo">
                                <legend>Sexo</legend>
                                <label htmlFor="masc">Masculino</label>
                                <input type="radio" name="sexo" id="masc" defaultChecked={this.state.sexo === 'Masculino'} onChange={e => this.setState({sexo: 'Masculino'})}/>
                                <label htmlFor="fem">Feminino</label>
                                <input type="radio" name="sexo" id="fem" defaultChecked={this.state.sexo === 'Feminino'} onChange={e => this.setState({sexo: 'Feminino'})}/>
                            </fieldset>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="endereco">Endereço</label>
                        <input type="text" className="form-control" name="" id="endereco" placeholder="Endereço" defaultValue={this.state.endereco} onChange={e =>this.setState({endereco: e.target.value})}/>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-4">
                            <label htmlFor="nascimento">Nascimento</label>
                            <input type="date" className="form-control" name="" id="nascimento" placeholder="Data de Nascimento" defaultValue={this.state.dataNascimento} onChange={e =>this.setState({dataNascimento: e.target.value})}/>
                        </div>
                        <div className="form-group col-4">
                            <label htmlFor="telefone">Telefone</label>
                            <input type="text" className="form-control" name="" id="telefone" placeholder="Telefone: (xx)9xxxx-xxxx" defaultValue={this.state.telefone} onChange={e =>this.setState({telefone: e.target.value})}/>
                        </div>
                        <div className="form-group col-4">
                            <label htmlFor="ubs">UBS de referência</label>
                            <input type="text" className="form-control" name="" id="UBS" placeholder="UBS de Referência" defaultValue={this.state.ubs} onChange={e =>this.setState({ubs: e.target.value})}/>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-6">
                            <label htmlFor="gestacao">Em caso de gravidez, indicar o tempo de gestação</label>
                            <input type="text" className="form-control" name="" id="gestacao" placeholder="Tempo de gestação" defaultValue={this.state.tempoGestacao} onChange={e =>this.setState({tempoGestacao: e.target.value})}disabled={this.state.sexo === "Masculino" ? true:false}/>
                        </div>
                        <div className="form-group col-6">
                            <label htmlFor="diagnostico">Diagnóstico</label>
                            <input type="text" className="form-control disabled" name="" id="" placeholder="Diagnóstico Principal" defaultValue={this.state.diagnostico} onChange={e =>this.setState({diagnostico: e.target.value})}/> 
                        </div>
                    </div>
                    
                </fieldset>
        
                <fieldset id="medicamentos">
                    <legend>Medicamentos</legend>
                    <div className="form-row">
                        <div className="form-group col-6">
                            <label htmlFor="dosagens">Dosagens</label>
                            <select className="form-control" defaultValue={this.state.dosagem} onChange={e => e.target.value !== "none" ? this.setState({dosagem: e.target.value, dosagemOption:true}):this.setState({dosagemOption:false})} disabled={this.state.dosagemInput}>
                                <option value="none" defaultValue>Selecione uma dosagem ou  ...</option>
                                <option value="Oseltamivir 75mg / 1 cápsula de 12 em 12 horas por 5 dias">Oseltamivir 75mg / 1 cápsula de 12 em 12 horas por 5 dias</option>
                                <option value="Oseltamivir 45mg / 1 cápsula de 12 em 12 horas por 5 dias">Oseltamivir 45mg / 1 cápsula de 12 em 12 horas por 5 dias</option>
                                <option value="Oseltamivir 30mg / 1 cápsula de 12 em 12 horas por 5 dias">Oseltamivir 30mg / 1 cápsula de 12 em 12 horas por 5 dias</option>
                            </select>
                        </div>
                        <div className="form-group col-6">
                            <label htmlFor="outraDosagem">Outras dosagens</label>
                            <input type="text" className="form-control" name="" id="outraDosagem" placeholder="... digite a dosagem." defaultValue={this.state.dosagem} onChange={e =>(e.target.value !== "") ? this.setState({dosagem: e.target.value, dosagemInput: true}) : this.setState({ dosagemInput:false})} disabled={this.state.dosagemOption} />
                        </div>
                    </div>
                    
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
                                    <th>Excluir</th>
                                </tr>
                            </thead>
                            <tbody>
                              {
                                this.state.outrosMedicamentos.map((medicamento,index)=>
                                  <tr key={index}> 
                                    <td><input type="text" id="nome" onChange={e => this.handleMedicamentos(e,index,e.target.id)} value={medicamento.nome}/></td>
                                    <td><input type="text" id="dose" onChange={e => this.handleMedicamentos(e,index,e.target.id)} value={medicamento.dose}/></td>
                                    <td><input type="text" id="via" onChange={e => this.handleMedicamentos(e,index,e.target.id)} value={medicamento.via}/></td> 
                                    <td><input type="text" id="inicio" onChange={e => this.handleMedicamentos(e,index,e.target.id)} value={medicamento.inicio}/></td>
                                    <td><input type="text" id="fim" onChange={e => this.handleMedicamentos(e,index,e.target.id)}  value={medicamento.fim}/></td>
                                    <td><button className="btn btn-danger" onClick={(e)=>this.removeMedicamento(e,index)}>Excluir</button></td> 
                                  </tr>
                                )
                              }
                            </tbody>
                        </table>
                        <button className="btn btn-primary" onClick={(e)=>this.addMedicamento(e)}><i className="fas fa-plus-circle"></i> Adicionar Medicamento</button>
                    </div>
                    <div className="form-group" id="tabela-reacao">
                        <p><b>Descrição da reação adversa.</b> Se o paciente ainda não se recuperou, ignore essa tabela.</p>
                        <table className="table table-striped">
                            <thead>
                                <tr className="bg-info">
                                    <th className="w-50">Reação</th>
                                    <th>Data de início da reação</th>
                                    <th>Data do fim da reação</th>
                                    <th>Excluir</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                this.state.reacoes.map((reacao,index)=>
                                  <tr key={index}> 
                                    <td><input type="text" id="nome" onChange={e => this.handleReacoes(e,index,e.target.id)} value={reacao.nome}/></td>
                                    <td><input type="text" id="inicio" onChange={e => this.handleReacoes(e,index,e.target.id)} value={reacao.inicio}/></td>
                                    <td><input type="text" id="fim" onChange={e => this.handleReacoes(e,index,e.target.id)} value={reacao.fim}/></td> 
                                    <td><button className="btn btn-danger" onClick={(e)=>this.removeReacao(e,index)}>Excluir</button></td> 
                                  </tr>
                                )
                              }
                            </tbody>
                        </table>
                        <button className="btn btn-primary" onClick={(e)=>this.addReacao(e)}><i className="fas fa-plus-circle"></i> Adicionar Reação</button>
                    </div>
                </fieldset>
        
                <fieldset id="doencas-concomitantes">
                    <legend>Doenças Concomitantes</legend>
                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="hipertenso">Hipertensão Arterial</label>
                            <input type="checkbox" id="hipertenso" value="Hipertensão Arterial" defaultChecked={this.state.hipertenso} onChange={(e) => this.setState({hipertenso: e.target.checked})}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="diabetes">Diabetes</label>
                            <input type="checkbox" id="diabetes" value="Diabetes" defaultChecked={this.state.diabetico} onChange={(e) => this.setState({diabetico: e.target.checked})}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="nefropatias">Nefropatias</label>
                            <input type="checkbox" id="nefropatias" value="Nefropatias" defaultChecked={this.state.nefropata} onChange={(e) => this.setState({nefropata: e.target.checked})}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="hepatopatias">Hepatopatias</label>
                            <input type="checkbox" id="hepatopatias" value="Hepatopatias" defaultChecked={this.state.hempatopatico} onChange={(e) => this.setState({hempatopatico: e.target.checked})}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="tabagista">Tabagista</label>
                            <input type="checkbox" id="tabagista" value="Tabagista" defaultChecked={this.state.tabagista} onChange={(e) => this.setState({tabagista: e.target.checked})}/>
                        </div>
                    </div>
                </fieldset>

                <div className="button-group">
                    <Button className="btn btn-danger" onClick={this.esconderModal}><i className="fas fa-times-circle"></i> Cancelar</Button>
                    <Button className="btn btn-success" onClick={e => this.salvar(e)} type="submit"><i className="fas fa-save"></i> Atualizar</Button>
                </div>
            </div>
        </form>


        </Modal.Body>
      </Modal>
     </>
    );
  }
}

