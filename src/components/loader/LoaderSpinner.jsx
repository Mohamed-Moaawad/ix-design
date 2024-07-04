import React from 'react'
// React Spinner
import { RotatingLines } from 'react-loader-spinner';

const LoaderSpinner = () => {
    return (
            <RotatingLines
                visible={true}
                height="100%"
                width="20"
                strokeColor="white"
                strokeWidth="5"
                animationDuration="0.75"
                ariaLabel="rotating-lines-loading"
                wrapperStyle={{}}
                wrapperClass=""
                />
    )
}

export default LoaderSpinner