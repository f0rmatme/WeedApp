import React from "react";
import axios from "axios";
import PostForm from "./PostForm";
import { Button, Card, Tag, Spin, Icon, Divider } from "antd";
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

const antIcon = <Icon type="loading" style={{ fontSize: 70 }} spin />;

class PostsOld extends React.Component {
  state = {
    loading: true,
    visible: false,
    posts: []
  };

  componentDidMount() {
    axios
      .get("http://localhost:3000/posts", {
        headers: { Authorization: `Bearer ${this.props.at}` }
      })
      .then(res => {
        this.setState({ posts: res.data, loading: false });
      })
      .catch(err => {
        console.log("YOU GOT AN ERROR NEIGHBOUR");
      });
  }

  showModalForm = () => {
    this.setState({ visible: true });
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  handleCreate = () => {
    const { form } = this.formRef.props;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      console.log("Values: ", values);
      form.resetFields();
      this.setState({ visible: false });
    });
  };

  saveFormRef = formRef => {
    this.formRef = formRef;
  };

  getRandomColour = () => {
    return colours[Math.floor(Math.random() * Math.floor(11))];
  };

  processTags = tags => {
    return tags.split(",");
  };

  render() {
    const { posts } = this.state;
    return (
      <Box
        style={{
          backgroundColor: "#f5f2e8",
          minHeight: "100vh",
          position: "relative",
          padding: "1%",
          paddingRight: "110px"
        }}
      >
        <Box
          style={{
            position: "fixed",
            top: "80px",
            right: "50px"
          }}
        >
          <Button type="primary" onClick={this.showModalForm}>
            New Post
          </Button>
          <PostForm
            wrappedComponentRef={this.saveFormRef}
            visible={this.state.visible}
            onCancel={this.handleCancel}
            onCreate={this.handleCreate}
          />
        </Box>
        <Box
          style={{
            fontWeight: "bold",
            fontSize: "20px",
            marginLeft: "10px"
          }}
        >
          Posts
        </Box>
        <Divider />
        <Box
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "flex-start"
          }}
        >
          {!this.state.loading ? (
            posts.map((post, key) => {
              return (
                <Box key={key} style={{ margin: "10px" }}>
                  <Card
                    title={
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
                        <Box
                          style={{
                            margin: "5px"
                          }}
                        >
                          {post.user.username}
                        </Box>
                      </Flex>
                    }
                    bordered={true}
                    hoverable={true}
                    cover={<img alt="weed" src={post.weed.pictureUrl} />}
                    style={{
                      width: "270px"
                    }}
                  >
                    <Box fontWeight="bold">{post.weed.weedName}</Box>
                    <Box
                      style={{
                        paddingBottom: "10px"
                      }}
                    >
                      {post.content}
                    </Box>
                    <Flex>
                      {this.processTags(post.tags).map((tag, key) => {
                        return (
                          <Tag key={key} color={this.getRandomColour()}>
                            {tag}
                          </Tag>
                        );
                      })}
                    </Flex>
                  </Card>
                </Box>
              );
            })
          ) : (
            <Flex width="100%" justifyContent="center" mt="20%">
              <Spin indicator={antIcon} size="large" />
            </Flex>
          )}
        </Box>
      </Box>
    );
  }
}

const Posts = () => {
  return (
    <Flex backgroundColor="#f5f2e8" minHeight="100vh">
      <Box width="22%"> </Box>
      <Box width="52%" bg="white" mt="10px">
        <Box fontWeight="bold" fontSize="14px" p="5%" pb="0px">
          Newest Posts
        </Box>
        <Flex justifyContent="center" alignItems="center">
          <Box width="90%">
            <Divider />
          </Box>
        </Flex>
      </Box>
      <Box width="26%"></Box>
    </Flex>
  );
};

export default Posts;
