import React, { useState, useEffect } from "react";
import axios from "axios";

export default function CommentsPresenter() {
  const [comments, setComments] = useState([]);
  const ep = "http://localhost:5000/intcommapi/v1/comments";

  useEffect(() => {
    const receiveComments = async () => {
      await axios
        .get(ep)
        .then((commentList) => {
          setComments(commentList.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    receiveComments();
  }, []);
  return <div>CommentsPresenter</div>;
}
