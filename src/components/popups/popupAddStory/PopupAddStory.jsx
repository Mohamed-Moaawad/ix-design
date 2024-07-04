// import React from 'react'
import './PopupAddStory.css'
import { useState } from 'react';
// MUI
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import TextField from '@mui/material/TextField';
// MUI Icons
import DownloadForOfflineSharpIcon from '@mui/icons-material/DownloadForOfflineSharp';
//
// Firebase
import SendIcon from '@mui/icons-material/Send';
import { addDoc, collection, deleteDoc, doc, query, serverTimestamp, where, } from 'firebase/firestore';
import { db, storageDB } from '../../../firebase/config';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { v4 } from 'uuid';


const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});


const PopupAddStory = ({setOpenPopupAddStory, user}) => {
    // toggle URL to Upload image
    const [imageURL, setImageURL] = useState(false)

    const [disableBTN, setDisableBTN] = useState(true)

    const [url, setUrl] = useState('')

    // Function Create Story By URl
    const createStoryByURL = async(e)=>{
        e.preventDefault()

        // await addDoc(collection(db, 'Stories'),{
        //     id: user.uid,
        //     image: url,
        //     time: serverTimestamp(),
        //     userData:{
        //         id: user.uid,
        //         name: user.displayName,
        //         email: user.email,
        //         photo: user.photoURL ? user.photoURL : user.displayName,
        //     }
        // })

        
        setUrl('')
    

    }

    // Function Upload Image 
    const uploadImage = (e)=>{
        const imsg = ref(storageDB, `stories/${v4()}`)
        uploadBytes(imsg, e.target.files[0])
        .then((data)=>{
            getDownloadURL(data.ref).then((val)=>{

                addDoc(collection(db, 'Stories'),{
                    image: val,
                    time: serverTimestamp(),
                    userData:{
                        id: user.uid,
                        name: user.displayName,
                        email: user.email,
                        photo: user.photoURL ? user.photoURL : user.displayName,
                    }
                })

            })
        })
    }







    return (
        <div className='add-story-component'>
            <div className="content-wapper" onClick={()=> setOpenPopupAddStory(false)}></div>
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
                <Paper elevation={3} sx={{p:3,display:'flex',flexDirection:'column',alignItems:'center'}}>

                    <h5 onClick={()=>{
                        setImageURL(imageURL ? false : true)
                    }}>
                        {imageURL ? 'RUL' : 'Upload file'}
                    </h5>

                    {imageURL ? (
                        <div className="upload-box">
                            <div className="box-image">
                                {/* <img src="images/backgrounds/10.jpg" alt="image" /> */}
                                <DownloadForOfflineSharpIcon/>
                                <h4>Add image here</h4>
                                <p>
                                    Quickly share what you're working on.
                                    Work in Progress segments expire in 24 hours.
                                </p>
                            </div>

                            <Button
                                component="label"
                                role={undefined}
                                variant="contained"
                                tabIndex={-1}
                                startIcon={<CloudUploadIcon />}
                                >
                                Upload image
                                <VisuallyHiddenInput type="file" onChange={uploadImage} />
                            </Button>
                        </div>
                    ) : (
                        <div className="url-box">
                            <form action="">
                            <TextField sx={{width: {md: '400px', sm: '350px', xs: '100%'}}} fullWidth label="URL" type='url' 
                                value={url}
                                onChange={(e)=> {
                                    setUrl(e.target.value)
                                    setDisableBTN(false)
                                }}
                            />

                            <Button variant="contained" type='submit' endIcon={<SendIcon />}
                                onClick={createStoryByURL}
                                disabled={disableBTN}
                            >
                                Send
                            </Button>
                            </form>
                        </div>
                    )}



                </Paper>
            </Box>
        </div>
    )
}

export default PopupAddStory