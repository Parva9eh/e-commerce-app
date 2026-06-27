'use client';

import {useState, FormEvent, ChangeEvent} from "react";
import { AuthError, AuthErrorCodes } from "@firebase/auth";
import {SignInContainer, ButtonsContainer} from "./sign-in-form.styles";
import Button, {BUTTON_TYPE_CLASSES} from "../button/button.component";
import FormInput from "../form-input/form-input.component";
import { useDispatch } from "react-redux";
import { googleSignInStart, emailSignInStart } from "../../store/user/user.action";

const defaultFormFields  = {
    email:"",
    password:""
}

const SignInForm = () => {
    const dispatch = useDispatch();
    const [formFields, setFormFields] = useState(defaultFormFields);
    const {email, password} = formFields;

    const signInWithGoogle = async () => {
        dispatch(googleSignInStart());
      };

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
      };

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setFormFields({...formFields, [name]: value})
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            dispatch(emailSignInStart(email, password));
            resetFormFields();
        } catch (error) {
            switch ((error as AuthError).code) {
            case AuthErrorCodes.INVALID_PASSWORD:
                alert('incorrect password for email');
                break;
            case AuthErrorCodes.NULL_USER:
                alert('no user associated with this email');
                break;
            default:
                console.log(error);
            }
        }
    };
    return(
        <SignInContainer>
            <h2>Already have an account?</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput label="Email" required type="email" onChange={handleChange} name="email" value={email}/>
                <FormInput label="Password" required type="password" onChange={handleChange} name="password" value={password}/>
                <ButtonsContainer>
                    <Button type='submit'>Sign In</Button>
                    <Button type='button' buttonType={BUTTON_TYPE_CLASSES.google} onClick={signInWithGoogle}>
                        Google sign in
                    </Button>
                </ButtonsContainer>
            </form>
        </SignInContainer>
    )
}
export default SignInForm;