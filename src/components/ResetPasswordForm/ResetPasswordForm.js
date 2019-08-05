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
import {userAuth} from 'services/auth/User'; 
import { Link as RouteLink } from 'react-router-dom';
import swal from 'sweetalert';
import CircularProgress from '@material-ui/core/CircularProgress';

export default function ResetPasswordForm(props) {
  const classes = MaterialInputForm.useStyles();
  document.title = "Reset Password"

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
            Reset
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
  
  const [loadingField, setLoadingField] = useState({
    isLoading : false, 
  })   

  const submit = e => {
    e.preventDefault();
    let validatorsField = ["username", "email"]; 
    if(validatorHelper.isFormValid(validatorHelper.validators, validatorsField)){
      setLoadingField({isLoading: true})
      const data = {
        'username': usernameField.value, 
        'email': emailField.value
      }
      userAuth.resetPassword(data)
      .then(res => {
        swal("Hello, " + usernameField.value, "We send new password to " + emailField.value + ". You can check", "success")
        .then(() => {
          props.history.push("/login"); 
        })
      })
      .catch(err => {
        if(err.response){
          swal("Sorry!", err.response.data.message , "error")
          .then(() => {
            setLoadingField({isLoading: false})
          })
        }
        else if(err.request){
          props.history.push('/servererror');
        }
      })
    }
    else {
      swal("Sorry!", "wrong input" , "error");
    }
  }

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
          Reset Password
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
          </Grid>
          {ToolHandlingFormChange}
        </form>
        {ToolLoadingFormChange}
      </div>
    </Container>
  );
}