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

  useEffect(() => {
    if (props.action === "UPDATE") {
      setTextToSend(props.text);
    }
    if (props.action === "REPLY") {
      setTextToSend(`@${props.replyTo}`);
    }
    if (props.action === "SEND") {
      setTextToSend("Add a comment...");
    }
  }, []);

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
    <form className={props.nameOfClass} id={props.commentId}>
      <img className="loggedAvatar" src={picturePath} alt="logged in user" />
      <textarea
        className="input"
        type="text"
        value={textToSend}
        onChange={(event) => {
          setTextToSend(event.target.value);
        }}
      ></textarea>

      <button className="button" type="submit" onClick={postOrUpdateComment}>
        {props.action}
      </button>
    </form>
  );
};

export default PostComment;
