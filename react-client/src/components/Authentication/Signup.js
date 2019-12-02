import React, { useState } from "react";
import axios from "axios";
import Box from "../ui/Box";
import Flex from "../ui/Flex";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { css } from "emotion";
import { validateInput, validateEmail } from "../../helpers/validation.js";

const Signup = props => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const submitSignin = () => {
    if (username === "" || password === "" || email === "") {
      setError("Please fill out all fields");
    } else {
      if (!validateInput(username)) {
        setError("Please watch the language!");
      } else if (!validateEmail(email)) {
        setError("Please enter a valid email");
      } else {
        axios
          .post("/signup", { username, password, email })
          .then(res => {
            if (res.data.error) {
              setError(res.data.error);
            } else {
              props.setSignupVisible(false);
            }
          })
          .catch(error => {
            setError("There was an error with your registration");
          });
      }
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
        bottom={props.matches.height && "0"}
        position={props.matches.height && "absolute"}
      >
        <Flex justifyContent="center" fontSize="24px" marginBottom="20px">
          <Box>Signup</Box>
        </Flex>
        <Flex justifyContent="center" fontSize="22px">
          <Input
            background="transparent"
            height="50px"
            width={props.matches.width ? "50%" : "90%"}
            padding="5px"
            margin="10px"
            border="0"
            borderBottom="2px solid #555F61"
            placeholder="username"
            value={username}
            onChange={e => {
              setUsername(e.target.value);
            }}
            onKeyDown={e => {
              if (e.keyCode === 13) {
                e.preventDefault();
                if (username !== "" && password !== "" && email !== "") {
                  submitSignin();
                }
              }
            }}
          />
        </Flex>
        <Flex justifyContent="center" fontSize="22px">
          <Input
            background="transparent"
            height="50px"
            width={props.matches.width ? "50%" : "90%"}
            padding="5px"
            margin="10px"
            border="0"
            borderBottom="2px solid #555F61"
            placeholder="email"
            value={email}
            onChange={e => {
              setEmail(e.target.value);
            }}
            onKeyDown={e => {
              if (e.keyCode === 13) {
                e.preventDefault();
                if (username !== "" && password !== "" && email !== "") {
                  submitSignin();
                }
              }
            }}
          />
        </Flex>
        <Flex justifyContent="center" fontSize="22px" paddingBottom="20px">
          <Input
            background="transparent"
            height="50px"
            width={props.matches.width ? "50%" : "90%"}
            padding="5px"
            margin="10px"
            border="0"
            borderBottom="2px solid #555F61"
            placeholder="password"
            type="password"
            value={password}
            onChange={e => {
              setPassword(e.target.value);
            }}
            onKeyDown={e => {
              if (e.keyCode === 13) {
                e.preventDefault();
                if (username !== "" && password !== "" && email !== "") {
                  submitSignin();
                }
              }
            }}
          />
        </Flex>
        <Flex justifyContent="center" mb="20px">
          {error && <Box color="red">{error}</Box>}
        </Flex>
        <Flex
          justifyContent="center"
          paddingBottom={props.matches.width ? "50px" : "35px"}
        >
          <Button
            p="10px"
            width={props.matches.width ? "40%" : "90%"}
            border="none"
            fontSize="14px"
            background={
              username !== "" && password !== "" && email !== ""
                ? "#313131"
                : "#CFCFCF"
            }
            color={
              username !== "" && password !== "" && email !== ""
                ? "white"
                : "#A1A1A1"
            }
            className={
              (username === "" || password === "" || email === "") &&
              css`
                &:hover {
                  cursor: default;
                  background-color: #cfcfcf;
                }
              `
            }
            borderRadius="4px"
            onClick={() => {
              if (username !== "" && password !== "" && email !== "") {
                submitSignin();
              }
            }}
          >
            Sign Up!
          </Button>
        </Flex>
        <Flex justifyContent="center" fontSize="16px">
          <Box
            px="15px"
            py="5px"
            className={css`
              text-decoration: underline;
              &:hover {
                cursor: pointer;
                color: #373d3f;
              }
            `}
            onClick={() => props.setSignupVisible(false)}
          >
            Already Have An Account? - Log In
          </Box>
        </Flex>
      </Box>
    </Flex>
  );
};

export default Signup;
