import React, { useRef } from "react";
import Button from "./Button";
import RegisterLogin from "./RegisterLogin";
import { Route } from "react-router-dom";
import { Refresh } from "./Refresh";

export default function Welcome() {
  const welcomeRef = useRef();
  const registerformRef = useRef();
  const loginformRef = useRef();

  const registerClick = (e) => {
    e.preventDefault();
    registerformRef.current.classList.remove("hidden");
  };

  const loginCLick = (e) => {
    e.preventDefault();
    loginformRef.current.classList.remove("hidden");
  };

  return (
    <div className="welcome" ref={welcomeRef}>
      <h1 className="heading">Please register to create your account</h1>
      <Button text="register" handler={registerClick}></Button>
      <div className="register-forms hidden" ref={registerformRef}>
        <RegisterLogin act="register"></RegisterLogin>
      </div>
      <h1 className="heading">Login if you aready have an account</h1>
      <Button text="login" handler={loginCLick}></Button>
      <div className="loginform hidden" ref={loginformRef}>
        <RegisterLogin act="login"></RegisterLogin>
      </div>
      <Refresh></Refresh>
    </div>
  );
}
