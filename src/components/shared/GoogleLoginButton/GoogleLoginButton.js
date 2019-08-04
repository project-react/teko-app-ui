import React from 'react'
import GoogleLogin from 'react-google-login';
import Auth from 'services/auth';
import swal from 'sweetalert';

const Button = () => {
  const responseGoogle = (response) => {
    console.log(response)
    console.log(response.Zi.access_token);
    console.log(response.profileObj.email);
    const data = {
     'email': response.profileObj.email
    }
    Auth.loginWithGoogle(response.Zi.access_token, data)
    .then((res) => {
      console.log(res)
    })
    .catch((err) => {
      console.log(err)
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