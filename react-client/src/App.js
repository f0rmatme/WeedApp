import React from 'react';
import './App.css';
import { Route, Switch } from "react-router";
import MainPage from './componants/MainPage';
import Nav from './componants/Nav';
import Posts from './componants/Posts';
import WeedFooter from './componants/WeedFooter';
import TheBoys from './componants/TheBoys';
import NewCharacter from './componants/NewCharacter';

class App extends React.Component {

  render() {
    return (
      <React.Fragment>

        <Nav/>
        
        <Switch>

          <Route path="/" exact component={MainPage}/>
          <Route path="/posts/" component={Posts}/>
          <Route path="/theboys/" component={TheBoys}/>
          <Route path="/newcharacter/" component={NewCharacter}/>

        </Switch>

        <WeedFooter/>
      </React.Fragment>
    );
  }
}

export default App;
