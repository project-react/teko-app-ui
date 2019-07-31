import React, {useState} from 'react'
import {Popconfirm, Button} from 'antd';
import Auth from 'services/auth';
import swal from 'sweetalert';

const ButtonLogout = (props) => {
  const[isLoading, setIsLoading] = useState(false)
  const enterIconLoading = () => {
    setIsLoading(true)
    Auth.logout(localStorage.getItem('token'))
    .then((res) => {
      swal("Good bye, ", res.data.message, "success")
      .then(() =>{
        localStorage.clear();
        props.history.push("/login"); 
      })
    })
    .catch((err) => {
      swal("Sorry!", "Time out, auto logout" , "error")
      .then(()=>{
        localStorage.clear()
        props.history.push("/");  
      })
    })
  }
 
  return (
    <Popconfirm
        placement="bottomRight"
        title='Logout'
        onConfirm={enterIconLoading}
        okText="Yes"
        cancelText="No"
      >
        <Button
          type="primary"
          icon="poweroff"
          loading={isLoading}
          style={{ float: 'right' }}
        >
          Logout
        </Button>
      </Popconfirm>
  )
}

export default ButtonLogout