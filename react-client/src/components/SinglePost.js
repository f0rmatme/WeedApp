import React, { useState, useContext } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
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
import DEFAULT_PROFILE from "../components/images/badge.png";

const SinglePost = props => {
  const post = props.post;
  let likeColour = true;
  if (props.hide) {
    likeColour = false;
  } else {
    likeColour = props.isLiked(post.id);
  }
  const [commentsVisible, setCommentsVisible] = useState(false);
  const [makeComment, setMakeComment] = useState(false);
  const [comment, setComment] = useState("");

  const userCtx = useContext(UserContext);

  const processTags = tags => {
    return tags.split(",");
  };

  const handleProfile = () => {
    props.history.push(`/profile/${post.user.username}`);
  };

  const submitComment = postId => {
    axios
      .post(
        "/api/comment",
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
    if (!likeColour) {
      props.addLike(
        {
          id: -1,
          userId: userCtx.user.id,
          postId: postId
        },
        postId,
        "add"
      );
    }
    axios
      .post(
        "/api/like",
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
        }
      })
      .catch(() => {
        props.addLike(
          {
            id: -1,
            userId: userCtx.user.id,
            postId: postId
          },
          postId,
          "remove"
        );
      });
  };

  const handleComment = () => {
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
              onClick={() => handleProfile()}
              className={css`
                &:hover {
                  cursor: pointer;
                  -webkit-filter: brightness(85%);
                  -webkit-transition: all 0.3s ease;
                  -moz-transition: all 0.3s ease;
                  -o-transition: all 0.3s ease;
                  -ms-transition: all 0.3s ease;
                  transition: all 0.3s ease;
                }
              `}
              src={
                post.user.profilepic ? post.user.profilepic : DEFAULT_PROFILE
              }
            />
            <Box
              p="5px"
              fontWeight="bold"
              fontSize="16px"
              onClick={() => handleProfile()}
              className={css`
                border-bottom: 1px solid transparent;
                transition: border-color 0.3s ease-in;
                &:hover {
                  cursor: pointer;
                  border-bottom: 1px solid;
                }
              `}
            >
              {post.user.username}
            </Box>
          </Flex>
          <Flex flexDirection="row">
            <img
              alt="weed"
              src={post.weed.pictureUrl}
              style={{ width: "140px", height: "150px", margin: "10px" }}
              onError={e => {
                e.target.onerror = null;
                switch (post.weed.strain) {
                  case "Indica":
                    e.target.src = INDICA;
                    break;
                  case "Sativa":
                    e.target.src = SATIVA;
                    break;
                  default:
                    e.target.src = HYBRID;
                }
              }}
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
                {post.tags !== "" ? (
                  processTags(post.tags).map((tag, key) => {
                    return <Tag key={key}>{tag}</Tag>;
                  })
                ) : (
                  <Box fontSize="11px" pt="3px">
                    No Tags!
                  </Box>
                )}
              </Flex>
              <Box mb="20px" className="wrap">
                {post.content}
              </Box>
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
            Toked by <b>{post.likes.length} person</b>
          </Box>
        ) : (
          <Box mr="5px">
            Toked by <b>{post.likes.length} people</b>
          </Box>
        )}
        {post.comments.length > 0 && !props.hide && (
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
                  border-bottom: 1px solid transparent;
                  transition: border-color 0.3s ease-in;
                  &:hover {
                    cursor: pointer;
                    border-bottom: 1px solid;
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
                  border-bottom: 1px solid transparent;
                  transition: border-color 0.3s ease-in;
                  &:hover {
                    cursor: pointer;
                    border-bottom: 1px solid;
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
      {!props.hide ? (
        <Flex justifyContent="flex-start" mb="10px">
          <ButtonLike
            mr="5px"
            bg="transparent"
            color={likeColour ? "rgb(110, 51, 95)" : "#9DA077"}
            borderColor={likeColour ? "rgb(110, 51, 95)" : "#9DA077"}
            backgroundColor={likeColour ? "#fff2fc" : "transparent"}
            onClick={() => handleLike(post.id)}
          >
            <Icon type="like" />
          </ButtonLike>
          <ButtonLike bg="transparent" onClick={handleComment}>
            <Icon type="message" />
          </ButtonLike>
        </Flex>
      ) : (
        <Flex />
      )}
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
            src={
              userCtx.user.profilepic
                ? userCtx.user.profilepic
                : DEFAULT_PROFILE
            }
          />
        </Box>
      )}
    </Card>
  );
};

export default withRouter(SinglePost);
