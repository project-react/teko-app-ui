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
import Auth  from 'services/auth'; 
import { Link as RouteLink } from 'react-router-dom';
import swal from 'sweetalert';

export default function ResetPasswordForm() {
  const classes = MaterialInputForm.useStyles();
  document.title = "Reset Password"

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
  
  const submit = e => {
    e.preventDefault();
    let validatorsField = ["username", "email"]; 
    if(validatorHelper.isFormValid(validatorHelper.validators, validatorsField)){
      const data = {
        'username': usernameField.value, 
        'email': emailField.value
      }
      Auth.resetPassword(data)
      .then(res => {
        console.log(res.data.message); 
        swal("Hello, " + usernameField.value, "We are send new password to " + emailField.value + ". You can check", "success"); 
      })
      .catch(err => {
        console.log(err.response.data.message); 
        swal("Sorry!", err.response.data.message , "error");
      })
    }
    else {
      swal("Sorry!", "wrong input" , "error");
    }
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
        </form>
      </div>
      <Box mt={5}>
        <MaterialInputForm.MadeWithLove />
      </Box>
    </Container>
  );
}