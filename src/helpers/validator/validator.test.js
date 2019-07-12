import { validatorHelper } from 'helpers';

test('test const', () => {
  expect(
    validatorHelper.isFormValid(validatorHelper.validators, ['username'])
  ).toBe(false);
});

const arrayInputOutputUsername = [
  {
    input: 'nguyenduychien',
    output: true
  }, 
  {
    input: 'nguyenduychien.',
    output: false
  }, 
  {
    input: 'Nguyenduychien',
    output: true
  }, 
  {
    input: 'nguyenduy chien',
    output: false
  }, 
  {
    input: 'nguy',
    output: false
  }, 
  {
    input: '_nguyenduychien', 
    output: false
  }, 
  {
    input: 'nguyen@duy_chien', 
    output: false
  }, 
  {
    input: 'nguyen@', 
    output: false
  }
]

describe('test valid input username', () => {
  arrayInputOutputUsername.forEach(e => {
    test(`test for username ${e.input}`, () => {
  
      validatorHelper.resetValidators(); 
      validatorHelper.updateValidation('username', e.input, validatorHelper.validators); 
      validatorHelper.displayValidationErrors('username', validatorHelper.validators); 
      expect(
        validatorHelper.isFormValid(validatorHelper.validators, ['username'])
      ).toBe(e.output); 
    })
  })
});
