import React, { useState, useContext } from "react";
import axios from "axios";
import Box from "./ui/Box";
import Flex from "./ui/Flex";
import Input from "./ui/Input";
import Button from "./ui/Button";
import bgImage from "./images/plant.jpg";
import { css } from "@emotion/core";
import { UserContext } from "../context/userContext";

const Login = ({ setAt }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const userCtx = useContext(UserContext);

  const submitLogin = () => {
    axios
      .post("http://localhost:3000/login", { username, password })
      .then(res => {
        console.log(res.data);
        userCtx.setToken(res.data.token);
        userCtx.setUsername(res.data.user.username);
        userCtx.setEmail(res.data.user.email);
        window.localStorage.accessToken = res.data.token;
        setAt(res.data.token);
      });
  };

  return (
    <Box
      height="100vh"
      backgroundImage={`url(${bgImage})`}
      backgroundRepeat="no-repeat"
      backgroundSize="cover"
    >
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
          height="600px"
          backgroundColor="rgba(0,0,0,.85)"
          borderRadius="25px"
          padding="10px"
          color="white"
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
          >
            <Input
              color="white"
              background="transparent"
              borderRadius="5px"
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
            paddingBottom="20px"
          >
            <Input
              color="white"
              background="transparent"
              borderRadius="5px"
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
          <Flex justifyContent="center" paddingBottom="50px">
            <Button
              p="10px"
              border="1px solid white"
              borderRadius="5px"
              background="transparent"
              onClick={() => submitLogin()}
              css={css`
                $:hover {
                  cursor: pointer;
                }
              `}
            >
              Submit
            </Button>
          </Flex>
          <Flex
            justifyContent="center"
            fontSize="25px"
            fontFamily="Permanent Marker"
          >
            <Box>Sign Up</Box>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
};
export default Login;
