import React, { useState, useContext, useEffect, useRef } from "react";
import axios from "axios";
import { Card, Tag, Icon } from "antd";
import { getStrainColour } from "../helpers/strainColour.js";
import { ButtonLike } from "./ui/Button";
import Box from "./ui/Box";
import Flex from "./ui/Flex";
import { InputComment } from "./ui/Input";
import { UserContext } from "../context/userContext";
import { css } from "emotion";
import INDICA from "../components/images/noword_indica_transback.png";
import HYBRID from "../components/images/noword_hybrid_transback.png";
import SATIVA from "../components/images/noword_sativa_transback.png";
import DEFAULT_PROFILE from "../components/images/toketalk_3d_badge.PNG";

const SinglePost = props => {
  const post = props.post;
  const [commentsVisible, setCommentsVisible] = useState(false);
  const [makeComment, setMakeComment] = useState(false);
  const [comment, setComment] = useState("");

  const userCtx = useContext(UserContext);

  const getRandomColour = () => {
    //return colours[Math.floor(Math.random() * Math.floor(11))];
    return "";
  };

  const processTags = tags => {
    return tags.split(",");
  };

  const submitComment = postId => {
    axios
      .post(
        "/comment",
        {
          postId: postId,
          userId: userCtx.user.id,
          name: userCtx.user.username,
          comment: comment
        },
        {
          headers: {
            Authorization: `Bearer ${userCtx.token}`
          }
        }
      )
      .then(res => {
        setComment("");
        props.addComment(res.data);
      });
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
        if (res.data === "Post has been unliked") {
          props.addLike(res, post.id, "remove");
        } else {
          props.addLike(res.data, post.id, "add");
        }
      });
  };

  const handleComment = () => {
    console.log("Commenting on Post");
    if (makeComment) {
      setCommentsVisible(false);
      setMakeComment(false);
    } else {
      setCommentsVisible(true);
      setMakeComment(true);
    }
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
              onError={
                (e) => {
                  e.target.onerror = null;
                  switch(post.weed.strain){
                    case "Indica":
                      e.target.src = INDICA;
                      break;
                    case "Sativa":
                      e.target.src = SATIVA;
                      break;
                    default:
                      e.target.src = HYBRID;
                  }
                }
              }
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
          <Box mr="5px">
            Liked by <b>{post.likes.length} person</b>
          </Box>
        ) : (
          <Box mr="5px">
            Liked by <b>{post.likes.length} people</b>
          </Box>
        )}
        {post.comments.length > 0 && (
          <Flex>
            <span
              style={{
                height: "5px",
                width: "5px",
                backgroundColor: "#747474",
                borderRadius: "50%",
                display: "inline-block",
                marginTop: "6px"
              }}
            />
            {commentsVisible ? (
              <Box
                className={css`
                  &:hover {
                    cursor: pointer;
                  }
                `}
                onClick={() => setCommentsVisible(false)}
                ml="5px"
              >
                Hide Comments
              </Box>
            ) : (
              <Box
                className={css`
                  &:hover {
                    cursor: pointer;
                  }
                `}
                onClick={() => setCommentsVisible(true)}
                ml="5px"
              >
                Show Comments
              </Box>
            )}
          </Flex>
        )}
      </Flex>
      <Flex justifyContent="flex-start" mb="10px">
        <ButtonLike
          mr="5px"
          bg="transparent"
          onClick={() => handleLike(post.id)}
        >
          <Icon type="like" />
        </ButtonLike>
        <ButtonLike bg="transparent" onClick={handleComment}>
          <Icon type="message" />
        </ButtonLike>
      </Flex>
      {commentsVisible && post.comments.length > 0 && (
        <Flex fontSize="12px" mb="5px">
          <Box width="100%">
            <Flex flexDirection="column">
              {post.comments.map((comment, key) => {
                return (
                  <Flex key={key} pl="5px" pr="5px" pb="5px">
                    {/*TODO: MAYBE PUT IN SOME PROFILE PICTURES LATER */}
                    <Box mr="5px" p="2px">
                      <b>{comment.name} </b>
                    </Box>
                    <Box bg="#E7E7E7" px="5px" py="2px" borderRadius="10px">
                      {comment.comment}
                    </Box>
                  </Flex>
                );
              })}
            </Flex>
          </Box>
        </Flex>
      )}
      {makeComment && (
        <Box position="relative">
          <InputComment
            placeholder="Make a comment"
            value={comment}
            pl="35px"
            py="5px"
            pr="10px"
            onChange={e => setComment(e.target.value)}
            onKeyDown={e => {
              if (e.keyCode === 13) {
                e.preventDefault();
                submitComment(post.id);
              }
            }}
          />
          <img
            alt="profile"
            style={{
              borderRadius: "50%",
              height: "20px",
              left: "0",
              marginLeft: "10px",
              marginTop: "6px",
              width: "20px",
              position: "absolute"
            }}
            src={userCtx.user.picture}
          />
        </Box>
      )}
    </Card>
  );
};

export default SinglePost;
