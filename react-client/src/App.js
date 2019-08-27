import React from "react";
import "./App.css";
import { Route, Switch } from "react-router";
import { withRouter } from "react-router-dom";
import MainPage from "./components/MainPage";
import Nav from "./components/Nav";
import Posts from "./components/Posts";
import WeedFooter from "./components/WeedFooter";
import TheBoys from "./components/TheBoys";
import NewCharacter from "./components/NewCharacter";
//import CreatePost from './componants/CreatePost';
import Weed from './components/Weed';

class App extends React.Component {
  handleHome = () => {
    this.props.history.push("/");
  };

  handlePosts = () => {
    this.props.history.push("/posts/");
  };

  handleTheBoys = () => {
    this.props.history.push("/theboys/");
  };

  handleNewCharacter = () => {
    this.props.history.push("/newcharacter");
  };

  handleWeed = () => {
    this.props.history.push('/weed/');
  };

  render() {
    return (
      <React.Fragment>
        <Nav
          home={this.handleHome}
          posts={this.handlePosts}
          weed={this.handleWeed}
          theboys={this.handleTheBoys}
          newchar={this.handleNewCharacter}
        />

        <Switch>
          <Route exact path="/" component={MainPage} />
          <Route path="/posts/" component={Posts} />
          <Route path="/weed/" component={Weed} />
          <Route path="/theboys/" component={TheBoys} />
          <Route path="/newcharacter/" component={NewCharacter} />
        </Switch>

        <WeedFooter />
      </React.Fragment>
    );
  }
}

export default withRouter(App);
