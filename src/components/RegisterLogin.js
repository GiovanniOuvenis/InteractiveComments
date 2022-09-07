import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Button from "./Button";
import FormInput from "./FormInput";
import UploadImage from "./UploadImage";
import { CommentsContext } from "./Context";

export default function RegisterLogin(props) {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [registered, setRegistered] = useState(false);
  const [endpoint, setEndpoint] = useState(
    "http://localhost:5000/intcommapi/v1/auth/register"
  );
  const registerLoginContext = useContext(CommentsContext);
  const sendUsernameToContext = registerLoginContext.userNameSetter;
  const sendStatusToContext = registerLoginContext.handler;
  const action = props.act;

  useEffect(() => {
    if (action === "login") {
      setEndpoint("http://localhost:5000/intcommapi/v1/auth/login");
    }
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();

    const dataToSend = {
      username: userName,
      password: password,
    };

    const postrequest = await axios
      .post(endpoint, dataToSend)
      .then((result) => {
        if (result.status === 201) {
          setRegistered(true);
          sendUsernameToContext(userName);
        }
        if (action === "login") {
          sendStatusToContext(true);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getInputValueFromChild = (valueOne, valueTwo) => {
    if (valueTwo.name === "username") {
      setUserName(valueOne);
    }
    if (valueTwo.name === "password") {
      setPassword(valueOne);
    }
  };

  return (
    <div>
      <form onSubmit={submitHandler} method="POST">
        <label>username</label>
        <FormInput
          name="username"
          type="text"
          id={"username" + `${action}`}
          handler={getInputValueFromChild}
        ></FormInput>
        <label>password</label>
        <FormInput
          name="password"
          type="password"
          id={"password" + `${action}`}
          handler={getInputValueFromChild}
        ></FormInput>
        <Button text="submit"></Button>
      </form>
      {registered && <UploadImage un={userName}></UploadImage>}
    </div>
  );
}
