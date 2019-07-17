import React from 'react'; 
import CssBaseline from '@material-ui/core/CssBaseline';
import {LayoutUser} from 'layouts/LayoutUser'; 
import {ChangePasswordForm} from 'components/ChangePasswordForm'; 

const ChangePassword = (props) => {
  return(
    <React.Fragment>
      <CssBaseline />
      <LayoutUser {...props}/>
      <ChangePasswordForm {...props}/>
    </React.Fragment>
  )
}

export default ChangePassword; 