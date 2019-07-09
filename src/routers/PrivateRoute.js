import React from 'react';
import { Route, Redirect } from "react-router-dom";
import Auth from 'services/auth'

export const PrivateRoute = ({
  path, 
  component, 
  ...rest
}) => {
  if(Auth.isAuthenticated()){
    return(
      <Route path={path} component={component} />
    ); 
  }
  else {
    return (
      <Route
        {...rest}
        render={props => {
            return (
              <Redirect
                to={{
                  pathname: "/",
                  state: {
                    from: props.location	
                  }
                }}
              />
            );
          }
        }
      />
    ); 
  }
}
