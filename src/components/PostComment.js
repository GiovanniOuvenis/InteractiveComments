import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { triggerChange } from "../features/user/userLogged";
import axios from "../api/axios";

const PostComment = (props) => {
  const { picturePath, userNameToolkit } = useSelector(
    (store) => store.userRedux
  );
  const dispatch = useDispatch();
  const [textToSend, setTextToSend] = useState("");
  console.log(textToSend);

  useEffect(() => {
    setTextToSend(props.text);
    console.log(textToSend);
  });

  const postOrUpdateComment = (e) => {
    e.preventDefault();
    let ep = "comments";
    console.log(props.action);
    if (props.action !== "SEND") {
      ep = `comments/${props.commentId}`;
    }
    try {
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
            dispatch(triggerChange());
          });
      };
      const edit = async () => {
        axios
          .patch(
            `/${props.commentId}`,
            {
              edited: textToSend,
            },
            {
              headers: { "Content-Type": "application/json" },
              withCredentials: true,
            }
          )
          .then((editionResult) => {
            dispatch(triggerChange());
          });
      };

      if (props.action === "UPDATE") {
        edit();
      } else {
        postText();
      }
      setTextToSend("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form className="postReply" id={props.commentId}>
      <img src={picturePath} alt="logged in user" />
      <input
        type="text"
        value={textToSend}
        onChange={(event) => {
          setTextToSend(event.target.value);
        }}
      ></input>

      <button className="button" type="submit" onClick={postOrUpdateComment}>
        {props.action}
      </button>
    </form>
  );
};

export default PostComment;
