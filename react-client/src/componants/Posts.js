import React from 'react';
//import axios from 'axios';
import { Fab, Card, /*makeStyles*/ } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import Eric from './images/eric.png';
import { Modal, Form, Input, Button } from 'antd';
import TextArea from 'antd/lib/input/TextArea';

const NewPostForm = Form.create({name: 'new_post_form'})(
  class extends React.Component{
    render(){
      const { visible, onCancel, onCreate, form } = this.props;
      const { getFieldDecorator } = form;
      return (
        <Modal
          visible={visible}
          title="Create a new post!"
          okText="Post!"
          onCancel={onCancel}
          onOk={onCreate}
        >

          <Form layout="horizontal">
            <Form.Item label="title">
              {getFieldDecorator('title',{
                rules: [{ required: true, message: 'Please make a title for your post'}],
              }) (<Input />)}
            </Form.Item>

            <Form.Item label="content">
              {getFieldDecorator('user_options',{
                rules: [{ required: true, message: 'Please add content to your post'}],
              })(<TextArea autosize/>)}
            </Form.Item>

            <Form.Item label="tags" className="collection-create-form_last-form-item">
              {getFieldDecorator('tags')(<Input type="textarea"/>)}
            </Form.Item>
          </Form>

        </Modal>
      );
    }
  },
);

class Posts extends React.Component {

  state = {
    visible: false
  };

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
    return (
      <div style={{'backgroundColor': 'white', 'minHeight': '75vh', 'position': 'relative'}}>
        <div style={{
          'position': 'fixed',
          'bottom': '75px',
          'right': '30px'
        }}>
          <Button type="primary" onClick={this.showModalForm}>Post!</Button>
          <NewPostForm
            wrappedComponentRef={this.saveFormRef}
            visible={this.state.visible}
            onCancel={this.handleCancel}
            onCreate={this.handleCreate}
          />
        </div>
        <div style={{
          'display': 'flex',
          'flexWrap': 'wrap',
          'justifyContent': 'space-around'
        }}>
          <Card raised={false} style={{
            'width': '21vw',
            'height': '30vh',
            'textAlign': 'center',
            'margin': '5px'
          }}>
            <p>big beaner</p>
            <img src={Eric} alt="eric is gay" style={{'margin': 'auto'}}/>
          </Card>
          <Card raised={false} style={{
            'width': '21vw',
            'height': '30vh',
            'textAlign': 'center',
            'margin': '5px'
          }}>
            <p>hot dog stand</p>
          </Card>
          <Card raised={true} style={{
            'width': '21vw',
            'height': '30vh',
            'textAlign': 'center',
            'margin': '5px'
          }}>
            <p>makeup models</p>
          </Card>
          <Card raised={true} style={{
            'width': '21vw',
            'height': '30vh',
            'textAlign': 'center',
            'margin': '5px'
          }}>
            <p>chocolate rain</p>
          </Card>
          <Card raised={true} style={{
            'width': '21vw',
            'height': '30vh',
            'textAlign': 'center',
            'margin': '5px'
          }}>
            <p>big beaner</p>
          </Card>
          <Card raised={true} style={{
            'width': '21vw',
            'height': '30vh',
            'textAlign': 'center',
            'margin': '5px'
          }}>
            <p>big beaner</p>
          </Card>
          <Card raised={true} style={{
            'width': '21vw',
            'height': '30vh',
            'textAlign': 'center',
            'margin': '5px'
          }}>
            <p>big beaner</p>
          </Card>
          <Card raised={true} style={{
            'width': '21vw',
            'height': '30vh',
            'textAlign': 'center',
            'margin': '5px'
          }}>
            <p>big beaner</p>
          </Card>
          <Card raised={true} style={{
            'width': '21vw',
            'height': '30vh',
            'textAlign': 'center',
            'margin': '5px'
          }}>
            <p>big beaner</p>
          </Card>
        </div>
      </div>
    );
  }
}

export default Posts
