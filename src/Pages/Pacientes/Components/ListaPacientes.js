import React from 'react';
import VisualizarPaciente from './VisualizarPaciente';
import firebase from '../../../Database/connection';
const excluirAtendimento = (key) => {
  if(window.confirm("Você realmente deseja excluir este item?")){
    firebase.firestore().collection('pacientes').doc(key).delete().then(
      alert("Exclusão realizada com sucesso!")
    )
  }
}

    

const listaPacientes = ({lista}) => {
  return(
    <table className="table table-striped">
      <thead>
          <tr className="bg-info">
              <th>Nome do Paciente</th>
              <th>Medicamento</th>
              <th>Notificador</th>
              <th>Data Notificação</th>
              <th>Visualizar</th>
              <th>Excluir</th>
          </tr>
      </thead>
      <tbody>
        {
          lista.map((paciente)=>
            <tr key={paciente.id}> 
              <td>{paciente.nome}</td>
              <td>{paciente.dosagem}</td>
              <td>{paciente.nomeNotificador}</td>
              <td>{paciente.dataNotificacao}</td>
              <td><VisualizarPaciente parametro={paciente.id}/></td>
              <td><button className="btn btn-danger" onClick={() => excluirAtendimento(paciente.id)}>Excluir</button></td>
            </tr>
          )
        }
      </tbody>
    </table>
  );

}

export default listaPacientes;