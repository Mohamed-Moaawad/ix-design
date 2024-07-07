// import React from 'react'
import './ForgotPassword.css'
import { useState } from 'react';
// MUI
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
// MUI Icons
import CheckIcon from '@mui/icons-material/Check';
import MarkEmailUnreadOutlinedIcon from '@mui/icons-material/MarkEmailUnreadOutlined';
//
import { Link } from 'react-router-dom';
//
// Firebase
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../../../firebase/config';
import LoaderSpinner from '../../../loader/LoaderSpinner';
//








const ForgotPassword = () => {
    const [showMessage, setShowMessage] = useState(false)
// loader Spinner
    const [loader, setLoader] = useState(false)


    // User data variables
    const [ email, setEmail ] = useState('')
    // User type variables
    const [ errorEmail, setErrorEmail ] = useState(false)
    // User Message variables
    const [ errorEmailMss, setErrorEmailMss ] = useState('')


    // Function Reset Password
    const resetPassword = async(e)=>{
        e.preventDefault()
        
        setLoader(true)

        await sendPasswordResetEmail(auth, email)
        .then(() => {
            // Password reset email sent!
            // ..
            setEmail('')
            setShowMessage(true)

            setTimeout(()=>{
                setShowMessage(false)
            },6000)
        })
        .catch((error) => {
            const errorCode = error.code;
            // const errorMessage = error.message;
            // ..

            if(errorCode === 'auth/missing-email'){
                setErrorEmail(true)
                setErrorEmailMss('Please enter an email address.')
            }
            if(errorCode === "auth/invalid-email" && email !== "" && !email.match(/^[^ ]+@[^ ]+\.[a-z]{2,3}$/)){
                setErrorEmail(true)
                setErrorEmailMss("Please include an '@' and ' . ' in the email address. ")
            }
        });

        setLoader(false)

    }


    
    return (
        <div className="forgot-password-page">
            <Alert 
            sx={{right: showMessage ? '-5px' : '-200%'}} 
            className='alert-message-success' icon={<CheckIcon fontSize="inherit" />} severity="success">
                    we`ve resent the confirmation ot email, Check your inbox.
                <span className='success-line' style={{ width: showMessage && '100%' }}></span>
            </Alert>
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
                <Paper elevation={3} sx={{p:2 , width:'100%'}}>
                    <form action="">
                        <div className="icon">
                            <MarkEmailUnreadOutlinedIcon />
                        </div>

                        <h3>Enter your email address</h3>

                        <p>To reset your password, please enter your email address you may have used with ix-desidn.</p>


                        <TextField id="standard-basic" label="Email" variant="standard"
                        value={email} 
                        onChange={(e)=>{
                            setEmail(e.target.value)
                            setErrorEmail(false)
                        }}
                        error={errorEmail}
                        helperText={errorEmail && errorEmailMss}
                        />
                        <div className="btn-submit">
                            <Button type='submit' variant="contained" onClick={resetPassword} disabled={loader}>
                                {loader ? (
                                    <LoaderSpinner />
                                ) : (
                                    'Continue'
                                )}
                                
                            </Button>
                        </div>

                        <Link to="/register/signin">sign in</Link>

                    </form>

                </Paper>
            </Box>
        </div>
    )
}

export default ForgotPassword