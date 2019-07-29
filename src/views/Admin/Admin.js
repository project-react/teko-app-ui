import React, {useState} from 'react'; 
import {LayoutAdmin} from 'layouts/LayoutAdmin';
import Auth from 'services/auth'; 

const Admin = (props) => {
  const [isAdmin, setIsAdmin] = useState(false)
  useState(() => {
    Auth.verifyAdmin(localStorage.getItem('token'))
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