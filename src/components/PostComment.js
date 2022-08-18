import React from "react";
import Button from "./Button";
import Form from "./Form";
import Icon from "./Icon";

export default function PostComment() {
  return (
    <div className="post-comment">
      <Form></Form>
      <Icon></Icon>
      <Button text={"SEND"}></Button>
    </div>
  );
}
