import React from 'react';
import './App.css';
import {Route, Switch } from "react-router";
import MainPage from './componants/MainPage';
import Nav from './componants/Nav';

class App extends React.Component {

  render() {
    return (
      <React.Fragment>

        <Nav/>

        <Switch>

          <Route path={'/'} component={MainPage}/>

        </Switch>
      </React.Fragment>
    );
  }
}

export default App;
