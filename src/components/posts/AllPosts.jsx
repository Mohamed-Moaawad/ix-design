// import React from 'react'
import "./AllPosts.css";
// components
import PostItem from "./post/PostItem";

// MUI
import Grid from "@mui/material/Grid";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";

// Firebase
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, orderBy, query, where } from "firebase/firestore";
import { db } from "../../firebase/config";
import { useEffect, useState } from "react";







const AllPosts = ({navData}) => {

  const [initialValue, setInitialValue] = useState(query(collection(db, "Posts"), orderBy("time", "desc")))

  const [value, loading, error] = useCollection(initialValue);



  useEffect(()=>{
    setInitialValue(navData !== '' ? query(collection(db, "Posts"), where('title', '==', navData)) : query(collection(db, "Posts"), orderBy("time", "desc")))
  },[navData])





  if (loading) {
    return (
      <div className="posts-component">
        <Grid container spacing={1}>
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
      </div>
    );
  }

  if (value) {
    return (
      <div className="posts-component">
        <Grid container spacing={2}>
          {value.docs.map((item, index) => (
            <Grid key={index} item xs={6} md={3} lg={2}>
              <PostItem item={item} />
            </Grid>
          ))}
        </Grid>
      </div>
    );
  }
};

export default AllPosts;
