import React from 'react';
import { Modal, Form, Input } from 'antd';
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

export default NewPostForm;
