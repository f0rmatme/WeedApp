import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Spin, Icon, Divider, Modal } from "antd";
import { ButtonPost } from "./ui/Button";
import Box from "./ui/Box";
import Flex from "./ui/Flex";
import { UserContext } from "../context/userContext";
import ProfileCard from "./ProfileCard";
import Media from "react-media";
import SinglePost from "./SinglePost";
import PostForm from "./PostForm";

const antIcon = <Icon type="loading" style={{ fontSize: 70 }} spin />;

const Posts = props => {
  const [{ posts, loading }, setPosts] = useState({
    posts: [],
    loading: true
  });

  const [visible, setVisible] = useState(false);

  const [value, setValue] = useState([]);
  const [tags, setTags] = useState("");
  const [content, setContent] = useState("");

  const userCtx = useContext(UserContext);

  useEffect(() => {
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

  const handleCancel = () => {
    setVisible(false);
  };

  const handleOk = () => {
    console.log("Submit the post");
    console.log(tags);
    axios
      .post(
        "http://localhost:3000/posts",
        {
          userId: userCtx.user.id,
          weedId: parseInt(value.key),
          content,
          tags: tags.toString()
        },
        {
          headers: { Authorization: `Bearer ${props.at}` }
        }
      )
      .then(() => setVisible(false));
  };

  return (
    <Box>
      <Media query={{ minWidth: 900 }}>
        {matches => (
          <Flex backgroundColor="#f5f2e8" minHeight="100vh">
            <Box
              width={matches ? "45%" : "90%"}
              bg="white"
              mt="20px"
              borderRadius="3px"
              ml={matches ? "22%" : "5%"}
            >
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
                        <SinglePost post={post} />
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
              <ButtonPost onClick={() => setVisible(true)}>
                <Flex>
                  <Icon
                    type="form"
                    style={
                      matches
                        ? { paddingTop: "4px", paddingRight: "5px" }
                        : { paddingTop: "0px" }
                    }
                  />
                  {matches && <Box>New Post</Box>}
                </Flex>
              </ButtonPost>
              <Modal
                title="New Post"
                visible={visible}
                onCancel={handleCancel}
                onOk={handleOk}
              >
                <PostForm
                  setValue={setValue}
                  value={value}
                  setTags={setTags}
                  setContent={setContent}
                />
              </Modal>
            </Box>

            {matches && (
              <Box width="33%" padding="20px">
                <Flex justifyContent="flex-start" position="relative">
                  <ProfileCard />
                </Flex>
              </Box>
            )}
          </Flex>
        )}
      </Media>
    </Box>
  );
};

export default Posts;
