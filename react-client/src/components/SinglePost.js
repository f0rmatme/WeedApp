import React from "react";
import { Card, Tag } from "antd";
import { getStrainColour } from "../helpers/strainColour.js";
import Box from "./ui/Box";
import Flex from "./ui/Flex";

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

  const getRandomColour = () => {
    return colours[Math.floor(Math.random() * Math.floor(11))];
  };

  const processTags = tags => {
    return tags.split(",");
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
      <Flex flexWrap="wrap">
        {processTags(post.tags).map((tag, key) => {
          return (
            <Tag key={key} color={getRandomColour()}>
              {tag}
            </Tag>
          );
        })}
      </Flex>
    </Card>
  );
};

export default SinglePost;
