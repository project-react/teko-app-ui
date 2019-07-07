import React from 'react'; 
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'; 

import { Register } from 'views/Register';
import { Login } from 'views/Login'; 
import { ResetPassword } from 'views/ResetPassword'; 
import { ChangePassword } from 'views/ChangePassword';

const AuthRoute = () => {
  return (
    <Router>
      <Switch>
        <Route path="/Register" component={Register} />
        <Route path="/Login" component={Login} />
        <Route path="/ResetPassword" component={ResetPassword} />
        <Route path="/ChangePassword" component={ChangePassword} />
        <Redirect from="/" to="/Register" />
      </Switch>
    </Router>
  )
}

export default AuthRoute