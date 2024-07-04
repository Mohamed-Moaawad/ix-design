// import React from 'react'
import { Button, Container } from '@mui/material';
import './NotFoundPage.css'
// MUI
import Grid from '@mui/material/Grid';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
    
    return (
        <div className='not-found-page'>
            <Container maxWidth='xl'>
                <Grid container sx={{alignItems:'center', justifyItems:'center'}}>
                    <Grid item xs={12} className='grid-item'>
                        <div className="img">
                            <img src="../../../public/images/404/Oops! 404 Error with a broken robot-amico.svg" alt="404" />
                        </div>
                    </Grid>
                    <Grid item xs={12} className='grid-item'>
                        <div className="text">
                            <h3>404 - page not found</h3>
                            <p>The page you are looking for may have been removed
                            Its name has changed or is temporarily unavailable.</p>
                            <Link to='/'>
                                <Button variant="contained">go to home</Button>
                            </Link>
                        </div>
                    </Grid>
                </Grid>
            </Container>
        </div>
    )
}

export default NotFoundPage