import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "../api/axios";
import PostComment from "./PostComment";
import Comment from "./Comment";

export default function CommentsPresenter() {
  const [commentsReceived, setCommentsReceived] = useState([]);
  const { trigger } = useSelector((store) => store.userRedux);
  const ep = "comments";

  useEffect(() => {
    const receiveComments = async () => {
      await axios
        .get(ep)
        .then((commentList) => {
          setCommentsReceived(commentList.data);
          return commentsReceived;
        })
        .catch((error) => {
          console.log(error);
        });
    };
    receiveComments();
    console.log(commentsReceived)
  }, [trigger]);

  return (
    <>
      <div className="commentsAndPostComment">
        <div className="commentsPresenter">
          {commentsReceived.map((currentComment, index) => {
            return <Comment key={index} comment={currentComment} />;
          })}
        </div>
        <PostComment action={"SEND"}></PostComment>
      </div>
    </>
  );
}
