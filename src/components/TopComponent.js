import React, { useEffect, useState } from "react";
import Welcome from "./Welcome";
import CommentsPresenter from "./CommentsPresenter";
import { useSelector, useDispatch } from "react-redux";
import { tryToRefresh } from "../features/user/userLogged";

export const TopComponent = () => {
  const [safe, setSafe] = useState(false);
  const { accessTkn, isLoggedIn } = useSelector((store) => store.userRedux);
  const dispatch = useDispatch();

  useEffect(() => {
    setSafe(isLoggedIn);
  }, [isLoggedIn]);

  useEffect(() => {
    const handleRefresh = async () => {
      try {
        const refreshResult = dispatch(tryToRefresh()).then((resultObj) => {
          setSafe(resultObj.payload ? true : false);
        });
        console.log(refreshResult);
      } catch (err) {
        console.log(err);
      }
    };
    handleRefresh();
    console.log(accessTkn);
    if (accessTkn) {
      setSafe(true);
    }
  }, []);

  return (
    <>
      {!safe && <Welcome></Welcome>}
      {safe && <CommentsPresenter></CommentsPresenter>}
    </>
  );
};
