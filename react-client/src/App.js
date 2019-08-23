import React from 'react';
import './App.css';
import {Route, Switch} from "react-router";
import {withRouter} from 'react-router-dom';
import MainPage from './components/MainPage';
import Nav from './components/Nav';
import Posts from './components/Posts';
import WeedFooter from './components/WeedFooter';
import TheBoys from './components/TheBoys';
import axios from 'axios';
import NewCharacter from './components/NewCharacter';
//import CreatePost from './componants/CreatePost';

class App extends React.Component {

  handleHome = () => {
    this.props.history.push('/');
  }

  handlePosts = () => {
    this.props.history.push('/posts/');
  }

  handleTheBoys = () => {
    this.props.history.push('/theboys/');
  }

  handleNewCharacter = () => {
    this.props.history.push('/newcharacter');
  }

  render() {
    return (
      <React.Fragment>

      <Nav home={this.handleHome} posts={this.handlePosts} theboys={this.handleTheBoys} newchar={this.handleNewCharacter}/>

      <Switch>

        <Route exact path="/" component={MainPage}/>
        <Route path="/posts/" component={Posts}/>
        <Route path="/theboys/" component={TheBoys}/>
        <Route path="/newcharacter/" component={NewCharacter}/>

      </Switch>

      <WeedFooter/>
    </React.Fragment>);
  }
}

export default withRouter(App);
