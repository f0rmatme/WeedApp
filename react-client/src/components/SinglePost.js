import React from "react";
import axios from "axios";
import { Card, Tag, Icon } from "antd";
import { getStrainColour } from "../helpers/strainColour.js";
import { ButtonLike } from "./ui/Button";
import Box from "./ui/Box";
import Flex from "./ui/Flex";
import { UserContext } from "../context/userContext";

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

const SinglePost = props => {
  const post = props.post;

  const userCtx = React.useContext(UserContext);

  const getRandomColour = () => {
    //return colours[Math.floor(Math.random() * Math.floor(11))];
    return "";
  };

  const processTags = tags => {
    return tags.split(",");
  };

  const handleLike = postId => {
    axios
      .post(
        "/like",
        {
          postId: postId,
          userId: userCtx.user.id
        },
        {
          headers: {
            Authorization: `Bearer ${userCtx.token}`
          }
        }
      )
      .then(res => {
        if (res.data === "Comment has been unliked") {
          props.addLike(res, post.id, "remove");
        } else {
          props.addLike(res.data, post.id, "add");
        }
      });
  };

  const handleComment = () => {
    console.log("Commenting on Post");
  };

  return (
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
                    fontSize: "16px",
                    fontWeight: "normal"
                  }}
                >
                  {post.weed.strain}
                </Tag>
              </Box>
              <Flex flexWrap="wrap" mb="20px">
                <Icon type="tags" style={{ padding: "4px" }} />
                {processTags(post.tags).map((tag, key) => {
                  return (
                    <Tag key={key} color={getRandomColour()}>
                      {tag}
                    </Tag>
                  );
                })}
              </Flex>
              <Box mb="20px">{post.content}</Box>
            </Box>
          </Flex>
        </Box>
      }
      style={{
        width: "90%"
      }}
    >
      <Flex justifyContent="flex-start" mb="10px" fontSize="12px">
        {post.likes.length === 1 ? (
          <Box>
            Liked by <b>{post.likes.length} person</b>
          </Box>
        ) : (
          <Box>
            Liked by <b>{post.likes.length} people</b>
          </Box>
        )}
      </Flex>
      <Flex justifyContent="center" mb="10px">
        <ButtonLike
          bg="transparent"
          mr="10px"
          onClick={() => handleLike(post.id)}
        >
          Like
        </ButtonLike>
        <ButtonLike bg="transparent" ml="10px" onClick={handleComment}>
          Comment
        </ButtonLike>
      </Flex>
      <Flex>
        <Box
          width="100%"
          border="1px solid black"
          height="200px"
          borderRadius="3px"
        ></Box>
      </Flex>
    </Card>
  );
};

export default SinglePost;
