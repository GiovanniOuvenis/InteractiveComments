import React, { useEffect, useState } from "react";
import Welcome from "./Welcome";
import { Loading } from "./Loading";
import CommentsPresenter from "./CommentsPresenter";
import { useSelector, useDispatch } from "react-redux";
import { tryToRefresh } from "../features/user/userLogged";

export const TopComponent = () => {
  const [welcome, setWelcome] = useState(false);
  const [safe, setSafe] = useState(false);
  const { isLoggedIn } = useSelector((store) => store.userRedux);
  const dispatch = useDispatch();

  useEffect(() => {
    setSafe(isLoggedIn);
    setWelcome(false);
  }, [isLoggedIn]);

  useEffect(() => {
    const handleRefresh = async () => {
      try {
        const refreshResult = dispatch(tryToRefresh()).then((resultObj) => {
          console.log(resultObj);
          if (resultObj.payload) {
            setWelcome(false);
            setSafe(true);
          }
          if (!resultObj.payload) {
            setWelcome(true);
          }
        });
        console.log(refreshResult);
      } catch (err) {
        console.log(err);
      }
    };
    handleRefresh();
  }, []);

  return (
    <>
      {!safe && !welcome && <Loading></Loading>}
      {safe && <CommentsPresenter></CommentsPresenter>}
      {welcome && <Welcome></Welcome>}
    </>
  );
};
