import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
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

export default function LoginForm(props) {
  const classes = MaterialInputForm.useStyles();
  document.title = "Login";  

  const [usernameField, setUsernameField] = useState({
    value: '',
    error: '', 
    isError: false
  });
  
  const [passwordField, setPasswordField] = useState({
    value: '', 
    error: '', 
    isError: false
  })
  
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Login
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
          </Grid>
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Login
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="/ResetPassword" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/Register" variant="body2">
                {"Don't have an account? Sign Up"}
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