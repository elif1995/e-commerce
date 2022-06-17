import { useState, useContext } from "react"

import FormInput from '../../components/form-input/form-input.component'

import {createAuthUserWithEmailAndPassword, createUserDocumentFromAuth} from '../../utils/firebase/firebase.utils'
import './sign-up-form.styles.scss'
import Button from '../button/button.component'
import { UserContext } from "../../contexts/user.context";

const defaultFormFields = {
    displayName:'',
    email:'',
    password:'',
    confirmPassword:'',
}


const SignUpForm = () => {

    
    const [formFields, setFormFields] = useState(defaultFormFields);
    const {displayName, email, password, confirmPassword} = formFields;
    const { setCurrentUser } = useContext(UserContext)
    console.log(formFields)

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();


        if(formFields.password !== formFields.confirmPassword){
            alert("passwords do not match");
            return;
        }

        
        try{
            const {user} = await createAuthUserWithEmailAndPassword(email, password);

            setCurrentUser(user)
            
            await createUserDocumentFromAuth(user, {displayName});
            resetFormFields();
        } 
        
        catch(error){
            if(error.code === "auth/email-already-in-use"){
                alert("Cannot create user, email already in use")
            }else{
                console.log("user creation encountered an error",error);
            }
                
        }

    }



    const handleChange = (event) => {
        
        const {name, value} = event.target;


        setFormFields({...formFields,[name]:value})

    }

    return(
        <div className="sign-up-container">
            <h2>Don't have an account?</h2>
            <span> Sign up with your email and password </span>
            <form onSubmit={handleSubmit}>
                
                <FormInput label="Display Name" type="text" name='displayName' required onChange={handleChange} value={displayName}/>

                
                <FormInput label="Email" type="email" name='email' required onChange={handleChange} value={email}/>

                
                <FormInput label="Password" type="password" name='password' required onChange={handleChange} value={password}/>

                
                <FormInput label="Confirm Password" type="password" name='confirmPassword' required onChange={handleChange} value={confirmPassword}/>

                <Button  type="submit" >Sign Up</Button>
            </form>
        </div>
    )
}

export default SignUpForm