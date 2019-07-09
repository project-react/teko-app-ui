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
import { Helpers } from 'helpers';
import Auth from 'services/auth'
import swal from 'sweetalert';

export default function RegisterForm(props) {
  const classes = MaterialInputForm.useStyles();
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
  const submit = e => {
    e.preventDefault();
    swal("Oops!", "Something went wrong!", "error");
    let validatorsField = ["username", "email", "password", "confirmpassword"]; 
    if(Helpers.isFormValid(Helpers.validators, validatorsField)){
      const data = {
        'email': emailField.value, 
        'username': usernameField.value, 
        'password': passwordField.value
      }
      Auth.register(data)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err.response); 
      })
    }
  };
  document.title = 'Register';
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
              <Link href="/Login" variant="body2">
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
