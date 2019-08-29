import React, { useContext } from "react";
import "./App.css";
import { Route, Switch } from "react-router";
import { withRouter } from "react-router-dom";
import MainPage from "./componants/MainPage";
import Nav from "./componants/Nav";
import Posts from "./componants/Posts";
import WeedFooter from "./componants/WeedFooter";
import TheBoys from "./componants/TheBoys";
import axios from "axios";
import NewCharacter from "./componants/NewCharacter";
import { UserContext } from "./context/userContext";
import Login from "./componants/login";
//import CreatePost from './componants/CreatePost';
import Weed from './components/Weed';

const App = props => {
  const handleHome = () => {
    props.history.push("/");
  };

  const handlePosts = () => {
    props.history.push("/posts/");
  };

  const handleTheBoys = () => {
    props.history.push("/theboys/");
  };

  const handleNewCharacter = () => {
    props.history.push("/newcharacter");
  };

  const userCtx = useContext(UserContext);

  return (
    <React.Fragment>
      <Nav
        home={handleHome}
        posts={handlePosts}
        theboys={handleTheBoys}
        newchar={handleNewCharacter}
      />

      {userCtx.username === "" || userCtx.email === "" ? (
        <Switch>
          <Route exact path="/" component={Login} />
        </Switch>
      ) : (
        <Switch>
          <Route exact path="/" component={MainPage} />
          <Route path="/posts/" component={Posts} />
          <Route path="/theboys/" component={TheBoys} />
          <Route path="/newcharacter/" component={NewCharacter} />
        </Switch>
      )}

      <WeedFooter />
    </React.Fragment>
  );
};

export default withRouter(App);
