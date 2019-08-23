import React from 'react';
import './App.css';
import {Route, Switch} from "react-router";
import {withRouter} from 'react-router-dom';
import MainPage from './componants/MainPage';
import Nav from './componants/Nav';
import Posts from './componants/Posts';
import WeedFooter from './componants/WeedFooter';
import TheBoys from './componants/TheBoys';
import axios from 'axios';
import NewCharacter from './componants/NewCharacter';
//import CreatePost from './componants/CreatePost';

class App extends React.Component {

  handleHome = () => {
    this.props.history.push('/');
  }

  componentDidMount(){
    axios.get('http://localhost:3000/posts').then((res) => {
      console.log(res);
    })
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
