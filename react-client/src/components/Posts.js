import React from "react";
import axios from "axios";
import PostForm from "./PostForm";
import { Button, Card, Tag } from "antd";
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

class Posts extends React.Component {
  state = {
    loading: true,
    visible: false,
    posts: []
  };

  componentDidMount() {
    console.log(this.props.at);
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
            top: "100px",
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
            <Box> LOADING FRIEND </Box>
          )}
        </Box>
      </Box>
    );
  }
}

export default Posts;
