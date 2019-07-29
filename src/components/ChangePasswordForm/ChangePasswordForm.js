import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
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
import CircularProgress from '@material-ui/core/CircularProgress';

export default function ChangePasswordForm(props) {
  const classes = MaterialInputForm.useStyles();
  document.title = "ChangePasswordForm"

  const ToolHandlingForm = () => {
    return (
      <div>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={onClick}
        >
          Change password
        </Button>
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

  const [loadingField, setLoadingField] = useState({
    isLoading : false, 
  })   

  const onClick = (e) => {
    e.preventDefault();
    let validatorsField = ["password", "newpassword"]; 
    if(validatorHelper.isFormValid(validatorHelper.validators, validatorsField)){
      setLoadingField({isLoading: true})
      const data = {
        'token' : localStorage.getItem('token'), 
        'password' : passwordField.value, 
        'newpassword' : newpasswordField.value, 
      }
      Auth.changePassword(data)
      .then(res => {
        swal("Change Password Success", "success")
        .then(() => {
          props.history.push("/home"); 
        })
      })
      .catch(err => {
        if(err.response) {
          swal("Sorry!", err.response.data.message , "error")
          .then(() => {
            setLoadingField({isLoading: false})
          })
        }
        else if(err.request) {
          props.history.push("/servererror");
        }
      })
    } else {
      swal("Sorry!", "wrong input format" , "error");
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