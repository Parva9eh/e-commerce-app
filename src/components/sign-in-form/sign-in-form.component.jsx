import {useState} from "react";
import {SignInContainer, ButtonsContainer} from "./sign-in-form.styles";
import Button, {BUTTON_TYPE_CLASSES} from "../button/button.component";
import FormInput from "../form-input/form-input.component";
import {
    signInWithGooglePopup,
    createUserDocumentFromAuth,
    signInAuthUserWithEmailAndPassword,
  } from '../../utils/firebase/firebase.utils';
  
const defaultFormFields  = {
    email:"",
    password:""
}

const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const {email, password} = formFields;

    const signInWithGoogle = async () => {
        const { user } = await signInWithGooglePopup();
        await createUserDocumentFromAuth(user);
      };

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
      };

    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormFields({...formFields, [name]: value})
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            await signInAuthUserWithEmailAndPassword(email, password);
            resetFormFields();
        } catch (error) {
            switch (error.code) {
            case 'auth/wrong-password':
                alert('incorrect password for email');
                break;
            case 'auth/user-not-found':
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