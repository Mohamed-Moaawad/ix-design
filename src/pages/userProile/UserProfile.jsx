// import React from 'react'
import { useEffect, useState } from 'react';
import './UserProfile.css'
import { Link, useNavigate, useParams } from 'react-router-dom';
// MUI 
import Avatar from '@mui/material/Avatar';
import Skeleton from '@mui/material/Skeleton';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import { Button, Container } from '@mui/material';
//
// Firebase
import { useDocument } from 'react-firebase-hooks/firestore';
import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../../firebase/config';
import { useAuthState } from 'react-firebase-hooks/auth';


import UserPosts from '../../components/category/userPosts/UserPosts';





const UserProfile = () => {
    const { id } = useParams()

    const [value, loading, error] = useDocument(doc(db, 'users', `${id}`))

    const [user, loadingg, errorr] = useAuthState(auth)

    const navigate = useNavigate()

    useEffect(()=>{
        if(id === user?.uid){
            navigate('/profile', {replace: true})
        }
    },[])


    const [inFollow, setInFollow] = useState(false)

    // Function add follow
    const addfollow = async()=>{

        if(user){
            if(value.data().followers.includes(user.uid)){
                await updateDoc(doc(db, 'users', id),{
                    followers: arrayRemove(user.uid)
                })
                await updateDoc(doc(db, 'users', user.uid),{
                    following: arrayRemove(value.data().id)
                })
                setInFollow(false)
            }else{
                await updateDoc(doc(db, 'users', id),{
                    followers: arrayUnion(user.uid)
                })
                await updateDoc(doc(db, 'users', user.uid),{
                    following: arrayUnion(value.data().id)
                })
                setInFollow(true)
            }
        }else{
            navigate('/register')
        }

    }



    if(loading){
        return(
            <div className="user-profile-page">
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
            <div className="user-profile-page">
                {/* start header */}
                    <div className="header">
    
                        <div className="banner-user">
                            <img src={value.data().banner ? value.data().banner : '/images/backgrounds/6.jpg'} alt="banner" />
                            {/* <div className="social-media">
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
                            </div> */}
                        </div>
    
                        <div className="user-info">
                            <div className="img">
                                <Avatar src={value.data().photo ? value.data().photo : '...'}  alt={value.data().username} sx={{width:'97%', height:'97%'}} />
                            </div>
    
                            <span className='name'>{value.data().username}</span>
                            <h5>{value.data().email}</h5>
                            
                            
                            <div className="btn">
                                <Button variant="outlined" >{value.data().followers.length} Followers</Button>
                                <Button variant="contained" 
                                    sx={{background: 'var(--main-color)'}}
                                    onClick={addfollow} >
                                        {inFollow ? 'friend' : 'Follow +'}
                                    </Button>
                            </div>
                        </div>
    
                    </div>
                {/* end header */}
    
                <Divider  sx={{mx:3}}>
                    <Chip label="Posts" size="small" />
                </Divider>
    
    
                <Container maxWidth=''>
                    <UserPosts id={value.data().id}/>
                </Container>
            </div>
        )
    }
}

export default UserProfile