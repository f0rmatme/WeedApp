import React from "react";
import { Divider, Modal } from "antd";
import Flex from "./ui/Flex";
import Box from "./ui/Box";
import { ButtonCancel } from "./ui/Button";
import SinglePost from "./SinglePost";

const RelatedWeedPosts = props => {
  return (
    <Flex>
      {
        <Modal
          title="Related Posts"
          visible={props.visible}
          onCancel={props.handleCancel}
          footer={[
          <ButtonCancel
            key="CancelButton"
            onClick={props.handleCancel}
            bg="transparent"
            color="#D7D8D7"
          >
            Cancel
          </ButtonCancel>
          ]}
        >
          <Flex
            flexDirection="column"
            justifyContent="center"
          >
            { props.posts !== undefined? (
                props.posts.length > 0 ? (
                  props.posts.map((post, key) => {
                    return (
                      <Box key={key}>
                        <Flex
                          flexDirection="row"
                          justifyContent="center"
                          alignItems="center"
                        >
                        <SinglePost
                          post={post}
                          hide={true}
                        />
                        </Flex>
                        <Flex 
                          justifyContent="center" 
                          alignItems="center"
                        >
                          <Box width="90%">
                            <Divider style={{ margin: "10px" }} />
                          </Box>
                        </Flex>
                      </Box>
                    );
                  })
                ) : (
                  <Flex>
                    No posts available
                  </Flex>
                ) 
              ) : (
              <Flex>
              </Flex>
              )
            }
          </Flex>
        </Modal>
      }
    </Flex>
  );
};

export default RelatedWeedPosts;