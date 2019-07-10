import React from 'react'; 
import CssBaseline from '@material-ui/core/CssBaseline';
import {LayoutNoUser} from 'layouts/LayoutNoUser';
import {LayoutUser} from 'layouts/LayoutUser'; 
import {ResetPasswordForm} from 'components/ResetPasswordForm'; 

const ResetPassword = () => {
  let selectLayout = ''; 
  if(localStorage.getItem('username') === null){
    selectLayout = (<LayoutNoUser />)
  } else {
    selectLayout = (<LayoutUser />)
  }
  return(
    <React.Fragment>
      <CssBaseline />
      {selectLayout}
      <ResetPasswordForm />
    </React.Fragment>
  )
}
export default ResetPassword