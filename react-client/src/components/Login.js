import React, { useState, useContext } from "react";
import axios from "axios";
import Box from "./ui/Box";
import Flex from "./ui/Flex";
import Input from "./ui/Input";
import Button from "./ui/Button";
import bgImage from "./images/plant.jpg";
import { css } from "@emotion/core";
import { UserContext } from "../context/userContext";
import { useSpring, animated } from "react-spring";
import PersonIcon from "@material-ui/icons/Person";

const HookedComponent = props => {
  const props1 = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    delay: "200"
  });
  return <animated.div style={props1}>{props.children}</animated.div>;
};

const Login = ({ setAt }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [signupVisible, setSignupVisible] = useState(false);
  const [error, setError] = useState("");

  const userCtx = useContext(UserContext);

  const submitLogin = () => {
    if (username === "" || password === "") {
      setError("Please enter a username and password");
    } else {
      axios
        .post("http://localhost:3000/login", { username, password })
        .then(res => {
          userCtx.setToken(res.data.token);
          userCtx.setUser(res.data.user);
          window.localStorage.accessToken = res.data.token;
          window.localStorage.user = JSON.stringify({
            id: res.data.user.id,
            username: res.data.user.username,
            email: res.data.user.email,
            bio: res.data.user.bio,
            picture: res.data.user.profilepic
          });
          setAt(res.data.token);
        })
        .catch(error => {
          setError("There was an error logging in");
        });
    }
  };

  const submitSignin = () => {
    if (username === "" || password === "" || email === "") {
      setError("Please fill out all fields");
    } else {
      axios
        .post("http://localhost:3000/signup", { username, password, email })
        .then(res => {
          setSignupVisible(false);
        })
        .catch(error => {
          setError("There was an error with your registration");
        });
    }
  };

  return (
    <Box
      height="100vh"
      backgroundImage={`url(${bgImage})`}
      backgroundRepeat="no-repeat"
      backgroundSize="cover"
    >
      {!signupVisible ? (
        <HookedComponent>
          <Flex
            justifyContent="center"
            fontFamily="Permanent Marker"
            fontSize="90px"
            color="white"
            paddingTop="5%"
          >
            TokeTalk
          </Flex>

          <Flex justifyContent="center">
            <Box
              width="400px"
              height="480px"
              backgroundColor="rgba(0,0,0,.85)"
              borderRadius="25px"
              padding="10px"
              color="white"
              boxShadow=" 5px -5px 18px #000000"
            >
              <Flex
                justifyContent="center"
                fontSize="25px"
                fontFamily="Permanent Marker"
                marginBottom="20px"
              >
                <Box>Login</Box>
              </Flex>
              <Flex
                justifyContent="center"
                fontSize="25px"
                fontFamily="Permanent Marker"
                flexDirection="row"
                alignItems="center"
              >
                <Input
                  color="white"
                  background="transparent"
                  fontFamily="sans serif"
                  height="50px"
                  width="80%"
                  padding="5px"
                  margin="10px"
                  border="0"
                  borderBottom="2px solid white"
                  placeholder="username"
                  value={username}
                  onKeyDown={e => {
                    if (e.keyCode === 13) {
                      e.preventDefault();
                      submitLogin();
                    }
                  }}
                  onChange={e => {
                    setUsername(e.target.value);
                  }}
                />
              </Flex>
              <Flex
                justifyContent="center"
                fontSize="25px"
                fontFamily="Permanent Marker"
                paddingBottom="20px"
              >
                <Input
                  color="white"
                  background="transparent"
                  fontFamily="sans serif"
                  height="50px"
                  width="80%"
                  padding="5px"
                  margin="10px"
                  border="0"
                  borderBottom="2px solid white"
                  placeholder="password"
                  type="password"
                  value={password}
                  onKeyDown={e => {
                    if (e.keyCode === 13) {
                      e.preventDefault();
                      submitLogin();
                    }
                  }}
                  onChange={e => {
                    setPassword(e.target.value);
                  }}
                />
              </Flex>
              <Flex justifyContent="center" mb="20px">
                {error && <Box color="red">{error}</Box>}
              </Flex>
              <Flex justifyContent="center" paddingBottom="50px">
                <Button
                  p="10px"
                  border="1px solid white"
                  borderRadius="5px"
                  background="transparent"
                  onClick={() => submitLogin()}
                >
                  Submit
                </Button>
              </Flex>
              <Flex
                justifyContent="center"
                fontSize="25px"
                fontFamily="Permanent Marker"
                css={css`
                  $:hover {
                    cursor: pointer;
                  }
                `}
              >
                <Button
                  bg="transparent"
                  border="none"
                  borderRadius="15px"
                  px="15px"
                  py="5px"
                  onClick={() => setSignupVisible(true)}
                >
                  Sign Up
                </Button>
              </Flex>
            </Box>
          </Flex>
        </HookedComponent>
      ) : (
        <HookedComponent>
          <Flex
            justifyContent="center"
            fontFamily="Permanent Marker"
            fontSize="90px"
            color="white"
            paddingTop="5%"
          >
            TokeTalk
          </Flex>

          <Flex justifyContent="center">
            <Box
              width="400px"
              height="520px"
              backgroundColor="rgba(0,0,0,.85)"
              borderRadius="25px"
              padding="10px"
              color="white"
              boxShadow=" 5px -5px 18px #000000"
            >
              <Flex
                justifyContent="center"
                fontSize="25px"
                fontFamily="Permanent Marker"
                marginBottom="20px"
              >
                <Box>Signup</Box>
              </Flex>
              <Flex
                justifyContent="center"
                fontSize="25px"
                fontFamily="Permanent Marker"
              >
                <Input
                  color="white"
                  background="transparent"
                  fontFamily="sans serif"
                  height="50px"
                  width="80%"
                  padding="5px"
                  margin="10px"
                  border="0"
                  borderBottom="2px solid white"
                  placeholder="username"
                  value={username}
                  onChange={e => {
                    setUsername(e.target.value);
                  }}
                />
              </Flex>
              <Flex
                justifyContent="center"
                fontSize="25px"
                fontFamily="Permanent Marker"
              >
                <Input
                  color="white"
                  background="transparent"
                  fontFamily="sans serif"
                  height="50px"
                  width="80%"
                  padding="5px"
                  margin="10px"
                  border="0"
                  borderBottom="2px solid white"
                  placeholder="email"
                  value={email}
                  onChange={e => {
                    setEmail(e.target.value);
                  }}
                />
              </Flex>
              <Flex
                justifyContent="center"
                fontSize="25px"
                fontFamily="Permanent Marker"
                paddingBottom="20px"
              >
                <Input
                  color="white"
                  background="transparent"
                  fontFamily="sans serif"
                  height="50px"
                  width="80%"
                  padding="5px"
                  margin="10px"
                  border="0"
                  borderBottom="2px solid white"
                  placeholder="password"
                  type="password"
                  value={password}
                  onChange={e => {
                    setPassword(e.target.value);
                  }}
                />
              </Flex>
              <Flex justifyContent="center" mb="20px">
                {error && <Box color="red">{error}</Box>}
              </Flex>
              <Flex justifyContent="center" paddingBottom="50px">
                <Button
                  p="10px"
                  border="1px solid white"
                  borderRadius="5px"
                  background="transparent"
                  onClick={() => submitSignin()}
                >
                  Sign Up!
                </Button>
              </Flex>
              <Flex
                justifyContent="center"
                fontSize="16px"
                fontFamily="Permanent Marker"
              >
                <Button
                  bg="transparent"
                  border="none"
                  borderRadius="15px"
                  px="15px"
                  py="5px"
                  onClick={() => setSignupVisible(false)}
                >
                  Already Have An Account? - Login
                </Button>
              </Flex>
            </Box>
          </Flex>
        </HookedComponent>
      )}
    </Box>
  );
};
export default Login;