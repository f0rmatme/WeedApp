import React, { useContext } from "react";
import Box from "../ui/Box";
import Flex from "../ui/Flex";
import { Tabs } from "antd";
import { FriendContext } from "../../context/friendContext";
import DEFAULT_PROFILE from "../images/badge.png";

const { TabPane } = Tabs;

const FollowList = () => {
  const friendCtx = useContext(FriendContext);

  return (
    <Box width="350px" bg="white" height="100%" borderRadius="7px">
      <Tabs defaultActiveKey="1">
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
                {friendCtx.followList.followers.length}
              </Box>
              <Box p="5px">Followers</Box>
            </Flex>
          }
          key="1"
        >
          {friendCtx.followList.followers.map(user => (
            <Flex my="5px" mx="10px">
              <Box>
                <img
                  alt="profile"
                  src={DEFAULT_PROFILE}
                  style={{ height: "25px", width: "25px" }}
                />
              </Box>
              <Box pt="2px" px="5px">
                {user.follower.username}
              </Box>
            </Flex>
          ))}
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
                {friendCtx.followList.following.length}
              </Box>
              <Box p="5px">Following</Box>
            </Flex>
          }
          key="2"
        >
          <Box p="10px">
            {friendCtx.followList.following.map(user => (
              <Flex my="5px" mx="10px">
                <Box>
                  <img
                    alt="profile"
                    src={DEFAULT_PROFILE}
                    style={{ height: "25px", width: "25px" }}
                  />
                </Box>
                <Box pt="2px" px="5px">
                  {user.following.username}
                </Box>
              </Flex>
            ))}
          </Box>
        </TabPane>
      </Tabs>
    </Box>
  );
};

export default FollowList;
