import React from "react";
import { useEffect } from "react";
import PostComment from "./PostComment";
import axios from "axios";
import Comments from "./Comments";

export default function Background() {
  // useEffect(() => {
  //   const testFetchData = async () => {
  //     await axios.get("intcommapi/v1/comments").then((response) => {
  //       console.log(response);
  //     });
  //   };
  //   testFetchData();
  // }, []);

  return (
    <div className="backgroundLayer">
      <Comments></Comments>
      <PostComment></PostComment>
    </div>
  );
}
