import React from 'react'; 
import CssBaseline from '@material-ui/core/CssBaseline';
import {LayoutNoUser} from 'layouts/LayoutNoUser';
import {ResetPasswordForm} from 'components/ResetPasswordForm'; 

const ResetPassword = () => {
  return(
    <React.Fragment>
      <CssBaseline />
      <LayoutNoUser />
      <ResetPasswordForm />
    </React.Fragment>
  )
}
export default ResetPassword