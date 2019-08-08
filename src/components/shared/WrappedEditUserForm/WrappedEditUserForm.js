import React from 'react'
import {
  Form,
  Input,
  Checkbox,
  Button,
  notification, 
} from 'antd';
import {adminAuth} from 'services/auth/Admin'; 
const FromSubmitEdit = (props) =>{
  const {oldUser} = props;
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
  let checkboxMakeAdmin = ''; 
  if (oldUser.is_admin === "No") {
    checkboxMakeAdmin = (
      <Form.Item {...tailFormItemLayout}>
        {getFieldDecorator('is_admin', {
          valuePropName: 'checked', 
        })(
          <Checkbox>
            Make Admin
          </Checkbox>,
        )}
      </Form.Item> 
    )
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        if (values.is_admin == null && oldUser.is_admin === "No"){
          values.is_admin = false 
        } 
        else if (oldUser.is_admin === "Yes") {values.is_admin = true}
        const dataRequestEdit = {
            "user_edited_id": oldUser.key,
            "new_username": values.username,
            "new_email": values.email,
            "new_is_admin": values.is_admin
        }
        adminAuth.editInforUser(dataRequestEdit, localStorage.getItem('token'))
        .then((res) => {
          notification['success']({
            message: res.data.msg,
            description:
              'success',
          });
        })
        .catch((err) => {
          if(err.response){
            notification['error']({
              message: err.response.data.message,
              description:
                'error',
            });
          }
          else if(err.request){
            notification['error']({
              message: 'Server Error',
              description:
                'error',
            });
          }
        })
      }
    });
  }
  return (
    <Form {...formItemLayout} onSubmit={handleSubmit}>
      <Form.Item label="Username" >
      {
        getFieldDecorator('username', {
        rules: [
          { 
            required: true, 
            message: 'Please input your name!', 
          }, 
          {
            pattern: /^\S+$/, 
            message: 'Username must write immediately'
          }, 
          {
            min: 6, 
            message: 'Username must be longer than six characters' 
          }, 
          {
            pattern: /^[a-zA-Z0-9]*$/, 
            message: 'Username must character a-z or upper character, 0-9'
          }
        ],
      })(<Input addonAfter={oldUser.name}/>)}
      </Form.Item>
      <Form.Item label="E-mail">
        {getFieldDecorator('email',{
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
        })(<Input addonAfter={oldUser.email} />)}
      </Form.Item>
      {checkboxMakeAdmin}
      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">
          Submit Change
        </Button>
      </Form.Item>
    </Form>
  )
}
const ListUserCreateFormEdit = Form.create({ name: 'Edit user' })(FromSubmitEdit);
export default ListUserCreateFormEdit