import React, { useEffect, useRef, useState } from "react";
import Button from "./Button";
import Form from "./Form";

export default function Welcome() {
  const welcomeRef = useRef();
  const registerformRef = useRef();
  const [height, setHeight] = useState();

  const registerClick = (e) => {
    e.preventDefault();
    registerformRef.current.classList.remove("hidden");
  };

  return (
    <div className="welcome" ref={welcomeRef}>
      <h1 className="heading">Please register to create your account</h1>
      <Button text="register" handler={registerClick}></Button>
      <div className="register-forms hidden" ref={registerformRef}>
        <Form label="register" areaone="username" areatwo="password"></Form>
      </div>
      <h1 className="heading">Login if you aready have an account</h1>
      <Button text="login"></Button>
    </div>
  );
}
