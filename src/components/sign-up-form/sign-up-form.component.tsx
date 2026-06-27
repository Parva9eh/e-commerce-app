'use client';

import {useState, FormEvent, ChangeEvent} from "react";
import { useDispatch } from "react-redux";
import {SignUpContainer} from "./sign-up-form.styles";
import Button from "../button/button.component";
import FormInput from "../form-input/form-input.component";
import { signUpStart } from "../../store/user/user.action";


const defaultFormFields  = {
    displayName:"",
    email:"",
    password:"",
    confirmPassword:""
}

const SignUpForm = () => {
    const dispatch = useDispatch();
    const [formFields, setFormFields] = useState(defaultFormFields);
    const {displayName, email, password, confirmPassword} = formFields;

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
      };

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setFormFields({...formFields, [name]: value})
    }

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if(password !== confirmPassword) {
            alert("Password do not match!")
            return;
        }
        dispatch(signUpStart(email, password, displayName));
        resetFormFields();

    }
    return(
        <SignUpContainer>
            <h2>Don't have an account?</h2>
            <span>Sign Up with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput label="Display Name" required type="text" onChange={handleChange} name="displayName" value={displayName}/>

                <FormInput label="Email" required type="email" onChange={handleChange} name="email" value={email}/>

                <FormInput label="Password" required type="password" onChange={handleChange} name="password" value={password}/>

                <FormInput label="Confirm password" required type="password" onChange={handleChange} name="confirmPassword" value={confirmPassword}/>
                <Button type="submit">Sign up</Button>
            </form>
        </SignUpContainer>
    )
}
export default SignUpForm;