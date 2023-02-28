import React, { useState } from "react";
import Button from "./Button";
import FormInput from "./FormInput";
import UploadImage from "./UploadImage";
import { useSelector, useDispatch } from "react-redux";
import { tryToLog } from "../features/user/userLogged";

export default function RegisterLogin(props) {
  const { userNameToolkit, passWordToolkit, registered } = useSelector(
    (store) => store.userRedux
  );
  const [message, setMessage] = useState(" ");
  const dispatch = useDispatch();
  const actionProp = props.act;

  const dataToSend = {
    from: actionProp,
    username: userNameToolkit,
    password: passWordToolkit,
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const result = await dispatch(tryToLog(dataToSend));
      setMessage(result.payload);

      return result;
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <form onSubmit={submitHandler} method="POST">
        <label>username</label>
        <FormInput
          name="username"
          type="text"
          id={"username" + `${actionProp}`}
        ></FormInput>
        <label>password</label>
        <FormInput
          name="password"
          type="password"
          id={"password" + `${actionProp}`}
        ></FormInput>
        <Button text="submit"></Button>
      </form>
      {registered && <UploadImage></UploadImage>}
      {message.length > 1 && <div>{message}</div>}
    </div>
  );
}
