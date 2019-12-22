import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Box from "../ui/Box";
import Flex from "../ui/Flex";
import SinglePost from "../SinglePost";
import { Divider, Spin, Icon } from "antd";
import { UserContext } from "../../context/userContext";

const antIcon = <Icon type="loading" style={{ fontSize: 70 }} spin />;

const UserPosts = props => {
  const userCtx = useContext(UserContext);

  const [{ posts, loading }, setPosts] = useState({ posts: [], loading: true });

  useEffect(() => {
    axios
      .get(`/api/posts/user/${props.userId}`, {
        headers: { Authorization: `Bearer ${userCtx.token}` }
      })
      .then(res => {
        setPosts({ posts: res.data, loading: false });
      });
  }, [props.userId, userCtx.token]);

  return (
    <Flex flexDirection="column" justifyContent="center">
      <Box>
        {!loading ? (
          <Box>
            {posts.length > 0 ? (
              posts.map((post, key) => {
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
                      <Box width="100%">
                        <Divider style={{ marginTop: "10px" }} />
                      </Box>
                    </Flex>
                  </Box>
                );
              })
            ) : (
              <Flex justifyContent="center">
                <Box>This user has not made any posts!</Box>
                <Icon
                  type="frown"
                  style={{ paddingTop: "3px", paddingLeft: "5px" }}
                />
              </Flex>
            )}
          </Box>
        ) : (
          <Flex width="100%" justifyContent="center" mt="20%">
            <Spin indicator={antIcon} size="large" />
          </Flex>
        )}
      </Box>
    </Flex>
  );
};

export default UserPosts;
