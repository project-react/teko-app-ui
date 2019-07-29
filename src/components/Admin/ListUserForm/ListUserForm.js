import React, {useEffect, useState} from 'react' 
import {Spin, Table} from 'antd';
import Auth from 'services/auth';
import swal from 'sweetalert';

let columns = [
  {
    title: 'User name',
    dataIndex: 'name',
  },
  {
    title: 'Email',
    dataIndex: 'email',
  },
  {
    title: 'Created at (yy/mm/dd hh/mm/ss)',
    dataIndex: 'created',
  },
];
const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
};

const ListUserForm = () => {
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    Auth.adminLoadListUser(localStorage.getItem('token'))
    .then((res) => {
      const listUser = res.data;
      const listData = []; 
      for (let i = 0; i < listUser.length; i++){
        listData.push({
          key: i,
          name: listUser[i].username,
          email: listUser[i].email,
          created: listUser[i].created,
        })
      }
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
      </div>
    )
  }
}
export default ListUserForm