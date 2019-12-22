import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import Box from "../ui/Box";
import Flex from "../ui/Flex";
import { Tabs } from "antd";
import { FriendContext } from "../../context/friendContext";
import DEFAULT_PROFILE from "../images/badgeVersionGreen.png";
import { UserContext } from "../../context/userContext";

const { TabPane } = Tabs;

const FollowList = props => {
  const friendCtx = useContext(FriendContext);
  const userCtx = useContext(UserContext);

  const { user } = props.user;

  const [usersFollowList, setUsersFollowList] = useState({
    following: [],
    followers: [],
    loading: true
  });

  useEffect(() => {
    if (userCtx.user.id !== user.id) {
      axios
        .get(`/api/friends/list/${user.id}`, {
          headers: { Authorization: `Bearer ${userCtx.token}` }
        })
        .then(res => {
          setUsersFollowList({
            following: res.data.following,
            followers: res.data.followers,
            loading: false
          });
        });
    }
    //eslint-disable-next-line
  }, [props.user, userCtx.token, userCtx.user]);

  return (
    <Box width="350px" bg="white" height="100%" borderRadius="7px">
      {!usersFollowList.loading && (
        <Tabs defaultActiveKey="1" tabBarStyle={{ width: "100%" }}>
          <TabPane
            tab={
              <Flex>
                <Box
                  py="5px"
                  px="10px"
                  border="1px solid #9DA077"
                  backgroundColor="#ebece4"
                  borderRadius="12px"
                  fontWeight="bold"
                  mr="5px"
                >
                  {userCtx.user.id !== user.id ? (
                    <Box>{usersFollowList.followers.length}</Box>
                  ) : (
                    <Box>{friendCtx.followList.followers.length}</Box>
                  )}
                </Box>
                <Box p="5px">Followers</Box>
              </Flex>
            }
            key="1"
          >
            <Box>
              {userCtx.user.id !== user.id ? (
                <Box>
                  {usersFollowList.followers.map((user, key) => (
                    <Flex my="5px" mx="10px" key={key}>
                      <Box>
                        <img
                          alt="profile"
                          src={
                            user.follower.profilepic
                              ? user.follower.profilepic
                              : DEFAULT_PROFILE
                          }
                          style={{
                            height: "25px",
                            width: "25px",
                            borderRadius: "50%"
                          }}
                        />
                      </Box>
                      <Box pt="2px" px="5px">
                        {user.follower.username}
                      </Box>
                    </Flex>
                  ))}
                </Box>
              ) : (
                <Box>
                  {friendCtx.followList.followers.map((user, key) => (
                    <Flex my="5px" mx="10px" key={key}>
                      <Box>
                        <img
                          alt="profile"
                          src={
                            user.follower.profilepic
                              ? user.follower.profilepic
                              : DEFAULT_PROFILE
                          }
                          style={{ height: "25px", width: "25px", borderRadius: "50%" }}
                        />
                      </Box>
                      <Box pt="2px" px="5px">
                        {user.follower.username}
                      </Box>
                    </Flex>
                  ))}
                </Box>
              )}
            </Box>
          </TabPane>
          <TabPane
            tab={
              <Flex>
                <Box
                  py="5px"
                  px="10px"
                  border="1px solid #9DA077"
                  backgroundColor="#ebece4"
                  borderRadius="12px"
                  fontWeight="bold"
                  mr="5px"
                >
                  {userCtx.user.id !== user.id ? (
                    <Box>{usersFollowList.following.length}</Box>
                  ) : (
                    <Box>{friendCtx.followList.following.length}</Box>
                  )}
                </Box>
                <Box p="5px">Following</Box>
              </Flex>
            }
            key="2"
          >
            <Box>
              {userCtx.user.id !== user.id ? (
                <Box>
                  {usersFollowList.following.map((user, key) => (
                    <Flex my="5px" mx="10px" key={key}>
                      <Box>
                        <img
                          alt="profile"
                          src={
                            user.following.profilepic
                              ? user.following.profilepic
                              : DEFAULT_PROFILE
                          }
                          style={{
                            height: "25px",
                            width: "25px",
                            borderRadius: "50%"
                          }}
                        />
                      </Box>
                      <Box pt="2px" px="5px">
                        {user.following.username}
                      </Box>
                    </Flex>
                  ))}
                </Box>
              ) : (
                <Box>
                  {friendCtx.followList.following.map((user, key) => (
                    <Flex my="5px" mx="10px" key={key}>
                      <Box>
                        <img
                          alt="profile"
                          src={
                            user.following.profilepic
                              ? user.following.profilepic
                              : DEFAULT_PROFILE
                          }
                          style={{ height: "25px", width: "25px", borderRadius: "50%" }}
                        />
                      </Box>
                      <Box pt="2px" px="5px">
                        {user.following.username}
                      </Box>
                    </Flex>
                  ))}
                </Box>
              )}
            </Box>
          </TabPane>
        </Tabs>
      )}
    </Box>
  );
};

export default FollowList;
