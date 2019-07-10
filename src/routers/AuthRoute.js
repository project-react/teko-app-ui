import React from 'react'; 
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'; 

import { PrivateRoute }  from './PrivateRoute'; 
import { Register } from 'views/Register';
import { Login } from 'views/Login'; 
import { ResetPassword } from 'views/ResetPassword'; 
import { ChangePassword } from 'views/ChangePassword';
import { Home } from 'views/Home'; 

const AuthRoute = () => {
  return (
    <Router>
      <Switch>
        <PrivateRoute path="/Register" component={Register} />
        <PrivateRoute path="/Login" component={Login} />
        <PrivateRoute path="/ResetPassword" component={ResetPassword} />
        <PrivateRoute path="/ChangePassword" component={ChangePassword} />
        <PrivateRoute path="/Home" component={Home} />
        <Redirect from="/" to="/Login" />
      </Switch>
    </Router>
  )
}

export default AuthRoute