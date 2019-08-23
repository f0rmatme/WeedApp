import React from 'react';
import axios from 'axios';
import PostForm from './PostForm';
import { Button, Card } from 'antd';
import Box from './ui/Box';

class Posts extends React.Component {

  state = {
    loading: true,
    visible: false,
    posts: [],
  };

  componentDidMount() {
    axios.get('http://localhost:3000/posts')
    .then((res) => {
      this.setState({posts: res.data, loading: false});
    }).catch((err) => {
      console.log("YOU GOT AN ERROR NIGGA");
    })
  }

  showModalForm = () => {
    this.setState({visible: true});
  };

  handleCancel = () => {
    this.setState({visible: false});
  };

  handleCreate = () => {
    const { form } = this.formRef.props;
    form.validateFields((err, values) => {
      if(err){
        return;
      }
      console.log("Values: ", values);
      form.resetFields();
      this.setState({visible: false})
    });
  };

  saveFormRef = formRef => {
    this.formRef = formRef;
  };

  render() {
    const {posts} = this.state;
    return (
      <Box style={{
        'backgroundColor': 'white',
        'minHeight': '75vh',
        'position': 'relative',
        'padding': '1%',
      }}>
        <Box style={{
          'position': 'fixed',
          'top': '100px',
          'right': '50px'
        }}>
          <Button type="primary" onClick={this.showModalForm}>Post!</Button>
          <PostForm
            wrappedComponentRef={this.saveFormRef}
            visible={this.state.visible}
            onCancel={this.handleCancel}
            onCreate={this.handleCreate}
          />
        </Box>
        <Box style={{
          'fontWeight': 'bold',
          'fontSize':'20px',
          'marginLeft': '10px',
        }}>
          Posts
        </Box>
        <Box style={{
          'display': 'flex',
          'flexWrap': 'wrap',
          'justifyContent': 'flex-start'
        }}>
          {
            !this.state.loading ? posts.map((post, key) => {
              return (
                <Box key={key} style={{'margin':'10px'}}>
                  <Card
                    title={post.user.username}
                    bordered={true}
                    hoverable={true}
                    cover={<img alt="weed" src={post.weed.pictureUrl} />}
                    style={{
                      'width':'300px'
                    }}
                  >
                    {post.content}
                  </Card>
                </Box>
              );
            })
            :
            (
              <Box>LOADING WHORE </Box>
            )
          }
        </Box>
      </Box>
    );
  }
}

export default Posts
