import React, { useEffect, useRef, useState } from "react";
import Button from "./Button";
import Form from "./Form";
import Register from "./Register";
import UploadImage from "./UploadImage";

export default function Welcome() {
  const welcomeRef = useRef();
  const registerformRef = useRef();
  const loginformRef = useRef();
  const [condition, setCondition] = useState(true);

  const registerClick = (e) => {
    e.preventDefault();
    registerformRef.current.classList.remove("hidden");
  };

  const loginCLick = (e) => {
    e.preventDefault();
    loginformRef.current.classList.remove("hidden");
  };

  const getBooleanFromChild = (arg) => {
    setCondition(arg);
    return;
  };

  return (
    <div className="welcome" ref={welcomeRef}>
      <h1 className="heading">Please register to create your account</h1>
      <Button text="register" handler={registerClick}></Button>
      <div className="register-forms hidden" ref={registerformRef}>
        <UploadImage></UploadImage>
      </div>
      {/* <h1 className="heading">Login if you aready have an account</h1>
      <Button text="login" handler={loginCLick}></Button>
      <div className="loginform hidden" ref={loginformRef}></div> */}
    </div>
  );
}
