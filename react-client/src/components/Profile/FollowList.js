import React, { useContext } from "react";
import Box from "../ui/Box";
import { Tabs } from "antd";
import { FriendContext } from "../../context/friendContext";

const { TabPane } = Tabs;

const FollowList = props => {
  const friendCtx = useContext(FriendContext);

  return (
    <Box width="350px" bg="white" height="100%" borderRadius="7px">
      <Tabs defaultActiveKey="1">
        <TabPane tab={<Box p="5px">Followers</Box>} key="1">
          <Box p="10px">Followers List</Box>
        </TabPane>
        <TabPane tab={<Box p="5px">Following</Box>} key="2">
          <Box p="10px">Following List</Box>
        </TabPane>
      </Tabs>
    </Box>
  );
};

export default FollowList;
