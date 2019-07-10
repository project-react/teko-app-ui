import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { LayoutNoUser }  from 'layouts/LayoutNoUser';  
import { RegisterForm } from 'components/RegisterForm'; 

const Register = (props) => {
  return(
    <React.Fragment>
      <CssBaseline />
      <LayoutNoUser />
      <RegisterForm {...props}/> 
    </React.Fragment>
  )
}

export default Register;