import React from 'react';
import TextField from '@material-ui/core/TextField';
import { Helpers } from 'helpers';

const InputText = props => {
  const { textField, setChange } = props; 
  const onChange = e => {
    Helpers.updateValidation(props.name, e.target.value, Helpers.validators);
    let ArrayError = Helpers.displayValidationErrors(props.name, Helpers.validators); 
    let isError = true;
    if(ArrayError.length === 0){
      isError = false; 
    }
    setChange({
      value: e.target.value,
      error: ArrayError[0], 
      isError: isError
    });
  };
  return (
    <TextField
      autoComplete={props.autoComplete}
      name={props.name}
      variant={props.variant}
      required={props.required}
      fullWidth={props.fullWidth}
      id={props.id}
      label={props.label}
      autoFocus={props.autoFocus}
      onChange={onChange}
      type={props.type}
      error={textField.isError}
      value={textField.value}
      helperText={textField.error}
    />
  );
};
export default InputText;
