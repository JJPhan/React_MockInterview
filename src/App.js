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
          image.author.includes(term)))
    
    return filterImageList
  }  

  const createImageComponent = () => {
    let imageSet = searchQuery === "" ? imageList : imageSet = filterImages()

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
        <button onClick={loadImages}> LOAD MORE IMAGES </button>

      </header>
    </div>
  );
}

export default App


  // function name () {}        -> hoisted up 
  // vs const name = () => {}   -> 
  // [...]

 // useEffect(()=>{

  //   // Body of useEffect => 
  //     // Function/ stufffff you do when useEffect invokes
  //     // someFunction('hello')

  //   // return () => {
  //     // Function that is invoked when unmounting
  //       // ComponentWillUnmount
  //     // someUnmountingFunction('do something')
  //   // }

  //   // {Image: {imgName: 'hello', imgLink: 'http://stfffff.com'}}
  //   // {Image: {}}


  // },
  // // Array dictacts if JUST MOUNT or MOUNT + UPDATE
  //   //If empty, JUST mount
  //   // If not, MOUNT + UPDATE
  // [])


  // useEffect(() => {

  //   // RUN FOR MOUNT OR UPDATE

  //   setImageList(loadImages())
  //   // First iteration (componentdidmount) => imageList = []
  //     // Invoke your inside useEffect function BECAUSE imageList gets updated as you MOUNTED
  //   // 2nd iteration (componentwillupdate) => imageList = [stuff]
  //     // Invoke your inside useEffect function BECAUSE imageList gets updated as you UPDATE
  //   // NO more iterations/invocations BECAUSE button is DISABLED
    

    

  //   // return
  // }, [
  //   somethingList
  //   // Typically use variable that you MANUALLY change
  // ] ) 

