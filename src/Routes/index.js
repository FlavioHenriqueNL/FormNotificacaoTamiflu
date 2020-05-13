import React from 'react';
import firebase from '../Database/connection';
import RouterNavigation from './Components/RouterNavigation';

export default class Auth extends React.Component {
  state = {
    authenticated: false
  }

  //é executado depois que a saída do componente é renderizada no DOM
  componentDidMount(){
    firebase.auth().onAuthStateChanged((authenticated)=>{
      authenticated ?
      this.setState({authenticated: true})
      :
      this.setState({authenticated: false})
      ;
    });
  }

  render(){
    return <RouterNavigation authenticated={this.state.authenticated} />
  }
}