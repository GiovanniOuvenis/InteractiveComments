import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { typedUserName, typedPassword } from "../features/user/userLogged";

export default function FormInput(props) {
  const dispatch = useDispatch();
  const passOrUn = props.name;
  const [inputValue, setInputValue] = useState("");

  const eventHandler = (event) => {
    setInputValue(event.target.value);
    switch (passOrUn) {
      case "username":
        dispatch(typedUserName(event.target.value));
        break;
      case "password":
        dispatch(typedPassword(event.target.value));
        break;
    }
  };

  return (
    <div>
      <input
        id={props.id}
        type={passOrUn}
        name={props.name}
        value={inputValue}
        onChange={(event) => eventHandler(event)}
        autoComplete="off"
      />
    </div>
  );
}
