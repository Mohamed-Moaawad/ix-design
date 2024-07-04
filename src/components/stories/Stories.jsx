// import React from 'react'
import './Stories.css'
import { useState } from 'react';

// MUI
import Container from '@mui/material/Container';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { Chip, Divider } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';


// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
// import required modules
import { EffectCoverflow, Pagination } from 'swiper/modules';
import PopupAddStory from '../popups/popupAddStory/PopupAddStory';
import { useCollection } from 'react-firebase-hooks/firestore';
import { collection } from 'firebase/firestore';
import { db } from '../../firebase/config';
import PopupViewStory from '../popups/popupViewStory/PopupViewStory';
import { useNavigate } from 'react-router-dom';





const Stories = ({user}) => {
    const [openPopupAddStory, setOpenPopupAddStory] = useState(false)
    const [viewStory, setViewStory] = useState(false)

    
    const [storyData, setStoryData] = useState([])


    const [value, loading, error] = useCollection(collection(db, 'Stories'))

    const navigate = useNavigate()

    return (
        <div className='stories-component'>

            <Container maxWidth='xl' sx={{overflow:'hidden'}}>
                <div className='stories-box'>

                    {/* start icon add stories */}
                    <div className="icon-add-stories">
                        <Tooltip title="Add Story">
                            <Fab className='icon-add' aria-label="add"
                                onClick={()=> user ? setOpenPopupAddStory(true) : navigate('/register')}
                            >
                                <AddIcon />
                            </Fab>
                        </Tooltip>

                        {/* start Popup add Story */}
                        {openPopupAddStory && <PopupAddStory setOpenPopupAddStory={setOpenPopupAddStory} user={user} />}
                        {/* end Popup add Story */}

                    </div>
                    {/* end icon add stories */}

                    <Divider sx={{mx:'20px'}} orientation="vertical" variant="middle" flexItem />

                {/* start all stories */}
                    <div className="all-stories">
                        <Swiper
                            effect={'coverflow'}
                            grabCursor={true}
                            centeredSlides={false}
                            slidesPerView={'auto'}
                            coverflowEffect={{
                            rotate: 0,
                            stretch: 0,
                            depth: 100,
                            modifier: 0,
                            slideShadows: true,
                            }}
                            pagination={true}
                            modules={[EffectCoverflow, Pagination]}
                            className="mySwiper"
                        >
                            {value && value.docs.map((str, index)=>(
                                <SwiperSlide key={index} className='swiper-slide'
                                    onClick={async()=> {
                                        await setStoryData(str.data())
                                        // console.log(storyData);
                                        setViewStory(true)
                                    }}
                                >
                                    <img loading='lazy' src={str.data().image} alt='story' />
                                    <span>{str.data().userData.name}</span>
                                </SwiperSlide>
                            ))}
                        </Swiper>


                        {/* start Popup View Story */}
                        {viewStory && <PopupViewStory storyData={storyData} setViewStory={setViewStory} />}
                        {/* end Popup View Story */}

                    </div>
                {/* end all stories */}

                </div>

            </Container>
                
                <Divider className='divider-photos' sx={{mt:'30px'}} orientation="horizontal" variant="middle" >
                    <Chip label="Photos"/>
                </Divider>
        
        </div>
    )
}

export default Stories