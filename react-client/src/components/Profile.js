import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import Box from "./ui/Box";
import Flex from "./ui/Flex";
import Media from "react-media";
import { Spin, Icon, Divider, Button, Modal } from "antd";
import { UserContext } from "../context/userContext";
import { FriendContext } from "../context/friendContext";
import EditProfile from "./EditProfileModal";
import { ButtonCancel, ButtonSubmit } from "./ui/Button";
import DEFAULT_PROFILE from "../components/images/toketalk_3d_badge.PNG";

const antIcon = <Icon type="loading" style={{ fontSize: 70 }} spin />;

const Profile = props => {
  const userCtx = useContext(UserContext);
  const friendCtx = useContext(FriendContext);
  const username = props.match.params.username;

  const [user, setUser] = useState({ user: {} });
  const [loading, setLoading] = useState(true);
  const [friends, setFriends] = useState({
    following: 0,
    followers: 0,
    isFriend: false
  });
  const [editOpen, setEditOpen] = useState(false);

  const [bio, setBio] = useState("");
  const [newusername, setUsername] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    axios
      .get(`/username/${username}`, {
        headers: { Authorization: `Bearer ${userCtx.token}` }
      })
      .then(res => {
        setUser({ user: res.data });
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userCtx.user, username]);

  useEffect(() => {
    if (friendCtx.friends.length > 0) {
      axios
        .get(`/api/friends/count/${user.user.id}`, {
          headers: {
            Authorization: `Bearer ${userCtx.token}`
          }
        })
        .then(res => {
          setFriends({
            following: res.data.following,
            followers: res.data.followers,
            isFriend: friendCtx.isFriend(user.user.id)
          });
          setLoading(false);
        });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const followFriend = () => {
    console.log("Added");
  };

  const unfollowFriend = () => {
    console.log("Added");
  };

  const handleOk = () => {
    userCtx.updateProfile(newusername, email, bio);
    userCtx.reloadUserInfo(userCtx.user);
    setEditOpen(false);
  };

  const handleCancel = () => {
    setEditOpen(false);
  };

  const handleBio = e => {
    setBio(e.target.value);
  };

  const handleEmail = e => {
    setEmail(e.target.value);
  };

  const handleUsername = e => {
    setUsername(e.target.value);
  };

  return (
    <Box>
      <Media query={{ minWidth: 900 }}>
        {matches => (
          <Flex backgroundColor="#F0F0F0" minHeight="100vh">
            <Box
              width={matches ? "40%" : "90%"}
              bg="white"
              mt="20px"
              borderRadius="7px"
              ml={matches ? "28%" : "5%"}
            >
              {loading ? (
                <Flex width="100%" justifyContent="center" mt="20%">
                  <Spin indicator={antIcon} size="large" />
                </Flex>
              ) : (
                <Box>
                  <Flex>
                    <img
                      alt="profile"
                      src={
                        user.user.profilepic
                          ? user.user.profilepic
                          : DEFAULT_PROFILE
                      }
                      style={{
                        margin: "20px",
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
                    <Flex>
                      <Box fontSize="24px" my="50px" mx="30px">
                        {user.user.username}
                      </Box>
                    </Flex>
                    {user.user.id === userCtx.user.id ? (
                      <Box my="50px" alignSelf="flex-end" ml="auto" mr="30px">
                        <Button
                          icon="edit"
                          ghost
                          style={{ color: "#9DA077", borderColor: "#9DA077" }}
                          onClick={() => setEditOpen(true)}
                        />
                      </Box>
                    ) : (
                      <Box my="50px" alignSelf="flex-end" ml="auto" mr="30px">
                        {!friends.isFriend ? (
                          <Button
                            icon="plus"
                            ghost
                            style={{ color: "#9DA077", borderColor: "#9DA077" }}
                            onClick={followFriend}
                          />
                        ) : (
                          <Button
                            icon="minus"
                            ghost
                            style={{ color: "#9DA077", borderColor: "#9DA077" }}
                            onClick={unfollowFriend}
                          />
                        )}
                      </Box>
                    )}
                  </Flex>
                  <Flex justifyContent="center" alignItems="center">
                    <Box width="90%">
                      <Divider style={{ marginTop: "10px" }} />
                    </Box>
                  </Flex>

                  {user.user.id === userCtx.user.id && (
                    <Flex>
                      <Icon
                        type="mail"
                        style={{
                          paddingTop: "10px",
                          marginLeft: "20px",
                          fontSize: "16px"
                        }}
                      />
                      <Box pt="7px" ml="10px">
                        {user.user.email}
                      </Box>
                    </Flex>
                  )}

                  <Flex>
                    <Icon
                      type="book"
                      style={{
                        paddingTop: "10px",
                        marginLeft: "20px",
                        fontSize: "16px"
                      }}
                    />
                    <Box pt="7px" ml="10px" mr="20px">
                      {user.user.bio
                        ? user.user.bio
                        : "No Bio Found | Update Profile to Add a Bio"}
                    </Box>
                  </Flex>
                  {/*STATS FOR ACCOUNT*/}
                  <Flex m="20px" mt="20px">
                    <Box
                      py="5px"
                      px="10px"
                      border="1px solid #9DA077"
                      backgroundColor="#ebece4"
                      borderRadius="12px"
                      fontWeight="bold"
                      mr="5px"
                    >
                      {friends.followers}
                    </Box>
                    <Box py="5px" mr="20px">
                      Followers
                    </Box>
                    <Box
                      py="5px"
                      px="10px"
                      border="1px solid #9DA077"
                      backgroundColor="#ebece4"
                      borderRadius="12px"
                      fontWeight="bold"
                      mr="5px"
                    >
                      {friends.following}
                    </Box>
                    <Box py="5px" mr="20px">
                      Following
                    </Box>
                  </Flex>
                  <Flex justifyContent="center" alignItems="center">
                    <Box width="90%">
                      <Divider style={{ marginTop: "10px" }} />
                    </Box>
                  </Flex>
                  <Modal
                    title="Edit Profile Information"
                    visible={editOpen}
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
                        Post
                      </ButtonSubmit>
                    ]}
                  >
                    <EditProfile
                      username={newusername}
                      handleUsername={handleUsername}
                      bio={bio}
                      handleBio={handleBio}
                      email={email}
                      handleEmail={handleEmail}
                    />
                  </Modal>
                </Box>
              )}
            </Box>
          </Flex>
        )}
      </Media>
    </Box>
  );
};

export default Profile;
