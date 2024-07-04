// import React from 'react'
import './EditProfile.css'
import { useState } from 'react';
// MUI
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
//
// Firebase
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { auth, db, storageDB } from '../../../firebase/config';
import { v4 } from 'uuid';
import { collection, doc, query, updateDoc, where } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { updateProfile } from 'firebase/auth';
import { useCollection } from 'react-firebase-hooks/firestore';



const EditProfile = () => {

    const[user, loading, error ] = useAuthState(auth)

    const [value, load, err] = useCollection(query(
        collection(db, 'Posts'), where('userData.email', '==', user && user.email ))
    )

    const [fName, setFName] = useState('') 
    const [lName, setLName] = useState('') 

    const [linkedIn, setLinkedIn] = useState('')
    const [gitHub, setGitHub] = useState('')
    const [facebook, setFacebook] = useState('')
    const [whatsApp, setWhatsApp] = useState('')
    
    
    
    // Function Replace Photo
    // const replacePhoto = async(e)=>{

    //     const imgs = ref(storageDB, `users/${v4()}`)
        
    //     await uploadBytes(imgs, e.target.files[0])
    //     .then((data)=>{
    //         getDownloadURL(data.ref).then((val)=>{

    //             updateProfile(auth.currentUser, {
    //                 photoURL: val
    //             }).then(() => {

    //                 updateDoc(doc(db, 'users', user.uid),{
    //                     photo: val
    //                 } )

    //             }).catch((error) => {
    //                 // An error occurred
    //                 // ...
    //             });
                
    //         })
            
    //     })

    // }


    // Function Replace Banner
    const replaceBanner = async(e)=>{

        const imgs = ref(storageDB, `banners/${v4()}`)

        await uploadBytes(imgs, e.target.files[0])
        .then((data)=>{
            getDownloadURL(data.ref).then((val)=>{

                updateDoc(doc(db, 'users', user.uid),{
                    banner: val
                })

            })
            
        })
    }


    const sendData = async(e)=>{
        e.preventDefault()

        
            // if(fName !== ''){
            //     updateProfile(auth.currentUser, {
            //         displayName: fName +' '+ lName,
            //         }).then(() => {
            //             updateDoc(doc(db, 'users', user.uid),{
            //                 username: fName +' '+ lName,
            //             })
        
            //         }).catch((error) => {
            //             // An error occurred
            //             // ...
            //         });
            // }


            if(linkedIn !== ''){
                updateDoc(doc(db, 'users', user.uid),{
                    media: {linkedin: linkedIn},
                })
            }
            // if(gitHub !== ''){
            //     updateDoc(doc(db, 'users', user.uid),{
            //         media: [
            //             ...props,
            //             gitHub,
            //         ]
            //     })
            // }
            // if(facebook !== ''){
            //     updateDoc(doc(db, 'users', user.uid),{
            //         media: [
            //             facebook,
            //         ]
            //     })
            // }
            // if(whatsApp !== ''){
            //     updateDoc(doc(db, 'users', user.uid),{
            //         media: [
            //             whatsApp,
            //         ]
            //     })
            // }

        await updateDoc(doc(db, 'users', user.uid),{
            media: [
                linkedIn !== '' && linkedIn,
                gitHub !== '' && gitHub,
                facebook !== '' && facebook,
                whatsApp !== '' && whatsApp
            ]
        })

        setFName('')
        setLName('')
        setLinkedIn('')
        setGitHub('')
        setFacebook('')
        setWhatsApp('')
    }



    return (
        <div className="edit-profile-page">
            <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    '& > :not(style)': {
                    m: 1,
                    minWidth: 128,
                    minHeight: 128,
                    },
                }}
                >
                <Paper elevation={4} sx={{p:3, display:'flex', flexWrap:'wrap', justifyContent:'center'}}>
                    {/* <div className="image">
                        <div className="img">
                            <img src="images/Logo/logo.png" alt="photo" />
                            <input type="file" onChange={replacePhoto} /> 
                        </div>
                        <h5 >replace</h5>
                    </div> */}
                    {/* <Divider sx={{mx:3}} className='divider-line' orientation="vertical"/> */}
                    
                    <form noValidate>
                        <div className="banner">
                            <input type="file" onChange={replaceBanner} />
                            <span>Replace banner</span>
                            {/* <h6>gfg</h6> */}
                        </div>

                        {/* <div className="name">
                            <TextField id="outlined-basic" label="First Name" variant="outlined"
                                value={fName}
                                onChange={(e)=> setFName(e.target.value)}
                            />
                            <TextField id="outlined-basic" label="Last Name" variant="outlined" 
                                value={lName}
                                onChange={(e)=> setLName(e.target.value)}
                            />
                        </div> */}

                        <Divider sx={{my:3}}>
                            <Chip label="Social Media" size="small" />
                        </Divider>

                        <div className="social-media">
                            <input type="url" name="" id="" placeholder='linkedIn'
                                value={linkedIn}
                                onChange={(e)=> setLinkedIn(e.target.value)}
                            />
                            <input type="url" name="" id="" placeholder='GitHub'
                                value={gitHub}
                                onChange={(e)=> setGitHub(e.target.value)}
                            />
                            <input type="url" name="" id="" placeholder='Facebook'
                                value={facebook}
                                onChange={(e)=> setFacebook(e.target.value)}
                            />
                            <input type="url" name="" id="" placeholder='WhatsApp'
                                value={whatsApp}
                                onChange={(e)=> setWhatsApp(e.target.value)}
                            />
                        </div>


                        <Button type='submit' variant="contained" onClick={sendData}>submit</Button>

                    </form>
                </Paper>
            </Box>
        </div>
    )
}

export default EditProfile