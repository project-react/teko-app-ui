import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { MaterialInputForm } from 'components/shared/MaterialInputForm';
import { InputText } from 'components/shared/InputText';
import { validatorHelper } from 'helpers/validator';
import Auth from 'services/auth'; 
import { Link as RouteLink } from 'react-router-dom';
import swal from 'sweetalert';
import CircularProgress from '@material-ui/core/CircularProgress';

export default function RegisterForm(props) {
  document.title = 'Register';
  const classes = MaterialInputForm.useStyles();
  const ToolHandlingForm = () => {
    return (
      <div>
        <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={submit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link to="/Login" variant="body2" component={RouteLink}>
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
      </div>
    )
  }

  const ToolLoadingForm = () => {
    return (
      <Box mt={5}>
          <CircularProgress disableShrink />
      </Box>
    )
  }
  
  let ToolHandlingFormChange = ''; 

  let ToolLoadingFormChange = ""; 
  
  const [usernameField, setUsernameField] = useState({
    value: '',
    error: '', 
    isError: false
  });

  const [emailField, setEmailField] = useState({
    value: '', 
    error: '', 
    isError: false
  })
  
  const [passwordField, setPasswordField] = useState({
    value: '', 
    error: '', 
    isError: false
  })
  const [confirmpasswordField, setconfirmpasswordField] = useState({
    value: '', 
    error: '', 
    isError: false
  })
  const [loadingField, setLoadingField] = useState({
    isLoading : false, 
  })   
  const submit = e => {
    e.preventDefault();
    let validatorsField = ["username", "email", "password", "confirmpassword"]; 
    if(validatorHelper.isFormValid(validatorHelper.validators, validatorsField)){
      setLoadingField({isLoading: true})
      const data = {
        'email': emailField.value, 
        'username': usernameField.value, 
        'password': passwordField.value
      }
      Auth.register(data)
      .then(res => {
        let username = res.data.username; 
        let email = res.data.email; 
        let expiredTime = res.data.expired_time; 
        swal("Hello, " + username, "You can check email: " + email + " and verify account before: " + expiredTime, "success")
        .then(() => {
          props.history.push("/login");
        })
      })
      .catch(err => {
        if(err.response){
          swal('Sorry!', err.response.data.message, 'error')
          .then(() => {
            setLoadingField({isLoading: false});
          })
        }
        else if(err.request){
          props.history.push('/servererror');
        }
      })
    }
  };
  if(loadingField.isLoading){
    ToolLoadingFormChange = ToolLoadingForm(); 
  } 
  else {
    ToolHandlingFormChange = ToolHandlingForm(); 
  }
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Register
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <InputText
                autoComplete="fname"
                name="username"
                variant="outlined"
                required
                fullWidth
                id="username"
                label="User Name"
                autoFocus
                type="text"
                textField={usernameField}
                setChange={setUsernameField}
              />
            </Grid>
            <Grid item xs={12}>
              <InputText
                autoComplete="fname"
                name="email"
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                autoFocus
                type="text"
                textField={emailField}
                setChange={setEmailField}
              />
            </Grid>
            <Grid item xs={12}>
              <InputText
                autoComplete="fname"
                name="password"
                variant="outlined"
                required
                fullWidth
                id="password"
                label="Password"
                autoFocus
                type="password"
                textField={passwordField}
                setChange={setPasswordField}
              />
            </Grid>
            <Grid item xs={12}>
              <InputText
                autoComplete="fname"
                name="confirmpassword"
                variant="outlined"
                required
                fullWidth
                id="confirmpassword"
                label="Password Repeat"
                autoFocus
                type="password"
                textField={confirmpasswordField}
                setChange={setconfirmpasswordField}
              />
            </Grid>
          </Grid>
          {ToolHandlingFormChange}
        </form>
        {ToolLoadingFormChange}
      </div>
      <Box mt={5}>
        <MaterialInputForm.MadeWithLove />
      </Box>
    </Container>
  );
}
