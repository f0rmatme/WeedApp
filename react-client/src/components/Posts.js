import React from "react";
import axios from "axios";
import PostForm from "./PostForm";
import { Button, Card, Tag, Spin, Icon, Divider } from "antd";
import Box from "./ui/Box";
import Flex from "./ui/Flex";
import { UserContext } from "../context/userContext";
import { getStrainColour } from "../helpers/strainColour.js";

const colours = [
  "magenta",
  "red",
  "volcano",
  "orange",
  "gold",
  "lime",
  "green",
  "cyan",
  "blue",
  "geekblue",
  "purple"
];

const antIcon = <Icon type="loading" style={{ fontSize: 70 }} spin />;

const Posts = props => {
  const [{ posts, loading }, setPosts] = React.useState({
    posts: [],
    loading: true
  });

  const userCtx = React.useContext(UserContext);
  console.log(userCtx);

  React.useEffect(() => {
    axios
      .get("http://localhost:3000/posts", {
        headers: { Authorization: `Bearer ${props.at}` }
      })
      .then(res => {
        setPosts({ posts: res.data, loading: false });
      })
      .catch(err => {
        console.log("YOU GOT AN ERROR NEIGHBOUR");
      });
  }, []);

  const getRandomColour = () => {
    return colours[Math.floor(Math.random() * Math.floor(11))];
  };

  const processTags = tags => {
    return tags.split(",");
  };

  return (
    <Flex backgroundColor="#f5f2e8" minHeight="100vh">
      <Box width="22%"> </Box>
      <Box width="52%" bg="white" mt="10px" borderRadius="3px">
        <Box fontWeight="bold" fontSize="14px" p="5%" pt="20px" pb="0px">
          Newest Posts
        </Box>
        <Flex justifyContent="center" alignItems="center">
          <Box width="90%">
            <Divider />
          </Box>
        </Flex>
        {!loading ? (
          posts.map((post, key) => {
            return (
              <Box key={key}>
                <Flex
                  flexDirection="column"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Card
                    bordered={false}
                    hoverable={false}
                    cover={
                      <Box>
                        <Flex>
                          <img
                            alt="profile"
                            style={{
                              borderRadius: "50%",
                              height: "25px",
                              width: "25px",
                              margin: "5px"
                            }}
                            src={post.user.profilepic}
                          />
                          <Box m="5px" fontWeight="bold" fontSize="16px">
                            {post.user.username}
                          </Box>
                        </Flex>
                        <Flex flexDirection="row">
                          <img
                            alt="weed"
                            src={post.weed.pictureUrl}
                            style={{ width: "20%", margin: "10px" }}
                          />
                          <Box mt="25px">
                            <Box fontWeight="bold" pb="15px" fontSize="16px">
                              {post.weed.weedName}
                              <Tag
                                color={getStrainColour(post.weed.strain)}
                                style={{
                                  marginLeft: "10px",
                                  fontSize: "12px",
                                  fontWeight: "normal"
                                }}
                              >
                                {post.weed.strain}
                              </Tag>
                            </Box>
                            <Box>{post.content}</Box>
                          </Box>
                        </Flex>
                      </Box>
                    }
                    style={{
                      width: "90%"
                    }}
                  >
                    <Flex>
                      {processTags(post.tags).map((tag, key) => {
                        return (
                          <Tag key={key} color={getRandomColour()}>
                            {tag}
                          </Tag>
                        );
                      })}
                    </Flex>
                  </Card>
                </Flex>
                <Flex justifyContent="center" alignItems="center">
                  <Box width="90%">
                    <Divider />
                  </Box>
                </Flex>
              </Box>
            );
          })
        ) : (
          <Flex width="100%" justifyContent="center" mt="20%">
            <Spin indicator={antIcon} size="large" />
          </Flex>
        )}
      </Box>
      <Box width="26%" padding="10px">
        <Flex justifyContent="center" alignItems="center" position="relative">
          <Box
            width="80%"
            height="300px"
            backgroundColor="white"
            borderRadius="3px"
          >
            <Flex>
              <img
                alt="profile"
                style={{
                  borderRadius: "50%",
                  height: "50px",
                  width: "50px",
                  margin: "5px"
                }}
                src={userCtx.user.picture}
              />
              <Box m="5px" mt="15px" fontWeight="bold" fontSize="18px">
                {userCtx.user.username}
              </Box>
            </Flex>
            <Flex justifyContent="center" alignItems="center">
              <Box width="90%">
                <Divider />
              </Box>
            </Flex>
            <Box px="15px" pb="5px" pr="5px">
              email
            </Box>
            <Box px="15px" pb="5px" pr="5px" fontWeight="bold">
              {userCtx.user.email}
            </Box>
            <Box px="15px" py="5px" pr="5px">
              bio
            </Box>
            <Box px="15px" pb="5px" pr="5px" fontWeight="bold" width="80%">
              {userCtx.user.bio}
            </Box>
          </Box>
        </Flex>
      </Box>
    </Flex>
  );
};

export default Posts;
