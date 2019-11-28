import React, { useState, useContext } from "react";
import axios from "axios";
import Box from "../ui/Box";
import Flex from "../ui/Flex";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { css } from "emotion";
import { UserContext } from "../../context/userContext";

const Login = props => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const userCtx = useContext(UserContext);

  const submitLogin = () => {
    if (username === "" || password === "") {
      setError("Please enter a username and password");
    } else {
      axios
        .post("/login", { username, password })
        .then(res => {
          if (res.data !== false) {
            userCtx.setToken(res.data.token);
            userCtx.setUser(res.data.user);
            window.localStorage.accessToken = res.data.token;
            window.localStorage.user = JSON.stringify({
              id: res.data.user.id,
              username: res.data.user.username,
              email: res.data.user.email,
              bio: res.data.user.bio,
              profilepic: res.data.user.profilepic
            });
          } else {
            setError("Invalid Username or Password");
          }
        })
        .catch(error => {
          setError("There was an error logging in: " + error);
        });
    }
  };

  return (
    <Flex justifyContent="center">
      <Box
        width={props.matches.width ? "50%" : "95%"}
        height={props.matches.height ? "70vh" : "100%"}
        backgroundColor="rgba(255,255,255,.85)"
        borderRadius={props.matches.height ? "4px 4px 0 0" : "4px"}
        padding="10px"
        pt="45px"
        color="#555F61"
        position={props.matches.height && "absolute"}
        bottom={props.matches.height && "0"}
      >
        <Flex
          justifyContent="center"
          fontSize="24px"
          marginBottom="16px"
          color="#373D3F"
        >
          <Box>Log into TokeTalk</Box>
        </Flex>
        <Flex justifyContent="center" fontSize="16px" marginBottom="60px">
          <Flex>
            <Box pr="7px">Or</Box>
            <Box
              className={css`
                text-decoration: underline;
                &:hover {
                  cursor: pointer;
                  color: #373d3f;
                }
              `}
              onClick={() => props.setSignupVisible(true)}
            >
              Create Account
            </Box>
          </Flex>
        </Flex>
        <Flex
          justifyContent="center"
          fontSize="22px"
          flexDirection="row"
          alignItems="center"
        >
          <Input
            background="transparent"
            height="50px"
            width={props.matches.width ? "40%" : "90%"}
            padding="5px"
            margin="10px"
            border="0"
            borderBottom="2px solid #555F61"
            placeholder="username"
            value={username}
            onKeyDown={e => {
              if (e.keyCode === 13) {
                e.preventDefault();
                if (username !== "" && password !== "") {
                  submitLogin();
                }
              }
            }}
            onChange={e => {
              setUsername(e.target.value);
            }}
          />
        </Flex>
        <Flex justifyContent="center" fontSize="22px" paddingBottom="20px">
          <Input
            background="transparent"
            height="50px"
            width={props.matches.width ? "40%" : "90%"}
            padding="5px"
            margin="10px"
            border="0"
            borderBottom="2px solid #555F61"
            placeholder="password"
            type="password"
            value={password}
            onKeyDown={e => {
              if (e.keyCode === 13) {
                e.preventDefault();
                if (username !== "" && password !== "") {
                  submitLogin();
                }
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
            width={props.matches.width ? "40%" : "90%"}
            border="none"
            fontSize="14px"
            background={
              username !== "" && password !== "" ? "#313131" : "#CFCFCF"
            }
            color={username !== "" && password !== "" ? "white" : "#A1A1A1"}
            className={
              (username === "" || password === "") &&
              css`
                &:hover {
                  cursor: default;
                  background-color: #cfcfcf;
                }
              `
            }
            borderRadius="4px"
            onClick={() => {
              if (username !== "" && password !== "") {
                submitLogin();
              }
            }}
          >
            Log In
          </Button>
        </Flex>
      </Box>
    </Flex>
  );
};

export default Login;
