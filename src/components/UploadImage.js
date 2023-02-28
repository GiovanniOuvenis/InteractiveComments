import React, { useState } from "react";
import axios from "axios";
import { imageURL } from "../features/user/userLogged";

import { useDispatch, useSelector } from "react-redux";

export default function UploadImage(props) {
  const [imageToSend, setImageToSend] = useState({});
  const { userNameToolkit } = useSelector((store) => store.userRedux);

  const dispatch = useDispatch();

  const uploadPicture = (e) => {
    setImageToSend({
      imagePreview: URL.createObjectURL(e.target.files[0]),
      imageAsFile: e.target.files[0],
    });
  };

  const setImageAction = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("username", userNameToolkit);
    formData.append("image", imageToSend.imageAsFile);

    const cloudinaryLink = await axios
      .post("http://localhost:5000/intcommapi/v1/auth/uploadpic", formData)
      .then((result) => {
        if (result.status === 201) {
          console.log("ok image uploaded");
          dispatch(imageURL(result.data.pic));
        }
      });
  };

  return (
    <div className="uploadImage">
      <form onSubmit={setImageAction}>
        <input type="file" name="image" onChange={uploadPicture} />

        <h1 className="instructions">
          Use only .jpeg or .jpg or .png image forms
        </h1>

        <button type="submit" name="upload">
          Upload
        </button>
      </form>
    </div>
  );
}
