import React from 'react'
import GoogleLogin from 'react-google-login';
import {googleAuth} from 'services/auth/Google'; 
import swal from 'sweetalert';

const Button = (props) => {
  const{setLoadingField} = props;
  const responseGoogle = (response) => {
    const data = {
     'email': response.profileObj.email
    }
    const access_token = response.Zi.access_token; 
    googleAuth.login(access_token, data)
    .then((res) => {
      const expiredTime = Date.now() + 1800000;
      swal(
        'Hello, ' + res.data.username,
        'Auto Logout before 30 minutes',
        'success',
      ).then(() => {
        localStorage.setItem('token', res.data.token)
        localStorage.setItem('username', res.data.username);
        localStorage.setItem('time', expiredTime);
        if(res.data.isAdmin){
          props.history.push('/admin')
        } else {
          props.history.push('/home');
        }
      });
    })
    .catch((err) => {
      if(err.response){
        swal('Sorry!', err.response.data.message, 'error');
        setLoadingField({isLoading: false});
      }
      else if(err.request){
        props.history.push('/servererror');
      }
    })
  }
  
  const errorGoogle = (error) => {
    console.log(error)
  }

  return (
    <GoogleLogin
      clientId="29829160431-pmcrugklcs39j5bc4t0pnqqjn24bkl06.apps.googleusercontent.com"
      buttonText="Login"
      onSuccess={responseGoogle}
      onFailure={errorGoogle}
      cookiePolicy={'single_host_origin'}
    />
  )
}

export default Button