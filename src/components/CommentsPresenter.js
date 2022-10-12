import React, { useState, useEffect } from "react";
import axios from "../api/axios";
import Comment from "./Comment";
import PostComment from "./PostComment";
import { useSelector } from "react-redux";

export default function CommentsPresenter() {
  const [commentsReceived, setCommentsReceived] = useState([]);
  const [trigger, setTrigger] = useState(0);
  const { userNameToolkit } = useSelector((store) => store.userRedux);

  const ep = "comments";

  useEffect(() => {
    const receiveComments = async () => {
      await axios
        .get(ep)
        .then((commentList) => {
          setCommentsReceived(commentList.data.comments);
          return commentsReceived;
        })
        .catch((error) => {
          console.log(error);
        });
    };
    receiveComments();
  }, [trigger]);

  const getValueFromChild = (arg) => {
    setTrigger(arg);
  };

  return (
    <div className="commentsAndPostComment">
      <div className="commentsPresenter">
        {commentsReceived.map((currentComment, index) => {
          return <Comment key={index} comment={currentComment}></Comment>;
        })}
      </div>
      <div className="postCommentForm">
        <PostComment ></PostComment>
      </div>
    </div>
  );
}
