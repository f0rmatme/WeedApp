import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Box from "../ui/Box";
import Flex from "../ui/Flex";
import SinglePost from "../SinglePost";
import { Divider } from "antd";
import { UserContext } from "../../context/userContext";

const UserPosts = props => {
  const userCtx = useContext(UserContext);

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get(`/api/posts/user/${props.userId}`, {
        headers: { Authorization: `Bearer ${userCtx.token}` }
      })
      .then(res => {
        setPosts(res.data);
      });
  }, [props.userId, userCtx.token]);

  return (
    <Flex flexDirection="column" justifyContent="center">
      {posts.map((post, key) => {
        return (
          <Box key={key}>
            <Flex
              flexDirection="row"
              justifyContent="center"
              alignItems="center"
            >
              <SinglePost post={post} hide={true} />
            </Flex>
            <Flex justifyContent="center" alignItems="center">
              <Box width="90%">
                <Divider style={{ margin: "10px" }} />
              </Box>
            </Flex>
          </Box>
        );
      })}
    </Flex>
  );
};

export default UserPosts;
