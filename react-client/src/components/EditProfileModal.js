import React, { useState } from "react";
import Box from "./ui/Box";
import Input from "./ui/Input";
import { Input as AntInput } from "antd";

const { TextArea } = AntInput;

const EditProfile = props => {
  const [bio, setBio] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  return (
    <Box>
      <Box>Email</Box>
      <Input
        border="1px solid #d9d9d9"
        py="5px"
        px="10px"
        borderRadius="10px"
      />
      <Box>Username</Box>
      <Input
        border="1px solid #d9d9d9"
        py="5px"
        px="10px"
        borderRadius="10px"
      />
      <Box>Bio</Box>
      <TextArea
        placeholder="Review"
        autosize={{ minRows: 2, maxRows: 6 }}
        onChange={() => console.log("nice")}
      />
    </Box>
  );
};

export default EditProfile;
