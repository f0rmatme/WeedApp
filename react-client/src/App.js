import React, { useContext } from "react";
import "./App.css";
import { Route, Switch } from "react-router";
import { withRouter } from "react-router-dom";
import MainPage from "./components/MainPage";
import Nav from "./components/Nav";
import Posts from "./components/Posts";
import WeedFooter from "./components/WeedFooter";
import TheBoys from "./components/TheBoys";
import axios from "axios";
import NewCharacter from "./components/NewCharacter";
import { UserContext } from "./context/userContext";
import Login from "./components/login";
//import CreatePost from './componants/CreatePost';
import Weed from "./components/Weed";

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
