import React from 'react'; 
import CssBaseline from '@material-ui/core/CssBaseline';
import { LayoutNoUser }  from 'layouts/LayoutNoUser'; 
import { LoginForm } from 'components/LoginForm'; 

const Login = (props) => {
  return(
    <React.Fragment>
      <CssBaseline />
      <LayoutNoUser />
      <LoginForm {...props}/>
    </React.Fragment>
  ); 
}

export default Login 