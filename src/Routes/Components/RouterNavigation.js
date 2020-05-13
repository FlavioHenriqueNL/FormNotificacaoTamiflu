import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import ProtectedRoute from './ProtectedRoute';
// Importando as páginas
import Login from '../../Pages/Login';
import Pacientes from '../../Pages/Pacientes'
// import Atendimentos from '../Pages/Atendimentos';

export default class RouterNavigation extends React.Component{
  render(){
    return(
      <Router>
        <Switch>
          <ProtectedRoute exact authenticated={this.props.authenticated} path="/" component={Pacientes} />
          <Route authenticated={this.props.authenticated} path="/login" component={Login} />
        </Switch>
      </Router>
    );
  }
} 
