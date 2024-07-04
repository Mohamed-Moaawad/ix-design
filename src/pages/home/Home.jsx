// import React from 'react'
import './Home.css'
// MUI
import { Container } from '@mui/material';
//  React Firebase Hooks
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth} from '../../firebase/config';
//
import Navbar from '../../components/navbar/Navbar';
import Stories from '../../components/stories/Stories';
import AllPosts from '../../components/posts/AllPosts'

import { useState } from 'react';



const Home = () => { 
    const [user , loading, error] = useAuthState(auth)

    // console.log(user.displayName);


    const [navData, setNavData] = useState('')
    
    // Get Data from navbar from input search
    // بعت فنكشن للناف وخت بيها داتا وحطيتها في متغير في الهوم
    const handleChange = (data)=>{
        setNavData(data)
    }



    return (
        <div className='home-page'>
            {/* start Navbar */}
            <Navbar path={''} onDataChange={handleChange}/>
            {/* start Navbar */}

            {/* end stories */}
            <Stories user={user}/>
            {/* end stories */}

            
            {/* start home */}
            
                <div className="content">
                    <Container maxWidth="">
                        <AllPosts navData={navData} />
                    </Container>
                </div>
            
            {/* end home */}
        </div>
    )
}

export default Home