import React from 'react'; 
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import { Material } from 'components/shared/Material'; 

const LayoutNoUser = () => {
  const classes = Material.useStyles();
  return(
      <AppBar position="static" color="default" elevation={0} className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>
            TEKO APP
          </Typography>
        </Toolbar>
      </AppBar>
  );
}

export default  LayoutNoUser ;  