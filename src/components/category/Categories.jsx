// import React from 'react'
//
// MUI
import Grid from "@mui/material/Grid";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
//
//Firebase
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../../firebase/config";
import { collection, query, where } from "firebase/firestore";
//
import PostItem from "../posts/post/PostItem";






const Categories = ({ title }) => {


  const [value, loading, error] = useCollection(
    query(collection(db, "Posts"), where("title", "==", title))
  );



  if (loading) {
    return (
      <div className="categories-component">
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
      <div style={{ padding: "30px 0" }} className="categories-component">
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

export default Categories;
