import React, {useState} from 'react'; 
import {LayoutAdmin} from 'layouts/LayoutAdmin';
import {adminAuth} from 'services/auth/Admin'

const Admin = (props) => {
  const [isAdmin, setIsAdmin] = useState(false)
  useState(() => {
    adminAuth.verify(localStorage.getItem('token'))
    .then(() => {
      setIsAdmin(true)
    })
    .catch(() => {
      props.history.push('/unauthorized')
    })
  })
  if(isAdmin){
    return (
      <LayoutAdmin {...props} />
    )
  } else {
    return ("")
  }
}
export default Admin; 