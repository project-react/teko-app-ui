import React, { useEffect } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import { Link as RouteLink } from 'react-router-dom';
import swal from 'sweetalert';
// import Auth from 'services/auth';
import {userAuth} from 'services/auth/User'
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
        userAuth.logout(localStorage.getItem('token'))
        .then((res) =>{
          swal("Good bye, ", res.data.message, "success")
          .then(() =>{
            localStorage.clear();
            props.history.push("/login"); 
          })
        })
        .catch((err) => {
          localStorage.clear();
          props.history.push("/login"); 
        })
      })
    }
  });

 
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
          userAuth.logout(localStorage.getItem('token'))
          .then((res) => {
            swal("Good bye, ", res.data.message, "success")
            .then(() =>{
              localStorage.clear()
              props.history.push("/login"); 
            })
          })
          .catch((err) => {
            if(err.response){
              swal("Sorry!", "Time out, auto logout" , "error")
              .then(()=>{
                localStorage.clear()
                props.history.push("/login");  
              })
            }
            else if(err.request){
              swal("Sorry!", "Server error, auto logout" , "error")
              .then(()=>{
                localStorage.clear()
                props.history.push("/login");  
              })
            }
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
            <Link variant="button" color="textPrimary" to="/home" component={RouteLink} className={classes.link}>
              Home
            </Link>
            <Link variant="button" color="textPrimary" to="/changePassword" component={RouteLink} className={classes.link}>
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