import React, { useContext } from "react";
import "./App.css";
import { Route, Switch, Redirect } from "react-router";
import { withRouter } from "react-router-dom";
import MainPage from "./components/MainPage";
import Nav from "./components/Nav";
import Posts from "./components/Posts";
import WeedFooter from "./components/WeedFooter";
import TheBoys from "./components/TheBoys";
import NewCharacter from "./components/NewCharacter";
import { UserContext } from "./context/userContext";
import Login from "./components/login";
import Box from "./components/ui/Box";
import Weed from "./components/Weed";

const App = props => {
  const [at, setAt] = React.useState(null);

  const handleHome = () => {
    props.history.push("/");
  };

  const handlePosts = () => {
    props.history.push("/posts/");
  };

  const handleWeed = () => {
    props.history.push("/weed/");
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
      {window.localStorage.accessToken === undefined ? (
        <Login setAt={setAt} />
      ) : (
        <Box>
          <Nav
            setAt={setAt}
            home={handleHome}
            posts={handlePosts}
            theboys={handleTheBoys}
            newchar={handleNewCharacter}
            weed={handleWeed}
          />
          <Switch>
            <Route exact path="/" render={() => <Redirect to="/posts" />} />
            <Route
              path="/posts/"
              component={() => <Posts at={userCtx.token} />}
            />
            <Route exact path="/weed" component={Weed} />
            <Route path="/theboys/" component={TheBoys} />
            <Route path="/newcharacter/" component={NewCharacter} />
          </Switch>
        </Box>
      )}
    </React.Fragment>
  );
};

export default withRouter(App);
