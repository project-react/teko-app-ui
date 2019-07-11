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
