import React from 'react'
import {Popconfirm, Icon, notification} from 'antd'
import Auth from 'services/auth';

const Action = (props) => {
  const{record} = props
  const{onClickShowModal} = props
  const onConfirm = () => {
    const dataReqDelete = {
      'username': record.name,
      'email': record.email  
    }
    Auth.deleteUserByNickAdmin(dataReqDelete, localStorage.getItem('token'))
    .then((res) => {
      notification['success']({
        message: res.data.message,
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
  let LinkDelete = ''
  if(record.is_admin === "No"){
    LinkDelete = (
      <Popconfirm
        title="Are you sure？"
        icon={<Icon type="question-circle-o" style={{ color: 'red' }} />}
        onConfirm={onConfirm}
      >
        <a href="#delete">delete</a>
      </Popconfirm>
    )
  }
  return (
    <div>
      <a href="#edit" style={{marginRight: 7}} onClick={e => {
        e.preventDefault()
        onClickShowModal(record)
      }}>edit</a>
      {LinkDelete}
    </div>
  )
}

export default Action