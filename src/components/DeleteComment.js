import React, { useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "../api/axios";
import { triggerChange, deleteRequest } from "../features/user/userLogged";

export const DeleteComment = () => {
  const { deleteComment, commentToDelete } = useSelector(
    (store) => store.userRedux
  );
  const dispatch = useDispatch();
  const deleteContainerRef = useRef();

  useEffect(() => {
    if (deleteComment) {
      deleteContainerRef.current.classList.toggle("hidden");
    }
  }, [deleteComment]);

  const deleteHandler = async (e) => {
    e.preventDefault();

    try {
      const act = await axios
        .delete(`/comments/${commentToDelete}`)
        .then((res) => {
          dispatch(triggerChange());
          dispatch(deleteRequest());
          deleteContainerRef.current.classList.toggle("hidden");
        });
    } catch (error) {
      console.log(error);
    }
  };

  const cancelDelete = (e) => {
    e.preventDefault();
    dispatch(deleteRequest(""));
    deleteContainerRef.current.classList.toggle("hidden");
  };

  return (
    <div className="deleteContainer hidden brer" ref={deleteContainerRef}>
      <h1 className="deleteheader">Delete comment</h1>
      <p className="deletemessage">
        Are you sure you want to delete this comment?This will remove the
        comment and can't be undone
      </p>
      <div className="buttons">
        <button className="button no brer" onClick={cancelDelete}>
          NO, CANCEL
        </button>
        <button className="button yes brer" onClick={deleteHandler}>
          YES, DELETE
        </button>
      </div>
    </div>
  );
};
