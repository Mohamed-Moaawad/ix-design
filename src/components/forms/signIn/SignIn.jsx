import React, { useState } from 'react'
import './SignIn.css'
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
//
//
import { Link, useNavigate } from 'react-router-dom';
// Firebase
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../firebase/config';
import { FormHelperText } from '@mui/material';
import LoaderSpinner from '../../loader/LoaderSpinner';




const SignIn = () => {
    // --> Function MUI show and hide password 
    const [showPassword, setShowPassword] = React.useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
/////////////////////////////////
    // loader Spinner
const [loader, setLoader] = useState(false)


    // User data variables
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')
    // Error type variables
    const [ errorEmail, setErrorEmail ] = useState(false)
    const [ errorPassword, setErrorPassword ] = useState(false)
    // Error message variables
    const [ errorEmailMss, setErrorEmailMss ] = useState('')
    const [ errorPasswordMss, setErrorPasswordMss ] = useState('')



    const navigate = useNavigate()


    // Function Sign in User
    const signInUser = async (e)=>{
        e.preventDefault()

        setLoader(true)

        await signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            // ...
            navigate('/', {replace: true})
        })
        .catch((error) => {
            const errorCode = error.code;
            // const errorMessage = error.message;
            console.log(errorCode);

            if(errorCode === 'auth/invalid-email' && email === ''){
                setErrorEmail(true)
                setErrorEmailMss('Please enter an email address.')
            }
            if(errorCode === "auth/invalid-email" && email !== "" && !email.match(/^[^ ]+@[^ ]+\.[a-z]{2,3}$/)){
                setErrorEmail(true)
                setErrorEmailMss("Please include an '@' and ' . ' in the email address. ")
            }
            if(errorCode == 'auth/invalid-credential'){
                setErrorEmail(true)
                setErrorEmailMss("We do not have an account with this data.")
            }
            if(errorCode === "auth/missing-password"){
                setErrorPassword(true)
                setErrorPasswordMss('Please enter an password.')
            }

        });

        setLoader(false)

    }
    


        return (
        <div className='sign-in-page'>
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
                        
                        
                        <h3>Sign in</h3>

                        <p className='new-user'>New user? <Link to='/register'>Create an account</Link></p>

                        {/* Email */}
                        <TextField type='email'  label="Email" variant="standard" 
                            value={email}
                            onChange={(e)=>{
                                setEmail(e.target.value)
                                setErrorEmail(false)
                            }}
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
                                />
                                <FormHelperText sx={{color: '#d32f2f'}}>{errorPassword && errorPasswordMss}</FormHelperText>
                        </FormControl>

                            <Link to='/register/forgot-password' className='forgot'>forgot your password ?</Link>

                        <div className="btn-submit">
                            <Button type='submit' variant="contained" onClick={signInUser} disabled={loader}>
                                {loader ?(
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

export default SignIn