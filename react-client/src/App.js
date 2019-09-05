import React, { useContext, useEffect } from "react";
import "./App.css";
import { Route, Switch, Redirect } from "react-router";
import axios from "axios";
import { withRouter } from "react-router-dom";
import MainPage from "./components/MainPage";
import Nav from "./components/Nav";
import Posts from "./components/Posts";
import WeedFooter from "./components/WeedFooter";
import TheBoys from "./components/TheBoys";
import NewCharacter from "./components/NewCharacter";
import { UserContext } from "./context/userContext";
import Login from "./components/Login";
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

  useEffect(() => {
    if (window.localStorage.user) {
      let user = JSON.parse(window.localStorage.user);
      axios
        .get(`http://localhost:3000/me/${user.id}`, {
          headers: { Authorization: `Bearer ${userCtx.token}` }
        })
        .then(res => {
          userCtx.setUser(user);
        });
    }
  }, [window.localStorage.user]);

  return (
    <Box fontFamily="Oxygen">
      {!window.localStorage.accessToken ? (
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
    </Box>
  );
};

export default withRouter(App);
