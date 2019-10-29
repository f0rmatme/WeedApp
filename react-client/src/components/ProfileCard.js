import React from "react";
import axios from "axios";
import Box from "./ui/Box";
import Flex from "./ui/Flex";
import { Divider, Icon } from "antd";
import DEFAULT_PROFILE from "../components/images/toketalk_3d_badge.PNG";

import { UserContext } from "../context/userContext";

const ProfileCard = () => {
  const userCtx = React.useContext(UserContext);

  const [friends, setFriends] = React.useState({ following: 0, followers: 0 });

  React.useEffect(() => {
    if (userCtx.user) {
      axios
        .get(`/api/friends/count/${userCtx.user.id}`, {
          headers: {
            Authorization: `Bearer ${userCtx.token}`
          }
        })
        .then(res => {
          setFriends(res.data);
        });
    }
  }, [userCtx.token, userCtx.user]);

  return (
    <Box
      position="fixed"
      width="350px"
      height="300px"
      backgroundColor="white"
      borderRadius="7px"
    >
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
          src={
            userCtx.user.profilepic ? userCtx.user.profilepic : DEFAULT_PROFILE
          }
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
      <Flex px="15px" pb="5px" pr="5px">
        <Box fontWeight="bold" pr="15px">
          Following
        </Box>
        <Icon type="arrow-right" style={{ paddingTop: "4px" }} />
        <Box px="15px" pb="5px" pr="5px" fontWeight="bold" width="80%">
          {friends.following}
        </Box>
      </Flex>
      <Flex px="15px" pb="5px" pr="5px">
        <Box fontWeight="bold" pr="15px">
          Followers
        </Box>
        <Icon type="arrow-left" style={{ paddingTop: "4px" }} />
        <Box px="15px" pb="5px" pr="5px" fontWeight="bold" width="80%">
          {friends.followers}
        </Box>
      </Flex>
    </Box>
  );
};

export default ProfileCard;
