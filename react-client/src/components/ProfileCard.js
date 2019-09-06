import React from "react";
import Box from "./ui/Box";
import Flex from "./ui/Flex";
import { Divider } from "antd";

import { UserContext } from "../context/userContext";

const ProfileCard = () => {
  const userCtx = React.useContext(UserContext);
  return (
    <Box width="80%" height="300px" backgroundColor="white" borderRadius="3px">
      <Flex>
        <img
          alt="profile"
          style={{
            borderRadius: "50%",
            height: "50px",
            width: "50px",
            margin: "5px",
            marginBottom: "0px"
          }}
          src={userCtx.user.picture}
        />
        <Box m="5px" mt="15px" mb="0px" fontWeight="bold" fontSize="18px">
          {userCtx.user.username}
        </Box>
      </Flex>
      <Flex justifyContent="center" alignItems="center">
        <Box width="90%">
          <Divider />
        </Box>
      </Flex>
      <Box px="15px" pb="5px" pr="5px">
        email
      </Box>
      <Box px="15px" pb="5px" pr="5px" fontWeight="bold">
        {userCtx.user.email}
      </Box>
      <Box px="15px" py="5px" pr="5px">
        bio
      </Box>
      <Box px="15px" pb="5px" pr="5px" fontWeight="bold" width="80%">
        {userCtx.user.bio}
      </Box>
    </Box>
  );
};

export default ProfileCard;
