'use client';
import { useRef, useState } from "react";
import classes from "./image-picker.module.css";
import Image from "next/image";

const ImagePicker = ({ label, name }) => {
    const [pickedImage, setPickedImage] = useState();
    const inputRef = useRef();

    function handlePickClick(){
        inputRef.current.click();
    }

    function handleImageChange(event){
        const file = event.target.files[0];

        if (!file) {
            setPickedImage(null);
            return;
        }

        
        const fileReader = new FileReader();
        fileReader.onload = () => {
            setPickedImage(fileReader.result);
        }
        fileReader.readAsDataURL(file);
    }

  return (
    <div className={classes.picker}>
      <label htmlFor={name}>{label}</label>
      <div className={classes.controls}>
        <div className={classes.preview}>
            {!pickedImage && <p>No image picked yet.</p>}
            {pickedImage && <Image src={pickedImage} alt="Image selected by the user" fill/>}
        </div>
        <input
          ref={inputRef}
          onChange={handleImageChange}
          className={classes.input}  
          type="file"
          id={name}
          accept="image/png, image/jpeg"
          name={name}
          required
        />
        <button className={classes.button} type="button" onClick={handlePickClick}>
            Pick an Image
        </button>
      </div>
    </div>
  );
};

export default ImagePicker;
