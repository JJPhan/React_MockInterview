import React from "react";
import "./App.css";
const Image = ({ image }) => {
  const deleteImage = () => {
    let imageContainer = document.getElementById(`imageElement-${image.id}`);
    imageContainer.style.display = "none";
  };
  return (
    <div className="imageContainer" id={`imageElement-${image.id}`}>
      <img className="imageElement" src={image.download_url} />
      {image.author}
      <div onClick={deleteImage} className="delete-button">
        {" "}
        X{" "}
      </div>
    </div>
  );
};

export default Image;
