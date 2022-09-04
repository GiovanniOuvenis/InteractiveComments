import React, { useState } from "react";

export default function FormInput(props) {
  const [inputValue, setInputValue] = useState("");

  const handlerFunction = props.handler;

  const eventHandler = (event) => {
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
