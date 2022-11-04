import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { triggerChange } from "../features/user/userLogged";
import axios from "../api/axios";

const EditComment = (props) => {
  const { picturePath } = useSelector((store) => store.userRedux);
  const dispatch = useDispatch();
  const [edited, setEdited] = useState("");

  const editCurrentComment = async (e) => {
    e.preventDefault();

    try {
      const edit = async () => {
        axios
          .patch(
            `/${props.commentId}`,
            {
              edited: edited,
            },
            {
              headers: { "Content-Type": "application/json" },
              withCredentials: true,
            }
          )
          .then((editionResult) => {
            dispatch(triggerChange());
          });
      };
      const editResult = edit();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form className="editComment" id={props.commentId}>
      <img src={picturePath} alt="logged in user" />

      <input
        type="text"
        onChange={(event) => {
          setEdited(event.target.value);
        }}
      ></input>

      <button className="button" type="submit" onClick={editCurrentComment}>
        send
      </button>
    </form>
  );
};

export default EditComment;
