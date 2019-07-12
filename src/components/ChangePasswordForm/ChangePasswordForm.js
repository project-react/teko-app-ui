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
import swal from 'sweetalert';
import Auth from 'services/auth';

export default function ChangePasswordForm() {
  const classes = MaterialInputForm.useStyles();
  document.title = "ChangePasswordForm"

  const [passwordField, setPasswordField] = useState({
    value: '', 
    error: '', 
    isError: false
  })

  const [newpasswordField, setnewpasswordField] = useState({
    value: '', 
    error: '', 
    isError: false
  })

  const onClick = (e) => {
    e.preventDefault();
    let validatorsField = ["password", "newpassword"]; 
    if(validatorHelper.isFormValid(validatorHelper.validators, validatorsField)){
      const data = {
        'token' : localStorage.getItem('token'), 
        'password' : passwordField.value, 
        'newpassword' : newpasswordField.value, 
      }
      Auth.changePassword(data)
      .then(res => {
        swal("Change Password Success", "success")
      })
      .catch(err => {
        swal("Sorry!", "Data Error" , "error");
      })
    } else {
      swal("Sorry!", "wrong input format" , "error");
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
          Change Password
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
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
                name="newpassword"
                variant="outlined"
                required
                fullWidth
                id="newpassword"
                label="New Password"
                autoFocus
                type="password"
                textField={newpasswordField}
                setChange={setnewpasswordField}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={onClick}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="#" variant="body2">
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