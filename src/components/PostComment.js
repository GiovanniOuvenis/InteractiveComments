import React, { useState } from "react";
import { useSelector } from "react-redux";
import axios from "../api/axios";

const PostComment = (props) => {
  const { picturePath, userNameToolkit } = useSelector(
    (store) => store.userRedux
  );
  const [textToSend, setTextToSend] = useState("");

  const postComment = (e) => {
    e.preventDefault();
    let ep = "comments";
    console.log(props.commentId);
    if (props.commentId) {
      ep = `comments/${props.commentId}`;
    }
    try {
      if (textToSend.length >= 1) {
        const postText = async () => {
          await axios
            .post(
              ep,
              {
                username: userNameToolkit,
                content: textToSend,
              },
              {
                headers: { "Content-Type": "application/json" },
                withCredentials: true,
              }
            )
            .then((resp) => {
              console.log(resp);
            });
        };
        const result = postText();
      }
      setTextToSend("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form>
      <img src={picturePath} alt="logged in user" />
      <input
        type="text"
        onChange={(event) => {
          setTextToSend(event.target.value);
        }}
      ></input>
      <button className="button" type="submit" onClick={postComment}>
        send
      </button>
    </form>
  );
};

export default PostComment;
