import React, { useRef } from "react";
import Button from "./Button";
import RegisterLogin from "./RegisterLogin";

export default function Welcome() {
  const welcomeRef = useRef();
  const registerformRef = useRef();
  const loginformRef = useRef();

  const toggleVisibility = (e) => {
    e.preventDefault();
    e.target.lastChild.data === "register"
      ? registerformRef.current.classList.toggle("hidden")
      : loginformRef.current.classList.toggle("hidden");
  };

  return (
    <div className="welcome" ref={welcomeRef}>
      <h1 className="heading">Please register to create your account</h1>
      <Button text="register" handler={toggleVisibility}></Button>
      <div className="registerLogin-forms hidden" ref={registerformRef}>
        <RegisterLogin act="register"></RegisterLogin>
      </div>
      <h1 className="heading">Login if you aready have an account</h1>
      <Button text="login" handler={toggleVisibility}></Button>
      <div className="registerLogin-forms hidden" ref={loginformRef}>
        <RegisterLogin act="login"></RegisterLogin>
      </div>
    </div>
  );
}
