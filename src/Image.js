import React from 'react'
import './App.css'
const Image = ({image}) => {
    return (
        <div className="imageContainer">
            <img 
                className="imageElement"
                src={image.download_url} />
            {image.author}
        </div>
    )
}

export default Image