// import React from 'react'
import './PopupViewStory.css'
// MUI
import Avatar from '@mui/material/Avatar';
import CloseIcon from '@mui/icons-material/Close';


const PopupViewStory = ({storyData, setViewStory}) => {
    return (
        <div className='popup-view-story'>
            <div className="story-box">
                
                <div className="story-info">
                    <div className="info">
                        <Avatar src={storyData.userData.photo === '' ? '...' : storyData.userData.photo} alt={storyData.userData.name}/>
                        <h6>{storyData.userData.name}</h6>
                    </div>
                
                    <div className="close">
                        <button 
                            onClick={()=> setViewStory(false)}
                        >close <CloseIcon /> </button>
                    </div>
                </div>

                <div className="img">
                    <img src={storyData.image} alt="story image" />
                </div>

            </div>
        </div>
    )
}

export default PopupViewStory