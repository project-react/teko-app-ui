import React from 'react';
import { Route, Redirect } from "react-router-dom";
import Auth from 'services/auth'; 

export const PrivateRoute = ({
  path, 
  component, 
  ...rest
}) => {
  if(Auth.isAuthenticated(path)){
    return(
      <Route path={path} component={component}/>
    ); 
  }
  else {
    if(path === '/login' || path === '/register'){
      return(
        <Redirect from="/" to="/home" />
      ); 
    } else {
      return(
        <Redirect from="/" to="/login" />
      );
    }
  }
}
