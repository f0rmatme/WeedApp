import React, { useContext, useEffect } from "react";
import "./App.css";
import { Route, Switch, Redirect } from "react-router";
import axios from "axios";
import { withRouter } from "react-router-dom";
import Nav from "./components/Nav";
import Posts from "./components/Posts";
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
            location={props.match}
            setAt={setAt}
            home={handleHome}
            posts={handlePosts}
            weed={handleWeed}
          />
          <Switch>
            <Route exact path="/" render={() => <Redirect to="/posts/" />} />
            <Route
              path="/posts/"
              component={() => <Posts at={userCtx.token} />}
            />
            <Route exact path="/weed" component={Weed} />
          </Switch>
        </Box>
      )}
    </Box>
  );
};

export default withRouter(App);
