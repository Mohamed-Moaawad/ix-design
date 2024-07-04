// import React from 'react'
import Avatar from '@mui/material/Avatar';




const UserAvatar = ({user}) => {
    return (
        <Avatar src={user.photoURL === null ? '...' : user.photoURL} alt={user.displayName} />

    )
}

export default UserAvatar