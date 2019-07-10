import React from 'react'; 
import CssBaseline from '@material-ui/core/CssBaseline';
import {LayoutUser} from 'layouts/LayoutUser'; 
import {ChangePasswordForm} from 'components/ChangePasswordForm'; 

const ChangePassword = () => {
  return(
    <React.Fragment>
      <CssBaseline />
      <LayoutUser />
      <ChangePasswordForm />
    </React.Fragment>
  )
}

export default ChangePassword; 