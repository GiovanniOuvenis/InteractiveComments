import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "./Button";
import FormInput from "./FormInput";

export default function Register() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [imageFile, setImageFile] = useState();

  const submitHandler = async (e) => {
    e.preventDefault();

    const formToSend = new FormData();
    const appendValue = async (arg) => {
      await arg.append("username", userName);
      return arg;
    };
    formToSend.append("username", userName);
    formToSend.append("password", password);
    formToSend.append("image", imageFile);

    const postrequest = await axios
      .post("http://localhost:5000/intcommapi/v1/auth/register", formToSend)
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  console.log(imageFile);
  const getInputValueFromChild = (valueOne, valueTwo) => {
    if (valueTwo.id === "inputImage") {
      setImageFile(valueOne);
    }
    if (valueTwo.id === "usernameRegister") {
      setUserName(valueOne);
    }
    if (valueTwo.id === "passwordRegister") {
      setPassword(valueOne);
    }
  };

  return (
    <form onSubmit={submitHandler} method="POST" encType="multipart/form-data">
      <label>username</label>
      <FormInput
        name="username"
        type="text"
        id="usernameRegister"
        handler={getInputValueFromChild}
      ></FormInput>
      <label>password</label>
      <FormInput
        name="password"
        type="text"
        id="passwordRegister"
        handler={getInputValueFromChild}
      ></FormInput>
      <FormInput
        id="inputImage"
        name="upload image"
        type="file"
        handler={getInputValueFromChild}
      ></FormInput>
      <Button text="submit"></Button>
    </form>
  );
}
