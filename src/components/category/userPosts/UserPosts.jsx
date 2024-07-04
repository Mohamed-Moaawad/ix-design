// import React from 'react'
// MUI
import Grid from '@mui/material/Grid';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

// Firebase
import { collection, query, where } from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';
import { db } from '../../../firebase/config';
import PostItem from '../../posts/post/PostItem';

const UserPosts = ({id}) => {
    const [value, loading, error] = useCollection(
        query(collection(db, 'Posts'), where('userData.id', '==', id))
    )

    

    if(loading){
        return(
            <Grid container spacing={1} sx={{my:3}}>
                <Grid item xs={6} md={3} lg={2} sx={{ mb: "20px" }}>
                    <Stack spacing={1}>
                    <Skeleton variant="rounded" width={"100%"} height={180} />
                    {/* For other variants, adjust the size with `width` and `height` */}
                    <Skeleton variant="circular" width={25} height={25} />
                    {/* For variant="text", adjust the height via font-size */}
                    <Skeleton variant="text" sx={{ fontSize: "25px" }} />
                    </Stack>
                </Grid>
                <Grid item xs={6} md={3} lg={2} sx={{ mb: "20px" }}>
                    <Stack spacing={1}>
                    <Skeleton variant="rounded" width={"100%"} height={180} />
                    {/* For other variants, adjust the size with `width` and `height` */}
                    <Skeleton variant="circular" width={25} height={25} />
                    {/* For variant="text", adjust the height via font-size */}
                    <Skeleton variant="text" sx={{ fontSize: "25px" }} />
                    </Stack>
                </Grid>
                <Grid item xs={6} md={3} lg={2} sx={{ mb: "20px" }}>
                    <Stack spacing={1}>
                    <Skeleton variant="rounded" width={"100%"} height={180} />
                    {/* For other variants, adjust the size with `width` and `height` */}
                    <Skeleton variant="circular" width={25} height={25} />
                    {/* For variant="text", adjust the height via font-size */}
                    <Skeleton variant="text" sx={{ fontSize: "25px" }} />
                    </Stack>
                </Grid>
                <Grid item xs={6} md={3} lg={2} sx={{ mb: "20px" }}>
                    <Stack spacing={1}>
                    <Skeleton variant="rounded" width={"100%"} height={180} />
                    {/* For other variants, adjust the size with `width` and `height` */}
                    <Skeleton variant="circular" width={25} height={25} />
                    {/* For variant="text", adjust the height via font-size */}
                    <Skeleton variant="text" sx={{ fontSize: "25px" }} />
                    </Stack>
                </Grid>
                <Grid item xs={6} md={3} lg={2} sx={{ mb: "20px" }}>
                    <Stack spacing={1}>
                    <Skeleton variant="rounded" width={"100%"} height={180} />
                    {/* For other variants, adjust the size with `width` and `height` */}
                    <Skeleton variant="circular" width={25} height={25} />
                    {/* For variant="text", adjust the height via font-size */}
                    <Skeleton variant="text" sx={{ fontSize: "25px" }} />
                    </Stack>
                </Grid>
                <Grid item xs={6} md={3} lg={2} sx={{ mb: "20px" }}>
                    <Stack spacing={1}>
                    <Skeleton variant="rounded" width={"100%"} height={180} />
                    {/* For other variants, adjust the size with `width` and `height` */}
                    <Skeleton variant="circular" width={25} height={25} />
                    {/* For variant="text", adjust the height via font-size */}
                    <Skeleton variant="text" sx={{ fontSize: "25px" }} />
                    </Stack>
                </Grid>
                <Grid item xs={6} md={3} lg={2} sx={{ mb: "20px" }}>
                    <Stack spacing={1}>
                    <Skeleton variant="rounded" width={"100%"} height={180} />
                    {/* For other variants, adjust the size with `width` and `height` */}
                    <Skeleton variant="circular" width={25} height={25} />
                    {/* For variant="text", adjust the height via font-size */}
                    <Skeleton variant="text" sx={{ fontSize: "25px" }} />
                    </Stack>
                </Grid>
                <Grid item xs={6} md={3} lg={2} sx={{ mb: "20px" }}>
                    <Stack spacing={1}>
                    <Skeleton variant="rounded" width={"100%"} height={180} />
                    {/* For other variants, adjust the size with `width` and `height` */}
                    <Skeleton variant="circular" width={25} height={25} />
                    {/* For variant="text", adjust the height via font-size */}
                    <Skeleton variant="text" sx={{ fontSize: "25px" }} />
                    </Stack>
                </Grid>
                <Grid item xs={6} md={3} lg={2} sx={{ mb: "20px" }}>
                    <Stack spacing={1}>
                    <Skeleton variant="rounded" width={"100%"} height={180} />
                    {/* For other variants, adjust the size with `width` and `height` */}
                    <Skeleton variant="circular" width={25} height={25} />
                    {/* For variant="text", adjust the height via font-size */}
                    <Skeleton variant="text" sx={{ fontSize: "25px" }} />
                    </Stack>
                </Grid>
                <Grid item xs={6} md={3} lg={2} sx={{ mb: "20px" }}>
                    <Stack spacing={1}>
                    <Skeleton variant="rounded" width={"100%"} height={180} />
                    {/* For other variants, adjust the size with `width` and `height` */}
                    <Skeleton variant="circular" width={25} height={25} />
                    {/* For variant="text", adjust the height via font-size */}
                    <Skeleton variant="text" sx={{ fontSize: "25px" }} />
                    </Stack>
                </Grid>
                <Grid item xs={6} md={3} lg={2} sx={{ mb: "20px" }}>
                    <Stack spacing={1}>
                    <Skeleton variant="rounded" width={"100%"} height={180} />
                    {/* For other variants, adjust the size with `width` and `height` */}
                    <Skeleton variant="circular" width={25} height={25} />
                    {/* For variant="text", adjust the height via font-size */}
                    <Skeleton variant="text" sx={{ fontSize: "25px" }} />
                    </Stack>
                </Grid>
                <Grid item xs={6} md={3} lg={2} sx={{ mb: "20px" }}>
                    <Stack spacing={1}>
                    <Skeleton variant="rounded" width={"100%"} height={180} />
                    {/* For other variants, adjust the size with `width` and `height` */}
                    <Skeleton variant="circular" width={25} height={25} />
                    {/* For variant="text", adjust the height via font-size */}
                    <Skeleton variant="text" sx={{ fontSize: "25px" }} />
                    </Stack>
                </Grid>
            </Grid>
        )
    }


    if(value){
        return (
            <div className="user-posts">
                <Grid container spacing={2}>
                    {value.docs.map((item, index)=>(
                        <Grid key={index} item xs={6} md={3} lg={2} sx={{my:3}}>
                            <PostItem item={item} />
                        </Grid>
                    ))}
                    
                </Grid>
            </div>
        )
    }
}

export default UserPosts