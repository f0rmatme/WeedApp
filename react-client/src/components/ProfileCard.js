import React from "react";
import axios from "axios";
import { css } from "emotion";
import Box from "./ui/Box";
import Flex from "./ui/Flex";
import { withRouter } from "react-router-dom";
import { Divider, Icon } from "antd";
import DEFAULT_PROFILE from "../components/images/toketalk_3d_badge.PNG";
import { UserContext } from "../context/userContext";

const ProfileCard = props => {
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

  const handleUsernameClick = () => {
    props.history.push(`/profile/${userCtx.user.username}`);
  };

  return (
    <Box
      position="fixed"
      width="350px"
      height="300px"
      bg="white"
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
          className={css`
            &:hover {
              cursor: pointer;
              -webkit-filter: brightness(70%);
              -webkit-transition: all 0.3s ease;
              -moz-transition: all 0.3s ease;
              -o-transition: all 0.3s ease;
              -ms-transition: all 0.3s ease;
              transition: all 0.3s ease;
            }
          `}
          onClick={() => handleUsernameClick()}
          src={
            userCtx.user.profilepic ? userCtx.user.profilepic : DEFAULT_PROFILE
          }
        />
        <Box
          pl="3px"
          pr="7px"
          pt="10px"
          fontWeight="bold"
          fontSize="22px"
          onClick={() => handleUsernameClick()}
          className={css`
            border-bottom: 1px solid transparent;
            transition: border-color 0.3s ease-in;
            &:hover {
              cursor: pointer;
              border-bottom: 1px solid;
            }
          `}
        >
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

export default withRouter(ProfileCard);
