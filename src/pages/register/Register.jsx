// // import React from 'react'
import './Register.css'
// MUI
import { Box } from '@mui/material'
import Grid from '@mui/material/Grid';

// components
import SignUp from '../../components/forms/signUp/SignUp';
import SignIn from '../../components/forms/signIn/SignIn';

import { useLocation} from 'react-router-dom'
import ForgotPassword from '../../components/forms/signIn/forgotPassword/ForgotPassword';

const Register = () => {
    const location = useLocation()
    return (
        <Box className="register-page" sx={{flexGrow:1}}>
            <Grid container sx={{height:'100%'}}>
                <Grid item sm={5} className='grid-item grid-logo-image'>
                    <img src="/images/Logo/logo-text-w.png" alt="logo" />
                </Grid>
                <Grid item xs={12} sm={7}  className='grid-item'>
                    {location.pathname === "/register"  && <SignUp />}
                    {location.pathname === "/register/signin" && <SignIn />}
                    {location.pathname === "/register/forgot-password" && <ForgotPassword />}
                </Grid>
            </Grid>
        </Box>
    )
}

export default Register
