import React, { useState, useContext } from "react";
import axios from 'axios';
import Box from "../ui/Box";
import Flex from "../ui/Flex";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { css } from "emotion";
import { UserContext } from "../../context/userContext";

const Login = (props) => {

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
            })
            .catch(error => {
                setError("There was an error logging in: " + error);
            });
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
                    marginBottom="16px"
                    color="#373D3F"
                >
                    <Box>Log into TokeTalk</Box>
                </Flex>
                <Flex
                    justifyContent="center"
                    fontSize="16px"
                    marginBottom="60px"
                >
                    <Flex>
                        <Box pr="7px">Or</Box> 
                        <Box 
                            className={css`
                                text-decoration: underline;
                                &:hover {
                                    cursor: pointer;
                                    color: #373D3F
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
                    width={props.matches ? "40%" : "90%"}
                    padding="5px"
                    margin="10px"
                    border="0"
                    borderBottom="2px solid #555F61"
                    placeholder="username"
                    value={username}
                    onKeyDown={e => {
                        if (e.keyCode === 13) {
                            e.preventDefault();
                            if(username !== "" && password !== "") {
                                submitLogin();
                            }
                        }
                    }}
                    onChange={e => {
                        setUsername(e.target.value);
                    }}
                    />
                </Flex>
                <Flex
                    justifyContent="center"
                    fontSize="22px"
                    paddingBottom="20px"
                >
                    <Input
                    background="transparent"
                    height="50px"
                    width={props.matches ? "40%" : "90%"}
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
                            if(username !== "" && password !== "") {
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
                        width={props.matches ? "40%" : "90%"}
                        border="none"
                        fontSize="14px"
                        background={username !== "" && password !== "" ? "#313131" : "#E6E6E6"}
                        color={username !== "" && password !== "" ? "white" : "#A1A1A1"}
                        className={(username === "" || password === "") && css`
                            &:hover {
                                cursor: default;
                                background-color: #E6E6E6;
                            }
                        `}
                        borderRadius="4px"
                        onClick={() => {
                            if(username !== "" && password !== "") {
                                submitLogin();
                            }
                        }}
                    >
                        Log In
                    </Button>
                </Flex>
            </Box>
        </Flex>
    )
}

export default Login;


