import React from 'react';
import { Route, Redirect } from "react-router-dom";
import Auth from 'services/auth'; 

export const PrivateRoute = ({
  path, 
  component, 
  ...rest
}) => {
  const getData = (e) =>{
    console.log("onload");
  }
  if(Auth.isAuthenticated(path)){
    return(
      <Route path={path} component={component} onEnter={getData} />
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
