import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import Box from "./ui/Box";
import Flex from "./ui/Flex";
import Media from "react-media";
import { Spin, Icon, Divider } from "antd";
import { UserContext } from "../context/userContext";
import DEFAULT_PROFILE from "../components/images/toketalk_3d_badge.PNG";

const antIcon = <Icon type="loading" style={{ fontSize: 70 }} spin />;

const Profile = props => {
  const userCtx = useContext(UserContext);
  const username = props.match.params.username;

  const [user, setUser] = useState({ user: [], loading: true });

  useEffect(() => {
    axios
      .get(`/username/${username}`, {
        headers: { Authorization: `Bearer ${userCtx.token}` }
      })
      .then(res => {
        setUser({ user: res.data, loading: false });
      });
  }, []);

  return (
    <Box>
      <Media query={{ minWidth: 900 }}>
        {matches => (
          <Flex backgroundColor="#F0F0F0" minHeight="100vh">
            <Box
              width={matches ? "40%" : "90%"}
              bg="white"
              mt="20px"
              borderRadius="3px"
              ml={matches ? "28%" : "5%"}
            >
              {user.loading ? (
                <Flex width="100%" justifyContent="center" mt="20%">
                  <Spin indicator={antIcon} size="large" />
                </Flex>
              ) : (
                <Box>
                  <Flex>
                    <img
                      alt="profile picture"
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
                      <Box fontSize="24px" my="48px">
                        {user.user.username}
                      </Box>
                    </Flex>
                  </Flex>
                  <Flex justifyContent="center" alignItems="center">
                    <Box width="90%">
                      <Divider style={{ marginTop: "10px" }} />
                    </Box>
                  </Flex>
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
                    <Box>
                      <Icon type="book" style={{ paddingTop: "10px" }} />
                    </Box>
                  </Flex>
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
