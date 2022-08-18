import React, { useContext } from "react";
import { CommentsContext } from "./Context";

export default function Comments() {
  const Comxt = useContext(CommentsContext);
  console.log(CommentsContext);
  return (
    <div className="comments">
      <div className="testing">t1</div>
      <div className="sectesting">t2</div>
    </div>
  );
}
