import React, { useState } from "react";
import axios from 'axios';
import Box from "../ui/Box";
import Flex from "../ui/Flex";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { css } from "emotion";
import { validateInput, validateEmail } from "../../helpers/validation.js";

const Signup = (props) => {

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
          } else if(!validateEmail(email)) {
            setError("Please enter a valid email");
          } else {
            axios
              .post("/signup", { username, password, email })
              .then(res => {
                props.setSignupVisible(false);
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
                width={props.matches ? "50%" : "95%"}
                height="70vh"
                backgroundColor="rgba(255,255,255,.70)"
                borderRadius="4px 4px 0 0"
                padding="10px"
                pt="45px"
                color="#555F61"
                bottom="0"
                position="absolute"
            >
            <Flex
                justifyContent="center"
                fontSize="24px"
                marginBottom="20px"
            >
                <Box>Signup</Box>
            </Flex>
            <Flex
                justifyContent="center"
                fontSize="25px"
            >
                <Input
                background="transparent"
                height="50px"
                width="80%"
                padding="5px"
                margin="10px"
                border="0"
                borderBottom="2px solid #555F61"
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
            >
                <Input
                background="transparent"
                height="50px"
                width="80%"
                padding="5px"
                margin="10px"
                border="0"
                borderBottom="2px solid #555F61"
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
                paddingBottom="20px"
            >
                <Input
                background="transparent"
                height="50px"
                width="80%"
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
                />
            </Flex>
            <Flex justifyContent="center" mb="20px">
                {error && <Box color="red">{error}</Box>}
            </Flex>
            <Flex justifyContent="center" paddingBottom="50px">
                <Button
                    p="10px"
                    width={props.matches ? "30%" : "90%"}
                    border="none"
                    fontSize="14px"
                    background={username !== "" && password !== "" && email !== "" ? "#313131" : "#E6E6E6"}
                    color={username !== "" && password !== "" && email !== "" ? "white" : "#A1A1A1"}
                    className={(username === "" || password === "" || email === "") && css`
                        &:hover {
                            cursor: default;
                            background-color: #E6E6E6;
                        }
                    `}
                    borderRadius="4px"
                onClick={() => {
                    if(username !== "" && password !== "" && email !== "") {
                        submitSignin();
                    }
                }}
                >
                Sign Up!
                </Button>
            </Flex>
            <Flex
                justifyContent="center"
                fontSize="16px"
            >
                <Box
                px="15px"
                py="5px"
                className={css`
                    text-decoration: underline;
                    &:hover {
                        cursor: pointer;
                        color: #373D3F
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
}

export default Signup;