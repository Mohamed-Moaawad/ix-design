// import React from 'react'
import './PostPage.css'
import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom'
import Navbar from '../../components/navbar/Navbar'
import Categories from '../../components/category/Categories';
//
// MUI
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import Container from '@mui/material/Container';
import Skeleton from '@mui/material/Skeleton';
import IconButton from '@mui/material/IconButton';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';


// Firebase
import { useDocument } from 'react-firebase-hooks/firestore'
import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore'
import { auth, db } from '../../firebase/config'
import { useAuthState } from 'react-firebase-hooks/auth';
// import { saveAs } from 'file-saver';






const PostPage = () => {
    const { id } = useParams()
    
    const [value, loading, error] = useDocument(doc(db, 'Posts', `${id}`))
    
    const [user, loadingg, errorr] = useAuthState(auth)
    // console.log(user);

    
    

    const navigate = useNavigate()

    // Function add and remove like ( My Code )
    const handleClick = async()=>{
        if(user){
            const likeData = user.uid

            if(value.data().likes.includes(likeData)){
                await updateDoc(doc(db, 'Posts', `${id}`),{
                    likes: arrayRemove(likeData)
                })
            }else{
                await updateDoc(doc(db, 'Posts', `${id}`),{
                    likes: arrayUnion(likeData)
                })
            }
        }else(
            navigate('/register')
        )

    }
    
    // Code ChatGPT
    // const handleClick2 = async () => {
    //     const likeData = value.data().userData.email;

    //     const docSnapshot = await getDoc(doc(db, 'Posts', `${id}`));

    //     if (docSnapshot.exists()) {
    //         const data = docSnapshot.data();
    //         const likes = data.likes || [];

    //         const likeExists = likes.includes(likeData);

    //         if (likeExists) {
    //             await updateDoc(doc(db, 'Posts', `${id}`),{
    //                 likes: arrayRemove(likeData)
    //             })
    //         } else {
    //             await updateDoc(docRef, {
    //                 likes: arrayUnion(likeData)
    //             });
    //         }
    //     } else {
    //         console.log('المستند غير موجود');
    //     }
    // };




    if(loading){
        return(
            <div className="post-page">
                <div className="content">
                <div className="post-head">
                    <Grid container>
                        <Grid item xs={12} className='grid-item'>
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
                                >
                                <Paper elevation={4} className='paper-box'>
                                    <div className="img">
                                        <Skeleton variant="rounded" width='100%' height='100%' />  
                                    </div>
                                    <div className="post-info">
                                        <div className="user-info">
                                            <Skeleton variant="circular" width={40} height={40} />
                                            <Skeleton variant="rounded" width='70%' height={20} />
                                        </div>
                                            
                                        <Skeleton variant="rectangular" sx={{my:4}} width={210} height={30} />
                                        <Skeleton variant="rounded" width={210} height={60} />
                                    </div>
                                </Paper>
                            </Box>
                        </Grid>
                    </Grid>
                </div>
                </div>
            </div>
        )
    }


    if(value){
        return (
            <div className='post-page'>
                {/* start navbar */}
                <Navbar path='../' disabled={true}  />
                {/* end navbar */}
    
                <div className="content">
                    <div className="post-head">
                        <Grid container>
                            <Grid item xs={12} className='grid-item'>
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
                                    >
                                    <Paper elevation={4} className='paper-box'>
                                        <div className="img">
                                            <img loading='lazy' src={value.data().image} alt="post" />
                                        </div>
                                        <div className="post-info">

                                            <div className="user-info">
                                                <Link to={`/user-profile/${value.data().userData.id}`}>
                                                    <Avatar src={value.data().userData.photo ? value.data().userData.photo : '...' } alt={value.data().userData.name} />
                                                    <span>
                                                        <h4>{value.data().userData.name}</h4>
                                                        <h5>{value.data().userData.email}</h5>
                                                    </span>
                                                </Link>
                                            </div>
                                                
                                            <h3>{value.data().title}</h3>
                                            <h3> <sup>type : </sup> {value.data().type}</h3>
                                            {/* <h4>{value.data().time}</h4> */}
                                            
                                            <div className="likes">
                                                <IconButton
                                                    onClick={handleClick}
                                                    >
                                                        {value.data().likes.includes(user?.uid) ? <FavoriteIcon  className='added'/> : <FavoriteBorderIcon />}
                                                </IconButton>
                                                <span>{value.data().likes.length}</span>
                                            </div>
                                        </div>
                                    </Paper>
                                </Box>
                            </Grid>
                        </Grid>
                    </div>


                    <Divider sx={{m:3}}>
                        <Chip label="Photos" />
                    </Divider>


                    {/* start Categories */}
                    <Container maxWidth="">
                        <Categories title={value.data().title}/>
                    </Container>
                    {/* end Categories */}
                </div>
            </div>
        )
    }
}

export default PostPage