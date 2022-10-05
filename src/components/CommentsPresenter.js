import React, { useState, useEffect } from "react";
import axios from "../api/axios";
import Comment from "./Comment";

export default function CommentsPresenter() {
  const [commentsReceived, setCommentsReceived] = useState([]);
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
  }, []);

  return (
    <div className="commentsPresenter">
      {commentsReceived.map((currentComment, index) => {
        return (
          <Comment
            key={index}
            id={currentComment._id}
            score={currentComment.score}
          ></Comment>
        );
      })}
    </div>
  );
}
