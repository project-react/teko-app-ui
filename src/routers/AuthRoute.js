import React, {lazy, Suspense} from 'react'; 
import {BrowserRouter as Router, Redirect, Switch} from 'react-router-dom'; 
import {Route} from "react-router-dom";
import {PrivateRoute}  from './PrivateRoute'; 
const Register = lazy(() => import('views/Register'));
const Login = lazy(() => import('views/Login'));
const ResetPassword = lazy(() => import('views/ResetPassword'));
const ChangePassword = lazy(() => import('views/ChangePassword'));
const Home = lazy(() => import('views/Home'));
const Admin = lazy(() => import('views/Admin'));
const PageNotFound = lazy(() => import('views/PageNotFound'));
const ServerError = lazy(() => import('views/ServerError'));
const UnAuthorized = lazy(() => import('views/UnAuthorized'));

const AuthRoute = () => {
  return (
    <Suspense fallback={
        <div>Loading ...</div>
    }>
        <Router>
          <Switch>
            <PrivateRoute path="/register" component={Register} />
            <PrivateRoute path="/login" component={Login} />
            <PrivateRoute path="/resetPassword" component={ResetPassword} />
            <PrivateRoute path="/changePassword" component={ChangePassword} />
            <PrivateRoute path="/home" component={Home} />
            <PrivateRoute path="/admin" component={Admin} />
            <Route path="/servererror" component={ServerError}/>
            <Route path="/unauthorized" component={UnAuthorized}/>
            <Route path="*" component={PageNotFound}/>
            <Redirect from="/" to="login" />
          </Switch>
        </Router>
    </Suspense>
  )
}

export default AuthRoute