'use client';

import { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import { SignInContainer, ButtonsContainer, AuthErrorMessage } from './sign-in-form.styles';
import Button, { BUTTON_TYPE_CLASSES } from '@/components/button/button.component';
import FormInput from '@/components/form-input/form-input.component';
import { useDispatch, useSelector } from 'react-redux';
import { googleSignInStart, emailSignInStart } from '@/store/user/user.action';
import { selectUserIsLoading, selectUserError } from '@/store/user/user.selector';
import { getAuthErrorMessage } from '@/utils/auth/auth-error.utils';

const defaultFormFields = {
  email: '',
  password: '',
};

const SignInForm = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectUserIsLoading);
  const error = useSelector(selectUserError);
  const [formFields, setFormFields] = useState(defaultFormFields);
  const [submitted, setSubmitted] = useState(false);
  const { email, password } = formFields;

  const signInWithGoogle = () => {
    dispatch(googleSignInStart());
  };

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
    dispatch(emailSignInStart(email, password));
  };

  useEffect(() => {
    if (submitted && !isLoading && !error) {
      resetFormFields();
      setSubmitted(false);
    }
  }, [submitted, isLoading, error]);

  const errorMessage = getAuthErrorMessage(error);

  return (
    <SignInContainer>
      <h2>Already have an account?</h2>
      <span>Sign in with your email and password</span>
      {errorMessage && <AuthErrorMessage>{errorMessage}</AuthErrorMessage>}
      <form onSubmit={handleSubmit}>
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
        <ButtonsContainer>
          <Button type="submit" isLoading={isLoading}>
            Sign In
          </Button>
          <Button
            type="button"
            buttonType={BUTTON_TYPE_CLASSES.google}
            onClick={signInWithGoogle}
            isLoading={isLoading}
          >
            Google sign in
          </Button>
        </ButtonsContainer>
      </form>
    </SignInContainer>
  );
};

export default SignInForm;