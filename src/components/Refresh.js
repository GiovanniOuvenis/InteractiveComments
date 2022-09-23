import React from "react";
import Button from "./Button";
import { useDispatch } from "react-redux";
import { tryToRefresh } from "../features/user/userLogged";

export const Refresh = () => {
  const dispatch = useDispatch();

  const refreshHandler = async (e) => {
    e.preventDefault();
    try {
      const refreshResult = await dispatch(tryToRefresh());

      return refreshResult;
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div onClick={refreshHandler}>
      <Button text="refresh"></Button>
    </div>
  );
};
