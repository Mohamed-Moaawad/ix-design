// import React from 'react'
import { Link } from 'react-router-dom';
import './PostItem.css'
// MUI
import Avatar from '@mui/material/Avatar';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../../firebase/config';




const PostItem = ({item, deleteIcon}) => {    

    // Function Delete Post 
    const deletePost = async()=>{
        await deleteDoc(doc(db, 'Posts', `${item.id}`))
    }

    return (
        <div className='post-item'>
            <Link to={`/post/${item.id}`}>
                <div className="img">
                    <img loading='lazy' src={item.data().image} alt="post" />
                    <p>{item.data().title}</p>
                </div>
            </Link>
                <div className="info">
                    <Link to={`/user-profile/${item.data().userData.id}`}>
                        <div className="avatar-user">
                            <Avatar src={item.data().userData.photo === '' ? '...' : item.data().userData.photo} alt={item.data().userData.name} sx={{width:30, height:30}} />
                            <h6>{item.data().userData.name}</h6>
                        </div>
                    </Link>
                    {deleteIcon && (
                        <IconButton aria-label="delete" 
                            onClick={deletePost}
                        >
                            <DeleteIcon />
                        </IconButton>
                    )}
                </div>
        </div>
    )
}

export default PostItem