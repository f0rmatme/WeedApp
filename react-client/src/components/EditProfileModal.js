import React, { useState, useContext } from "react";
import axios from "axios";
import Box from "./ui/Box";
import { css } from "emotion";
import Input from "./ui/Input";
import { Input as AntInput } from "antd";
import { UserContext } from "../context/userContext";

const { TextArea } = AntInput;

const EditProfile = props => {
  const userCtx = useContext(UserContext);

  return (
    <Box>
      <Box py="5px">Email</Box>
      <Input
        border="1px solid #d9d9d9"
        py="5px"
        px="10px"
        borderRadius="10px"
        className={css`
          width: 60%;
          &:hover {
            border-color: #9da077;
            transition: border 0.5s;
          }
        `}
        placeholder={userCtx.user.email}
        value={props.email}
        onChange={props.handleEmail}
      />
      <Box py="5px">Username</Box>
      <Input
        border="1px solid #d9d9d9"
        py="5px"
        px="10px"
        borderRadius="10px"
        className={css`
          width: 60%;
          &:hover {
            border-color: #9da077;
            transition: border 0.5s;
          }
        `}
        placeholder={userCtx.user.username}
        value={props.username}
        onChange={props.handleUsername}
      />
      <Box py="5px">Bio</Box>
      <TextArea
        placeholder={userCtx.user.bio || "Write Biography"}
        autosize={{ minRows: 2, maxRows: 6 }}
        onChange={props.handleBio}
        value={props.bio}
      />
    </Box>
  );
};

export default EditProfile;
