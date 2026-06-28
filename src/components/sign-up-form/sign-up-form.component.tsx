'use client';

import { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SignUpContainer, AuthErrorMessage } from './sign-up-form.styles';
import Button from '@/components/button/button.component';
import FormInput from '@/components/form-input/form-input.component';
import { signUpStart } from '@/store/user/user.action';
import { selectUserIsLoading, selectUserError } from '@/store/user/user.selector';
import { getAuthErrorMessage } from '@/utils/auth/auth-error.utils';

const defaultFormFields = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const SignUpForm = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectUserIsLoading);
  const error = useSelector(selectUserError);
  const [formFields, setFormFields] = useState(defaultFormFields);
  const [submitted, setSubmitted] = useState(false);
  const { displayName, email, password, confirmPassword } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert('Password do not match!');
      return;
    }

    setSubmitted(true);
    dispatch(signUpStart(email, password, displayName));
  };

  useEffect(() => {
    if (submitted && !isLoading && !error) {
      resetFormFields();
      setSubmitted(false);
    }
  }, [submitted, isLoading, error]);

  const errorMessage = getAuthErrorMessage(error);

  return (
    <SignUpContainer>
      <h2>Don't have an account?</h2>
      <span>Sign Up with your email and password</span>
      {errorMessage && <AuthErrorMessage>{errorMessage}</AuthErrorMessage>}
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Display Name"
          required
          type="text"
          onChange={handleChange}
          name="displayName"
          value={displayName}
        />
        <FormInput
          label="Email"
          required
          type="email"
          onChange={handleChange}
          name="email"
          value={email}
        />
        <FormInput
          label="Password"
          required
          type="password"
          onChange={handleChange}
          name="password"
          value={password}
        />
        <FormInput
          label="Confirm password"
          required
          type="password"
          onChange={handleChange}
          name="confirmPassword"
          value={confirmPassword}
        />
        <Button type="submit" isLoading={isLoading}>
          Sign up
        </Button>
      </form>
    </SignUpContainer>
  );
};

export default SignUpForm;