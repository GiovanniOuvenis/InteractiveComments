import React, { useState, useContext } from "react";
import { CommentsContext } from "./Context";

export default function UploadImage(props) {
  const [imageToSend, setImageToSend] = useState({});
  const interactiveCommentsContext = useContext(CommentsContext);
  const functionFromContext = interactiveCommentsContext.handler;
  const userNameFromProps = props.un;

  const uploadPicture = (e) => {
    setImageToSend({
      imagePreview: URL.createObjectURL(e.target.files[0]),
      imageAsFile: e.target.files[0],
    });
  };

  const setImageAction = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("username", userNameFromProps);
    formData.append("image", imageToSend.imageAsFile);

    const data = await fetch(
      "http://localhost:5000/intcommapi/v1/auth/uploadpic",
      {
        method: "post",
        body: formData,
      }
    ).then((result) => {
      if (result.status === 201) {
        functionFromContext(true);
      }
    });
  };

  return (
    <div className="uploadImage">
      <form onSubmit={setImageAction}>
        <input type="file" name="image" onChange={uploadPicture} />
        <br />
        <br />
        <button type="submit" name="upload">
          Upload
        </button>
      </form>
    </div>
  );
}
