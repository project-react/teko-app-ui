import React, { useState } from 'react'
import { Button } from 'antd';
import Auth from 'services/auth';
import swal from 'sweetalert';

const ButtonLogout = (props) => {
  const [iconLoading, setIconLoading] = useState(false)
  const enterIconLoading = () => {
    setIconLoading(true)
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
    <Button
      type="primary"
      icon="poweroff"
      loading={iconLoading}
      onClick={enterIconLoading}
      style={{ float: 'right' }}
    >
       Logout
    </Button>
  )
}

export default ButtonLogout