import React, {useEffect, useState} from 'react' 
import {Modal ,Spin, Table} from 'antd';
import {adminAuth} from 'services/auth/Admin' 
import swal from 'sweetalert';
import {WrappedEditUserForm} from 'components/shared/WrappedEditUserForm'; 
import {ActionListUserForm} from 'components/shared/ActionListUserForm'; 

const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
};

const ListUserForm = () => {
  document.title = 'List User';
  const [data, setData] = useState([])
  const [editRecordRow, setEditRecordRow] = useState({})
  const [loadInputForm, setloadInputForm] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const onClickShowModal = (record) => { 
    setEditRecordRow(record)
    setloadInputForm(true)
  }
  const onCancel = () => {
    setloadInputForm(false)
  }
  const columns = [
    {
      title: 'User name',
      dataIndex: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
    {
      title: 'Update at (yy/mm/dd hh/mm/ss)',
      dataIndex: 'update',
    },
    {
      title: 'Is Admin', 
      dataIndex: 'is_admin'
    }, 
    {
      title: 'Is Activate', 
      dataIndex: 'is_active'
    }, 
    {
      title: 'Action',
      dataIndex: 'action',
      render: (text, record) => <ActionListUserForm onClickShowModal={onClickShowModal} record={record}/>,
    }, 
  ];
  useEffect(() => {
      adminAuth.loadListUser(localStorage.getItem('token'))
    .then((res) => {
      const listUser = res.data;
      const listData = []; 
      for (let i = 0; i < listUser.length; i++){
        let is_admin = "No", is_active = "No"
        if(listUser[i].is_admin) is_admin = "Yes"
        if(listUser[i].is_active) is_active = "Yes"
        listData.push({
          key: listUser[i].user_id,
          name: listUser[i].username,
          email: listUser[i].email,
          update: listUser[i].updated_at,
          is_admin: is_admin, 
          is_active: is_active
        })
      }
      setData(listData)
    })
    .catch((err) => {
      setIsLoading(false)
      swal('Sorry!', 'Server error', 'error');
    })
  }, [] )
  if (data.length === 0 && isLoading){
    return (
      <div>
        <Spin tip="Loading...">
          <div style={{ padding: 24, background: '#fff', textAlign: 'center' }}>
            <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
          </div>
        </Spin>
      </div>
    )
  }
  else {
    return (
      <div style={{ padding: 24, background: '#fff', textAlign: 'center' }}>
        <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
        <Modal
          title="Edit Information"
          visible={loadInputForm}
          onCancel={onCancel}
          onOk={onCancel}
        >
          <WrappedEditUserForm oldUser={editRecordRow}/>
        </Modal>
      </div>
    )
  }
}

export default ListUserForm