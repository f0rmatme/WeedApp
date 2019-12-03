import React, { useContext, useState } from "react";
import Box from "../ui/Box";
import { css } from "emotion";
import Input from "../ui/Input";
import { Input as AntInput, Modal } from "antd";
import { UserContext } from "../../context/userContext";
import { ButtonCancel, ButtonSubmit } from "../ui/Button";
import UploadProfilePicture from "./UploadProfilePicture";

const { TextArea } = AntInput;

const EditProfile = props => {
  const userCtx = useContext(UserContext);

  const [bio, setBio] = useState("");
  const [email, setEmail] = useState("");
  const [profilePicture, setProfilePicture] = useState("");

  const handleOk = () => {
    userCtx.updateProfile("", email, bio, profilePicture);
    userCtx.reloadUserInfo(userCtx.user);
    props.setEditOpen(false);
  };

  const handleCancel = () => {
    props.setEditOpen(false);
  };

  const handleBio = e => {
    setBio(e.target.value);
  };

  const handleEmail = e => {
    setEmail(e.target.value);
  };

  return (
    <Modal
      title="Edit Profile Information"
      visible={props.editOpen}
      onCancel={handleCancel}
      footer={[
        <ButtonCancel
          key="CancelButton"
          onClick={handleCancel}
          bg="transparent"
          color="#D7D8D7"
        >
          Cancel
        </ButtonCancel>,
        <ButtonSubmit
          onClick={handleOk}
          border="1px solid #9D9F9C"
          key="SumbitButton"
        >
          Submit
        </ButtonSubmit>
      ]}
    >
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
          value={email}
          onChange={handleEmail}
        />
        <Box py="5px">Bio</Box>
        <TextArea
          placeholder={userCtx.user.bio || "Write Biography"}
          autoSize={{ minRows: 2, maxRows: 6 }}
          onChange={handleBio}
          value={bio}
        />
      </Box>
      <UploadProfilePicture setProfilePicture={setProfilePicture} />
    </Modal>
  );
};

export default EditProfile;
