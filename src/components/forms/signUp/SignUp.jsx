import React, { useState } from 'react'
import './SignUp.css'
// MUI
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Divider, FormHelperText } from '@mui/material';

import { Link, useNavigate } from 'react-router-dom';
//
// Firebase
import { createUserWithEmailAndPassword, signInWithPopup, updateProfile } from 'firebase/auth';
import { auth, db, provider } from '../../../firebase/config';
import LoaderSpinner from '../../loader/LoaderSpinner';
import { doc, setDoc } from 'firebase/firestore';







const SignUp = () => {
    // --> Function MUI show and hide password 
    const [showPassword, setShowPassword] = React.useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
/////////////////////////////////

// loader Spinner
const [loader, setLoader] = useState(false)

    
    // User data variables
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    // Errors type variables
    const [errorName, setErrorName] = useState(false)
    const [errorEmail, setErrorEmail] = useState(false)
    const [errorPassword, setErrorPassword] = useState(false)
    // Errors Message variables
    const [errorNameMss, setErrorNameMss] = useState('')
    const [errorEmailMss, setErrorEmailMss] = useState('')
    const [errorPasswordMss, setErrorPasswordMss] = useState('')
/////////////////////////////////

    
    const navigate = useNavigate()



    // Function Create New User
    const createNewUser = async(e)=>{
        e.preventDefault()

        setLoader(true)

        if(name !== '' && name.includes(' ')){
            await createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed up 
                const user = userCredential.user;
                // ...
                updateProfile(auth.currentUser, {
                    displayName: name,
                }).then(() => {
                    // Profile updated!
                    // ...
                }).catch((error) => {
                    // An error occurred
                    // ...
                    console.log("error name ",error);
                });


                // add User in FireStore
                setDoc(doc(db, "users", `${user.uid}`),{
                    id: user.uid,
                    username: name,
                    email,
                    photo:'',
                    banner:'',
                    followers:[],
                    following:[],
                    media:[]
                })


                navigate('/register/signin')

            })
            .catch((error) => {
                const errorCode = error.code;
                // const errorMessage = error.message;
                console.log(errorCode);


                if(errorCode === "auth/invalid-email" && email === ""){
                    setErrorEmail(true)
                    setErrorEmailMss('Please enter an email address.')
                }
                if(errorCode === "auth/invalid-email" && email !== "" && !email.match(/^[^ ]+@[^ ]+\.[a-z]{2,3}$/)){
                    setErrorEmail(true)
                    setErrorEmailMss("Please include an '@' and ' . ' in the email address. ")
                }
                if(errorCode === "auth/missing-password"){
                    setErrorPassword(true)
                    setErrorPasswordMss('Please enter an password.')
                }
                if(errorCode === "auth/weak-password"){
                    setErrorPassword(true)
                    setErrorPasswordMss('password must be at least 6 char')
                }

            });


        }else{
            if(name !== '' && !name.includes(' ')){
                setErrorName(true)
                setErrorNameMss('Please name must contain a space between the first name and last name.')
            }else{
                setErrorName(true)
                setErrorNameMss('Please enter your name')
            }
        }
        
        setLoader(false)
        
    }
/////////////////////////////////


// Function Sign up With Google
    const signUpWithGoogle = async()=>{
        await signInWithPopup(auth, provider)
        .then((userCredential) => {
            // Signed up 
            const user = userCredential.user;

            setDoc(doc(db, 'users', `${user.uid}`),{
                id: user.uid,
                username: user.displayName,
                email: user.email,
                provider: 'Google',
                photo: user.photoURL,
                banner:'',
                followers:[],
                following:[],
                media:[]
            })

            setTimeout(()=>{
                navigate('/')
            },3000)


        })
        .catch((error) => {
            console.log(error);

        });

    }





    return (
        <div className='sign-up-page'>
            <Box 
                sx={{
                display: 'flex',
                flexWrap: 'wrap',
                '& > :not(style)': {
                    m: 1,
                    // minWidth: 128,
                    // minHeight: 128,
                },
                }}
                className='box-container'
            >
                <Paper elevation={4} sx={{p:2 , width:'100%'}}>
                    <form className='form'>
                        <img className='small-logo' src="images/Logo/logo-text.png" alt="logo" />
                        
                        <h6>step 1 of 2</h6>
                        
                        <h3>Create an account</h3>
                        
                        <Button variant='contained' className='btn-google'
                            onClick={signUpWithGoogle}
                        >
                            <span className='icon-google'>
                                <img src="images/register/google_icon.svg" alt="icon" />
                            </span>
                                Sign up with Google
                        </Button>

                        <Divider sx={{mb:2}}>or</Divider>

                        <h6>Sign up with email</h6>
                        <p>Already have an account? <Link to='signin'>Sign in</Link></p>
                        {/* name */}
                        <TextField type='text' label="UserName" variant="standard"
                            value={name}
                            required
                            onChange={(e)=> {
                                setName(e.target.value)
                                setErrorName(false)
                            }}

                            error={errorName}
                            helperText={errorName && errorNameMss}
                        />
                        {/* email */}
                        <TextField type='email' label="Email" variant="standard"  required
                            value={email}
                            onChange={(e)=>{
                                setEmail(e.target.value)
                                setErrorEmail(false)
                            } }

                            error={errorEmail}
                            helperText={errorEmail && errorEmailMss}
                        />
                        {/* Password */}
                        <FormControl variant="standard">
                                <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                                <Input
                                    id="standard-adornment-password"
                                    type={showPassword ? 'text' : 'password'}
                                    endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        // onMouseDown={handleMouseDownPassword}
                                        >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                    }
                                    value={password}
                                    onChange={(e)=>{
                                        setPassword(e.target.value)
                                        setErrorPassword(false)
                                    }} 

                                    error={errorPassword}
                                    // focused={'true'}
                                    autoFocus={errorPassword}
                                />
                                <FormHelperText sx={{color:'#d32f2f'}}>{errorPassword && errorPasswordMss.toString()}</FormHelperText>
                        </FormControl>

                        <div className="btn-submit">
                            <Button type='submit' variant="contained" onClick={createNewUser} disabled={loader}>
                                {loader ? (
                                    <LoaderSpinner />
                                ) : (
                                    'continue'
                                )}
                            </Button>
                        </div>
                    </form>
                </Paper>
            </Box>
        </div>

    )
}

export default SignUp