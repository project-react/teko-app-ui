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
import { validatorHelper } from 'helpers/validator';
import Auth from 'services/auth';
import { Link as RouteLink } from 'react-router-dom';
import swal from 'sweetalert';
import CircularProgress from '@material-ui/core/CircularProgress';

export default function LoginForm(props) {
  const classes = MaterialInputForm.useStyles();
  document.title = 'Login';
  const ToolHandlingForm = () => {
    return (
      <div>
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
          onClick={submit}
        >
          Login
        </Button> 
        <Grid container>
          <Grid item xs>
            <Link to="/ResetPassword" variant="body2" component={RouteLink}>
              Forgot password?
            </Link>
          </Grid>
          <Grid item>
            <Link to="/Register" variant="body2" component={RouteLink}>
              {' '}
              Register
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
    isError: false,
  });

  const [passwordField, setPasswordField] = useState({
    value: '',
    error: '',
    isError: false,
  });

  const [loadingField, setLoadingField] = useState({
    isLoading : false, 
  })  

  const submit = e => {
    e.preventDefault();
    let validatorsField = ['username', 'password'];
    if (
      validatorHelper.isFormValid(validatorHelper.validators, validatorsField)
    ) {
      setLoadingField({isLoading: true}); 
      const data = {
        username: usernameField.value,
        password: passwordField.value,
      };
      Auth.login(data)
        .then(res => {
          let expiredTime = Date.now() + 1800000;
          swal(
            'Hello, ' + usernameField.value,
            'Auto Logout before 30 minutes',
            'success',
          ).then(() => {
            localStorage.setItem('username', usernameField.value);
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('time', expiredTime);
            props.history.push('/Home');
          });
        })
        .catch(err => {
          console.log(err.response.data.message);
          swal('Sorry!', err.response.data.message, 'error');
          setLoadingField({isLoading: false});
        });
    } else {
      swal('Sorry!', 'wrong input format', 'error');
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
