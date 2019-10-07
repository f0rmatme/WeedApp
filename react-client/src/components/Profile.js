import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import Box from "./ui/Box";
import Flex from "./ui/Flex";
import Media from "react-media";
import { Spin, Icon, Divider } from "antd";
import { UserContext } from "../context/userContext";
import DEFAULT_PROFILE from "../components/images/toketalk_3d_badge.PNG";

const Profile = props => {
  const userCtx = useContext(UserContext);
  const username = props.match.params.username;

  const [user, setUser] = useState({});

  useEffect(() => {
    axios
      .get(`/username/${username}`, {
        headers: { Authorization: `Bearer ${userCtx.token}` }
      })
      .then(res => {
        setUser(res.data);
      });
  }, []);

  return (
    <Box>
      <Media query={{ minWidth: 900 }}>
        {matches => (
          <Flex backgroundColor="#F0F0F0" minHeight="100vh">
            <Box
              width={matches ? "45%" : "90%"}
              bg="white"
              mt="20px"
              borderRadius="3px"
              ml={matches ? "22%" : "5%"}
            >
              <img
                alt="profile picture"
                src={user.profilepic ? user.profilepic : DEFAULT_PROFILE}
                style={{
                  margin: "20px",
                  display: "inline-block",
                  height: "150px",
                  width: "150px",
                  borderRadius: "50%",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center center",
                  backgroundSize: "cover",
                  verticalAlign: "middle"
                }}
              />
            </Box>
          </Flex>
        )}
      </Media>
    </Box>
  );
};

export default Profile;
