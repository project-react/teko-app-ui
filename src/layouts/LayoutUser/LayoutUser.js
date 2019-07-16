import React, { useEffect } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import { Link as RouteLink } from 'react-router-dom';
import swal from 'sweetalert';
import Auth from 'services/auth';
import { Material } from 'components/shared/Material'; 


const LayoutUser = (props) => {
  useEffect(() => {
    const expTime  = localStorage.getItem('time'); 
    const datenow = Date.now();  
    if(expTime - datenow <= 0){
      swal({
        title: "Time out !!!",
        text: "System auto logout !!!",
        icon: "warning",
        dangerMode: true, 
      }).then(() => {
        Auth.logout(localStorage.getItem('token'))
        .then((res) =>{
          swal("Good bye, ", res.data.message, "success")
          .then(() =>{
            localStorage.clear();
            props.history.push("/"); 
          })
        })
        .catch((err) =>{
          localStorage.clear();
          props.history.push("/"); 
        })
      })
    }
  }, []);

 
  const classes = Material.useStyles(); 
  let username = localStorage.getItem('username'); 
  const onClick = () => {
    swal({
      title: "Are you sure?",
      text: "Are you sure that you want to Logout?",
      icon: "warning",
      dangerMode: true, 
    }).then((ok) => {
        if(ok){
          Auth.logout(localStorage.getItem('token'))
          .then((res) => {
            swal("Good bye, ", res.data.message, "success")
            .then(() =>{
              localStorage.clear()
              props.history.push("/"); 
            })
          })
          .catch((err) => {
            swal("Sorry!", "Time out, auto logout" , "error")
            .then(()=>{
              localStorage.clear()
              props.history.push("/");  
            })
          })
        }
    })  
  }
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
            <Link variant="button" color="textPrimary" href="#" className={classes.link}>
              {username}
            </Link>
          </nav>
          <Button onClick={onClick} color="primary" variant="outlined" className={classes.link}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
  ); 
}

export default LayoutUser