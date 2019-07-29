import React, {useEffect, useState} from 'react' 
import {Modal ,Spin, Table} from 'antd';
import Auth from 'services/auth';
import swal from 'sweetalert';
import {WrappedEditUserForm} from 'components/shared/WrappedEditUserForm'

const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
};

const ListUserForm = () => {
  const [data, setData] = useState([])
  const [loadInputForm, setloadInputForm] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const onClickShowModal = (record) => { 
    setloadInputForm(true)
    console.log(loadInputForm)
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
      title: 'Action',
      dataIndex: 'edit',
      render: (text, record) => <a href="#delete" onClick={e => onClickShowModal(record)}>edit</a>,
    }, 
  ];

  useEffect(() => {
    Auth.adminLoadListUser(localStorage.getItem('token'))
    .then((res) => {
      const listUser = res.data;
      const listData = []; 
      for (let i = 0; i < listUser.length; i++){
        let is_admin = "No"
        if(listUser[i].is_admin) is_admin = "Yes"
        listData.push({
          key: i,
          name: listUser[i].username,
          email: listUser[i].email,
          update: listUser[i].updated_at,
          is_admin: is_admin, 
        })
        console.log(listUser[i].is_admin)
      }
      console.log(listData)
      setData(listData)
    })
    .catch((err) => {
      setIsLoading(false)
      swal('Sorry!', 'Server error', 'error');
    })
  }, [])

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
          <WrappedEditUserForm />
        </Modal>
      </div>
    )
  }
}
export default ListUserForm