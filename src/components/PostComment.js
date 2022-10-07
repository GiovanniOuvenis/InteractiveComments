import React, { useState } from "react";
import Button from "./Button";
import { useSelector } from "react-redux";

const PostComment = (props) => {
  const { picturePath } = useSelector((store) => store.userRedux);
  const [textToSend, setTextToSend] = useState();

  return (
    <div>
      <img src={picturePath} alt="logged in user" />
      <input
        onChange={(event) => {
          setTextToSend(event.target.value);
        }}
      ></input>
      <Button text="send"></Button>
    </div>
  );
};

export default PostComment;
