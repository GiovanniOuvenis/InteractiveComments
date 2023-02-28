import React from "react";

export default function Button(props) {
  return (
    <button className="button brer" onClick={props.handler}>
      {props.text}
    </button>
  );
}
