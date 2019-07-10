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
      <Route path={path} component={component} />
    ); 
  }
  else {
    if(path === '/Login' || path === '/Register'){
      return(
        <Redirect from="/" to="/Home" />
      ); 
    } else {
      return(
        <Redirect from="/" to="/Login" />
      );
    }
  }
}
