import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

export default function Form(props) {
  const usernameRef = useRef();
  const passwordRef = useRef();
  const urlRef = useRef("http://localhost:5000/intcommapi/v1/auth/login");
  const [userName, setUserName] = useState("");
  const [passWord, setPasword] = useState("");

  const registerurl = "http://localhost:5000/intcommapi/v1/auth/register";
  let typeOfForm = props.derivedFrom;
  let un = props.areaone;
  let pw = props.areatwo;

  useEffect(() => {
    if (typeOfForm === "register") {
      urlRef.current = registerurl;
    }
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    let userNameToSend = userName;
    let passWordToSend = passWord;
    props.toggleCondition(false);
    if (!userName || !passWord) {
      userNameToSend = usernameRef.current;
      passWordToSend = passwordRef.current;
    }

    const postReq = await axios
      .post(urlRef.current, {
        username: userNameToSend,
        password: passWordToSend,
      })
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    const keyDownHandler = (event) => {
      const usernameValue = document.getElementById(
        typeOfForm + "username"
      ).value;
      const passwordValue = document.getElementById(
        typeOfForm + "password"
      ).value;
      usernameRef.current = usernameValue;
      passwordRef.current = passwordValue;

      if (event.key === "Enter") {
        event.preventDefault();
        handleSubmit(event);
      }
    };

    document.addEventListener("keydown", keyDownHandler);

    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  });

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>{un}</label>
        <input
          ref={usernameRef}
          id={typeOfForm + un}
          type="text"
          name={un}
          value={userName}
          onChange={(event) => {
            setUserName(event.target.value);
          }}
          autoComplete="off"
        />
        <label>{pw}</label>
        <input
          ref={passwordRef}
          id={typeOfForm + pw}
          type={pw}
          name={pw}
          value={passWord}
          onChange={(event) => setPasword(event.target.value)}
          autoComplete="off"
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
