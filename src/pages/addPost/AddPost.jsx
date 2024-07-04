// import React from 'react'
import './AddPost.css'
import { useState } from 'react';
// MUI
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
// MUI Icons
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Navbar from '../../components/navbar/Navbar';
//
//firebase
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { auth, db, storageDB } from '../../firebase/config';
import { useAuthState } from 'react-firebase-hooks/auth';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { v4 } from 'uuid';
import { useNavigate } from 'react-router-dom';




const AddPost = () => {
    const [imageName, setImageName] = useState('')
    const [openInputs, setOpenInputs] = useState(true)

    const [user, loading, error] = useAuthState(auth)

    
    const [title, setTitle] = useState('');
    const [type, setType] = useState('');
    const [image, setImage] = useState('');

    // Function Upload Image
    const handleUpload = (e)=>{
        setImageName(e.target.files[0].name)


        const imgs = ref(storageDB, `Posts/${v4()}`)
        uploadBytes(imgs, e.target.files[0])
        .then((data)=>{
            getDownloadURL(data.ref).then((val)=>{
                setImage(val)
            })
        })

        setOpenInputs(false)

    }


    
    
    // Function create post firebase
    const createPost = async(e) => {
        console.log('Waiting...')
        await addDoc(collection(db, 'Posts'),{
            id: user.uid,
            title,
            type,
            image,
            likes: [],
            time: serverTimestamp(),
            userData:{
                id: user.uid,
                name: user.displayName,
                email: user.email,
                photo: user.photoURL ? user.photoURL : user.displayName,
            },
        })
        console.log('Done...')

        setTitle('')
        setType('')
        setImage('')
        setImageName('')
    };

    const navigate = useNavigate()

    if(!user){
        navigate('/', {replace: true})
    }

    if(user){
        return (
            <div className='add-post-page'>
                {/* start navbar */}
                <Navbar path={''} disabled={true}/>
                {/* end navbar */}
                <div className="content">
                    <h3>create post</h3>
                    <Grid container sx={{px:'20px'}}>
    
                        <Grid item xs={12} md={7} className='grid-item grid-form'>
                            <form>
                                <TextField id="outlined-basic" label="Title" variant="outlined"
                                    value={title}
                                    onChange={(e)=> setTitle(e.target.value.toLowerCase())}
                                    disabled={openInputs}
                                />
    
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Type</InputLabel>
                                    <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={type}
                                    label="Age"
                                    onChange={(e)=> setType(e.target.value)}
                                    disabled={openInputs}
                                    >
                                        <MenuItem value='photo'>photo</MenuItem>
                                        <MenuItem value='background'>background</MenuItem>
                                        <MenuItem value='logo'>logo</MenuItem>
                                        <MenuItem value='vector'>vector</MenuItem>
                                    </Select>
                                </FormControl>
                            </form>
                        </Grid>
    
                        <Grid item xs={12} md={5} className='grid-item'>
                            <div className="upload-image">
                                <div className="upload-box">
                                    
                                    <CloudUploadIcon />
                                    <h5>select image here.</h5>
                                    <span>{imageName}</span>
                                    <input type="file" name="" id=""
                                        onChange={handleUpload}
                                    />
                                </div>
                                <Divider sx={{my:'20px'}} />
                                <Button variant="contained" endIcon={<CloudUploadIcon />}
                                    onClick={createPost}
                                    disabled={openInputs}
                                >
                                    publish
                                </Button>
                            </div>
                        </Grid>
    
                    </Grid>
                </div>
            </div>
        )
    }
}

export default AddPost