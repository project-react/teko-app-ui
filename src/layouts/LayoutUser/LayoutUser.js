import React from 'react'; 
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import { Link as RouteLink } from 'react-router-dom';

import { Material } from 'components/shared/Material'; 

const LayoutUser = (props) => {
  const classes = Material.useStyles(); 
  let username = localStorage.getItem('username'); 
  return(
    <AppBar position="static" color="default" elevation={0} className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>
            TEKO APP
          </Typography>
          <nav>
            <Link variant="button" color="textPrimary" to="/Home" component={RouteLink} className={classes.link}>
              Home
            </Link>
            <Link variant="button" color="textPrimary" to="/ChangePassword" component={RouteLink} className={classes.link}>
              Change Password
            </Link>
            <Link variant="button" color="textPrimary" to="/ResetPassword" component={RouteLink} className={classes.link}>
              Reset Password
            </Link>
            <Link variant="button" color="textPrimary" href="#" className={classes.link}>
              {username}
            </Link>
          </nav>
          <Button href="#" color="primary" variant="outlined" className={classes.link}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
  ); 
}

export default LayoutUser