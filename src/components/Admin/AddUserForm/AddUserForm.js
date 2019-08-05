import React, {useState} from 'react'
import {
  Form,
  Input,
  Checkbox,
  Button,
  notification, 
} from 'antd';
import {adminAuth} from 'services/auth/Admin'
const InfoForm = (props) => {
  document.title = 'Add User';
  const {getFieldDecorator} = props.form;
  const [isLoading, setIsLoading] = useState(false)
  const handleSubmit = (e) => {
    e.preventDefault(); 
    props.form.validateFieldsAndScroll((err, values) => {
      if(!err){
        if(values.is_admin == null){
          values.is_admin = false
        }
        console.log(values)
        const data = {
          'username': values.username,
          'email': values.email,
          'is_admin': values.is_admin, 
        }
        adminAuth.createAccount(data, localStorage.getItem('token'))
        .then((res) => {
          setIsLoading(false)
          notification['success']({
            message: res.data.message,
            description:
              'success',
          });
        })
        .catch((err) => {
          setIsLoading(false)
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
      else{
        setIsLoading(false)
      }
    })
  }
  return (
    <div style={{ padding: 24, background: '#fff'}}>
      <Form labelCol={{ span: 5 }} wrapperCol={{ span: 12 }} onSubmit={handleSubmit}>
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
        })(<Input />)}
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
          })(<Input />)}
        </Form.Item>
        <Form.Item wrapperCol={{ span: 12, offset: 5 }}>
          {getFieldDecorator('is_admin', {
            valuePropName: 'checked', 
          })(
            <Checkbox>
              Make Admin
            </Checkbox>,
          )}
        </Form.Item> 
        <Form.Item wrapperCol={{ span: 12, offset: 5 }}>
          <Button 
            type="primary" 
            htmlType="submit"
            loading={isLoading}
            onClick={()=>{setIsLoading(true)}}
          >
            Create New User
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}
const AddUserForm = Form.create({ name: 'Info User Form' })(InfoForm);
export default AddUserForm