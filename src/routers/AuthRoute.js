import React from 'react'; 
import { BrowserRouter as Router, Redirect, Switch } from 'react-router-dom'; 

import { PrivateRoute }  from './PrivateRoute'; 
import { Register } from 'views/Register';
import { Login } from 'views/Login'; 
import { ResetPassword } from 'views/ResetPassword'; 
import { ChangePassword } from 'views/ChangePassword';
import { Home } from 'views/Home'; 
import { Admin } from 'views/Admin'; 

const AuthRoute = () => {
  return (
    <Router>
      <Switch>
        <PrivateRoute path="/register" component={Register} />
        <PrivateRoute path="/login" component={Login} />
        <PrivateRoute path="/resetPassword" component={ResetPassword} />
        <PrivateRoute path="/changePassword" component={ChangePassword} />
        <PrivateRoute path="/home" component={Home} />
        <PrivateRoute path="/admin" component={Admin} />
        <Redirect from="/" to="login" />
      </Switch>
    </Router>
  )
}

export default AuthRoute