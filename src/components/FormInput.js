import React, { useEffect, useState } from "react";

export default function FormInput(props) {
  const [inputValue, setInputValue] = useState("");
  const [inputImage, setInputImage] = useState([]);
  const handlerFunction = props.handler;

  const eventHandler = (event) => {
    console.log(event.target.files);
    if (props.id === "inputImage") {
      setInputImage(event.target.files[0]);
      handlerFunction(inputImage, event.target);
    }
    setInputValue(event.target.value);
    handlerFunction(event.target.value, event.target);
  };

  return (
    <div>
      <input
        id={props.id}
        type={props.type}
        name={props.name}
        value={inputValue}
        onChange={(event) => eventHandler(event)}
        autoComplete="off"
      />
    </div>
  );
}
