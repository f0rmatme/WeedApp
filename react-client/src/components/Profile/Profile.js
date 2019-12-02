import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import Box from "../ui/Box";
import Flex from "../ui/Flex";
import Media from "react-media";
import { Icon, Divider, Button } from "antd";
import { UserContext } from "../../context/userContext";
import { FriendContext } from "../../context/friendContext";
import DEFAULT_PROFILE from "../images/badge.png";
import EditProfile from "./EditProfileModal";
import UserPosts from "./UserPosts";
import FollowList from "./FollowList";
import { Helmet } from "react-helmet";

//const antIcon = <Icon type="loading" style={{ fontSize: 70 }} spin />;

const Profile = props => {
  const userCtx = useContext(UserContext);
  const friendCtx = useContext(FriendContext);
  const username = props.match.params.username;

  const [user, setUser] = useState({ user: {} });
  const [isFriend, setIsFriend] = useState({
    isFriend: false,
    loading: true
  });
  const [editOpen, setEditOpen] = useState(false);

  useEffect(() => {
    axios
      .get(`/api/username/${username}`, {
        headers: { Authorization: `Bearer ${userCtx.token}` }
      })
      .then(res => {
        setUser({ user: res.data });
      })
      .then(() => {
        if (userCtx.user.id !== user.user.id) {
          let is_friend = friendCtx.isFollowing(user.user.id);
          setIsFriend({
            isFriend: is_friend,
            loading: false
          });
        }
      });
  }, [friendCtx, user.user.id, userCtx.token, userCtx.user, username]);

  const changeFollowStatus = followStatus => {
    let data = {
      userId: userCtx.user.id,
      friendId: user.user.id
    };
    if (followStatus) {
      setIsFriend({
        isFriend: true,
        loading: false
      });
      axios
        .post(`/api/friend/create`, data, {
          headers: {
            Authorization: `Bearer ${userCtx.token}`
          }
        })
        .then(() => {
          friendCtx.getFollowList();
        })
        .catch(() => {
          console.log("Error while following");
        });
    } else {
      setIsFriend({
        isFriend: false,
        loading: false
      });
      axios
        .delete(`/api/friend`, {
          data: data,
          headers: {
            Authorization: `Bearer ${userCtx.token}`
          }
        })
        .then(() => {
          friendCtx.getFollowList();
        })
        .catch(() => {
          console.log("Error while unfollowing");
        });
    }
  };

  return (
    <Box>
      <Helmet>
        <title> Profile </title>
        <meta
          name="description"
          content="View your profile. Edit your profile. View other peoples profiles and follow them!"
        />
      </Helmet>
      <Media query={{ minWidth: 900 }}>
        {matches => (
          <Box>
            {!isFriend.loading && (
              <Flex backgroundColor="#F0F0F0" minHeight="100vh">
                <Box
                  width={matches ? "45%" : "90%"}
                  bg="white"
                  mt="20px"
                  borderRadius="7px"
                  ml={matches ? "19%" : "5%"}
                >
                  <Box>
                    <Flex className="BackgroundWeedImage">
                      <img
                        alt="profile"
                        src={
                          user.user.profilepic
                            ? user.user.profilepic
                            : DEFAULT_PROFILE
                        }
                        style={{
                          marginTop: "20px",
                          marginLeft: "20px",
                          display: "inline-block",
                          height: "100px",
                          width: "100px",
                          borderRadius: "50%",
                          backgroundRepeat: "no-repeat",
                          backgroundPosition: "center center",
                          backgroundSize: "cover",
                          verticalAlign: "middle"
                        }}
                      />
                      <Flex justifyContent="center">
                        <Box
                          fontSize="26px"
                          my="51px"
                          mx="30px"
                          fontWeight="bold"
                          color="#F0F0F0"
                        >
                          {user.user.username}
                        </Box>
                      </Flex>
                      {user.user.id === userCtx.user.id ? (
                        <Box my="49px" alignSelf="flex-end" ml="auto" mr="30px">
                          <Button
                            icon="edit"
                            style={{
                              color: "rgb(0,0,0,.65)",
                              backgroundColor: "#F0F0F0"
                            }}
                            onClick={() => setEditOpen(true)}
                          />
                        </Box>
                      ) : (
                        <Box my="50px" alignSelf="flex-end" ml="auto" mr="30px">
                          {!isFriend.isFriend ? (
                            <Button
                              icon="plus"
                              style={{
                                color: "rgb(0,0,0,.65)",
                                backgroundColor: "#F0F0F0"
                              }}
                              onClick={() => changeFollowStatus(true)}
                            />
                          ) : (
                            <Button
                              icon="minus"
                              style={{
                                color: "rgb(0,0,0,.65)",
                                backgroundColor: "#F0F0F0"
                              }}
                              onClick={() => changeFollowStatus(false)}
                            />
                          )}
                        </Box>
                      )}
                    </Flex>

                    {user.user.id === userCtx.user.id && (
                      <Flex pt="20px">
                        <Icon
                          type="mail"
                          style={{
                            paddingTop: "10px",
                            marginLeft: "50px",
                            fontSize: "16px"
                          }}
                        />
                        <Box pt="7px" ml="10px">
                          {user.user.email}
                        </Box>
                      </Flex>
                    )}

                    <Flex pt={user.user.id !== userCtx.user.id ? "20px" : "0"}>
                      <Icon
                        type="book"
                        style={{
                          paddingTop: "10px",
                          marginLeft: "49px",
                          fontSize: "16px"
                        }}
                      />
                      <Box pt="7px" ml="10px" mr="20px">
                        {user.user.bio
                          ? user.user.bio
                          : user.user.id === userCtx.user.id
                          ? "No Bio Found | Update Profile to Add a Bio"
                          : "No Bio Found"}
                      </Box>
                    </Flex>
                    <Flex justifyContent="center" alignItems="center">
                      <Box width="90%">
                        <Divider style={{ marginTop: "20px" }} />
                      </Box>
                    </Flex>
                    <UserPosts userId={user.user.id} />
                  </Box>
                </Box>
                {matches && (
                  <Box width="33%" padding="20px">
                    <Flex justifyContent="flex-start" position="relative">
                      <FollowList user={user} />
                    </Flex>
                  </Box>
                )}
                <EditProfile editOpen={editOpen} setEditOpen={setEditOpen} />
              </Flex>
            )}
          </Box>
        )}
      </Media>
    </Box>
  );
};

export default Profile;
