import axios from 'axios';
import React, { useState, useEffect } from 'react'
import './App.css';
import Image from './Image'

const App = () =>  {

  const [imageList, setImageList] = useState([]);
  const [pageNum, setPageNum] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const loadImages = () => {
    axios
      .get(`https://picsum.photos/v2/list?page=${pageNum}&limit=16`)
      .then(res =>  {
          let newImages = res.data;
          setImageList(imageList.concat(newImages));
          setPageNum(pageNum + 1 );
      });
  }
  
  useEffect(() => {
   loadImages()
  }, [] ) 

  const filterImages = () => {
    let searchTerms =  searchQuery.split(" ") 
    let filterImageList = 
      imageList.filter(image => 
        searchTerms.every(term => 
          image.author.toLowerCase().includes(term.toLowerCase())))
    
    return filterImageList
  }  

  const createImageComponent = () => {
    let imageSet = searchQuery === "" ? imageList : filterImages()

    return imageSet.map((image) => 
      <Image image={image} /> 
    )
  }

  return (
    <div className="App">
      <header className="App-header">
        <input 
            type="text"
            value={searchQuery}
            onChange={ e => {
              setSearchQuery(e.target.value)
            }}
        />  
        <ul className="image-grid">
          {createImageComponent()}
        </ul>
        <button onClick={loadImages}> ~ LOAD MORE IMAGES! ~ </button>

      </header>
    </div>
  );
}

export default App




