import React from 'react'
import {
  Form,
  Input,
  Checkbox,
  Button,
} from 'antd';

const FromSubmitEdit = (props) =>{
  const {getFieldDecorator} = props.form;
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
    },
  };
  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 16,
        offset: 8,
      },
    },
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        if (values.is_admin == null){
          values.is_admin = false 
        }
        console.log(values.is_admin);
      }
    });
  }
  return (
    <Form {...formItemLayout} onSubmit={handleSubmit}>
        <Form.Item label="Username">
          {getFieldDecorator('username', {
            rules: [{ required: true, message: 'Please input your nickname!', whitespace: true }],
          })(<Input />)} 
        </Form.Item>
        <Form.Item label="E-mail">
          {getFieldDecorator('email', {
            rules: [
              {
                type: 'email',
                message: 'The input is not valid E-mail!',
              },
              {
                required: true,
                message: 'Please input your E-mail!',
              },
            ],
          })(<Input />)}
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          {getFieldDecorator('is_admin', {
            valuePropName: 'checked', 
          })(
            <Checkbox>
              Make Admin
            </Checkbox>,
          )}
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Submit Change
          </Button>
        </Form.Item>
      </Form>
  )
}

const WrappedEditUserForm = Form.create({ name: 'register' })(FromSubmitEdit);

export default WrappedEditUserForm