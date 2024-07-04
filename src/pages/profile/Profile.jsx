// import React from 'react'
import './Profile.css'
import { Link, useNavigate } from 'react-router-dom';
// MUI 
import Avatar from '@mui/material/Avatar';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import IconButton from '@mui/material/IconButton';
import GitHubIcon from '@mui/icons-material/GitHub';
import FacebookIcon from '@mui/icons-material/Facebook';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import { Container } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';
//
// Firebase
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, db } from '../../firebase/config'
import { useDocument } from 'react-firebase-hooks/firestore'
import { doc } from 'firebase/firestore'


import MyPosts from '../../components/category/myPosts/MyPosts';




const Profile = () => {
    const [user, loadingg, errorr] = useAuthState(auth)
    const [value, loading, error] = useDocument(doc(db, 'users', `${user?.uid}`))



    const navigate = useNavigate()

    if(!user && !loading){
        navigate('/register')
    }

    if(loading){
        return(
            <div className="profile-page">
                <div className="header">
    
                    <div className="banner-user">
                        <Skeleton variant="rectangular" width='100%' height='100%' />
                    </div>

                    <div className="user-info">
                        <div className="img">
                        <Skeleton variant="circular" width='97%' height='97%'/>
                        </div>

                        <Skeleton variant="rectangular" width='140px' height='17px' sx={{my:2}} />
                        <Skeleton variant="rectangular" width='140px' height='17px' />
                        
                        
                        <div className="btn">
                            <Link>
                                <Skeleton variant="rounded" width={150} height={45} />
                            </Link>
                            <Link > 
                                <Skeleton variant="rounded" width={150} height={45} />
                            </Link>
                        </div>
                    </div>

                </div>
            </div>
        )
    }


    if(value){
        return (
            <div className='profile-page'>
                {/* start header */}
                <div className="header">
    
                    <div className="banner-user">
                        <img src={value.data().banner ? value.data().banner : "images/backgrounds/6.jpg"} alt="banner" />
                        <div className="social-media">
                            {value.data().media.linkdin && (
                                <IconButton>
                                    <LinkedInIcon />
                                </IconButton>
                            )}
                            {value.data().media.github && (
                                <IconButton>
                                    <GitHubIcon />
                                </IconButton>
                            )}
                            {value.data().media.facebook && (
                                <IconButton>
                                    <FacebookIcon />
                                </IconButton>
                            )}
                            {value.data().media.whatsApp && (
                                <IconButton>
                                    <WhatsAppIcon />
                                </IconButton>
                            )}
                        </div>
                    </div>
    
                    <div className="user-info">
                        <div className="img">
                            <Avatar src={value.data().photo ? value.data().photo : '...'}  alt={value.data().username} sx={{width:'97%', height:'97%'}} />
                        </div>

                        <span className='name'>{value.data().username}</span>
                        <h5>{value.data().email}</h5>
                        
                        <div className="follow">
                            <span> <h5>{value.data().followers.length}</h5> followers</span>
                            <h6>-</h6>
                            <span><h5>{value.data().following.length}</h5> following</span>
                        </div>
                        
                        <div className="btn">
                            <Link to="/edit-profile">
                                <Button variant="outlined">edit profile</Button>
                            </Link>
                            <Link to="/add-post"> 
                                <Button variant="contained" className='bg'>create post</Button>
                            </Link>
                        </div>
                    </div>
    
                </div>
                {/* end header */}

                <Divider  sx={{mx:3}}>
                    <Chip label="My Posts" size="small" />
                </Divider>

                <Container maxWidth="" >
                    <MyPosts id={value.data().id}/>
                </Container>


            </div>
        )
    }
}

export default Profile