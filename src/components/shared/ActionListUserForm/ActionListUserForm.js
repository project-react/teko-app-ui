import React, {useState} from 'react'
import {Popconfirm, Icon, notification, Modal, Select} from 'antd'
import {adminAuth} from 'services/auth/Admin'
const { Option } = Select;

const Action = (props) => {
  const{record} = props;
  const{onClickShowModal} = props;
  const[loadBlockModal, setLoadBlockModal] = useState(false)
  const[sizeBlockSelect, setSizeBlockSelect] = useState(1)
  const onConfirmDelete = () => {
    const dataReqDelete = {
      'username': record.name,
      'email': record.email  
    }
    adminAuth.deleteUser(dataReqDelete, localStorage.getItem('token'))
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
  const onConfirmlock = () => {
    console.log(sizeBlockSelect)
    const dataBlockReq = {
      'username': record.name, 
      'email' : record.email, 
      'look_time': sizeBlockSelect
    }
    adminAuth.lockAccount(dataBlockReq, localStorage.getItem('token'))
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

  let ActionBlockDelete = ''
  if(record.is_admin === "No"){
    ActionBlockDelete = (
      <>
        <a href="#lock" style={{marginRight: 7}} 
          onClick={e => {
            e.preventDefault()
            setLoadBlockModal(true)
          }}
        >lock</a>
        <Modal
          title="Lock Account(minutes)"
          visible={loadBlockModal}
          onOk={onConfirmlock}
          onCancel={() => {setLoadBlockModal(false)}}
        >
          <Select defaultValue="0" style={{ width: 200 }} 
            onChange={(value) => {
              setSizeBlockSelect(value)
            }}
          >
            <Option value="0">0</Option>
            <Option value="1">1</Option>
            <Option value="2">2</Option>
            <Option value="3">3</Option>
            <Option value="5">5</Option>
            <Option value="15">15</Option>
          </Select>
        </Modal>
        <Popconfirm
          title="Are you sure？"
          icon={<Icon type="question-circle-o" style={{ color: 'red' }} />}
          onConfirm={onConfirmDelete}
        >
          <a href="#delete">delete</a>
        </Popconfirm>
      </>
    )
  }
  return (
    <div>
      <a href="#edit" style={{marginRight: 7}} onClick={e => {
        e.preventDefault()
        onClickShowModal(record)
      }}>edit</a>
      {ActionBlockDelete}
    </div>
  )
}

export default Action