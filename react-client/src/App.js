import React, { useContext, useEffect } from "react";
import "./App.css";
import { Route, Switch, Redirect } from "react-router";
import { withRouter } from "react-router-dom";
import Nav from "./components/Nav";
import Posts from "./components/Posts";
import { UserContext } from "./context/userContext";
import { FriendContext } from "./context/friendContext";
import LandingPage from "./components/Authentication/LandingPage";
import Box from "./components/ui/Box";
import Weed from "./components/Weed";
import Profile from "./components/Profile/Profile";
import { Helmet } from "react-helmet";

const App = props => {
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
  const friendCtx = useContext(FriendContext);

  useEffect(() => {
    if (window.localStorage.user) {
      let user = JSON.parse(window.localStorage.user);
      userCtx.reloadUserInfo(user);
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (window.localStorage.user) {
      friendCtx.getFollowList();
    }
    // eslint-disable-next-line
  }, [userCtx.user]);

  return (
    <Box fontFamily="Varela Round">
      <Helmet titleTemplate=" %s | Toke Talk">
        <meta
          name="description"
          content="Create an account today! TokeTalk is a growing community of marijuana connoisseurs. Discuss, learn, and share your opinion about marijuana strains. Follow others to see what they think about strains! Find a store near you!"
        />
        <meta
          name="keywords"
          content="toke,talk,toketalk,weed,marijuana,canada,legalized,smoke,420,thc,cbd,rating,post,comment,create,account,toek,teok,teko,talk,takl,tlak,tlka,toektalk,toketakl,toektakl,toktalk,toktakl,tooketalk,0tooktalk,toketock"
        />
        <meta name="robots" content="index,follow" />
      </Helmet>
      {!window.localStorage.accessToken ? (
        <LandingPage />
      ) : (
        <Box>
          <Nav
            location={props.match}
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
            <Route path="/profile/:username" component={Profile} />
          </Switch>
        </Box>
      )}
    </Box>
  );
};

export default withRouter(App);
