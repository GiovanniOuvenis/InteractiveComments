import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

export default function Form(props) {
  const [userName, setUserName] = useState("");
  const [passWord, setPasword] = useState("");
  const usernameRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let userNameToSend = userName;
    let passWordToSend = passWord;
    if (!userName || !passWord) {
      console.log("state values exist");
      userNameToSend = usernameRef.current;
      passWordToSend = passwordRef.current;
    }

    console.log(userNameToSend, passWordToSend);
    // const postReq = await axios
    //   .post("http://localhost:5000/intcommapi/v1/auth/register", {
    //     username: usernameRef.current,
    //     password: passWord,
    //   })
    //   .then((response) => {
    //     console.log(response);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  };

  useEffect(() => {
    const keyDownHandler = (event) => {
      let usernameValue = document.getElementById("usernameform").value;
      let passwordValue = document.getElementById("passwordform").value;
      if (event.key === "Enter") {
        usernameRef.current = usernameValue;
        passwordRef.current = passwordValue;
        event.preventDefault();
        handleSubmit(event);
      }
    };

    document.addEventListener("keydown", keyDownHandler);

    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  }, []);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          ref={usernameRef}
          id="usernameform"
          type="text"
          name="username"
          value={userName}
          onChange={(event) => {
            setUserName(event.target.value);
          }}
          autoComplete="off"
        />
        <input
          ref={passwordRef}
          id="passwordform"
          type="password"
          name="password"
          value={passWord}
          onChange={(event) => setPasword(event.target.value)}
          autoComplete="off"
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
