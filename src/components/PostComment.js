import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { triggerChange } from "../features/user/userLogged";
import axios from "../api/axios";

const PostComment = (props) => {
  const { picturePath, userNameToolkit } = useSelector(
    (store) => store.userRedux
  );
  const dispatch = useDispatch();
  const [textToSend, setTextToSend] = useState("");
  const inputRef = useRef();
  const formRef = useRef();

  useEffect(() => {
    setTextToSend(`@${props.replyTo}`);
    if (props.action === "SEND") {
      setTextToSend("");
      formRef.current.classList.add("postnewcomment");
      inputRef.current.classList.add("fullsize");
    }
  }, []);

  useEffect(() => {
    !props.fullSize
      ? inputRef.current.classList.add("replysize")
      : inputRef.current.classList.add("fullsize");
  });

  const postComment = (e) => {
    e.preventDefault();
    let ep = "comments";
    if (props.action) {
      ep = `comments/${props.commentId}`;
    }
    const postOrReplyText = async () => {
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

    try {
      postOrReplyText();
      setTextToSend("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form className="container brer mt-8" id={props.commentId} ref={formRef}>
      <img
        className="loggedAvatar mr-1r"
        src={picturePath}
        alt="logged in user"
      />
      <textarea
        className="input brer"
        ref={inputRef}
        type="text"
        value={textToSend}
        onChange={(event) => {
          setTextToSend(event.target.value);
        }}
      ></textarea>
      <button className="button brer" type="submit" onClick={postComment}>
        {props.action}
      </button>
    </form>
  );
};

export default PostComment;
