import React from 'react';

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
              <td><button>Visualizar</button></td>
              <td><button>Excluir</button></td>
            </tr>
          )
        }
      </tbody>
    </table>
  );

}

export default listaPacientes;