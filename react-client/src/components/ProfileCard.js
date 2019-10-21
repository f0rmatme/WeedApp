import React from "react";
import Box from "./ui/Box";
import Flex from "./ui/Flex";
import { Divider, Icon } from "antd";
import DEFAULT_PROFILE from "../components/images/toketalk_3d_badge.PNG";

import { UserContext } from "../context/userContext";

const ProfileCard = () => {
  const userCtx = React.useContext(UserContext);
  return (
    <Box width="60%" height="300px" backgroundColor="white" borderRadius="3px">
      <Flex px="15px" pb="5px" pt="10px" pr="5px">
        <Icon type="profile" style={{ paddingTop: "4px" }} />
        <Box pl="10px" pb="5px" pr="5px" fontWeight="bold">
          Profile
        </Box>
      </Flex>
      <Flex justifyContent="center" alignItems="center">
        <Box width="90%">
          <Divider style={{ margin: "12px", marginTop: "5px" }} />
        </Box>
      </Flex>
      <Flex mb="20px">
        <img
          alt="profile"
          style={{
            borderRadius: "50%",
            height: "50px",
            width: "50px",
            margin: "10px",
            marginTop: "0px",
            marginBottom: "0px"
          }}
          src={userCtx.user.picture ? userCtx.user.picture : DEFAULT_PROFILE}
        />
        <Box m="5px" mt="15px" mb="0px" fontWeight="bold" fontSize="18px">
          {userCtx.user.username}
        </Box>
      </Flex>
      <Flex px="15px" pb="5px" pr="5px">
        <Icon type="mail" style={{ paddingTop: "4px" }} />
        <Box px="15px" pb="5px" pr="5px" fontWeight="bold">
          {userCtx.user.email}
        </Box>
      </Flex>
      <Flex px="15px" pb="5px" pr="5px">
        <Icon type="book" style={{ paddingTop: "4px" }} />
        <Box px="15px" pb="5px" pr="5px" fontWeight="bold" width="80%">
          {userCtx.user.bio === null ? (
            <Box fontWeight="normal" color="#d7d7d7">
              No Bio Found
            </Box>
          ) : (
            <Box>{userCtx.user.bio}</Box>
          )}
        </Box>
      </Flex>
    </Box>
  );
};

export default ProfileCard;
