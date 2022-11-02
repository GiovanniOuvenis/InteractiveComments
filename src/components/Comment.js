import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { triggerChange } from "../features/user/userLogged";
import axios from "../api/axios";
//import useWindowDimensions from "../hooks/useWindowDimensions";
import PostComment from "./PostComment";

const Comment = (props) => {
  const { userNameToolkit, trigger } = useSelector((store) => store.userRedux);
  const dispatch = useDispatch();
  //const { height, width } = useWindowDimensions();
  const [pixels, setPixels] = useState("-10000px");
  const [currentScore, setCurrentScore] = useState(0);
  const [nameToRender, setNameToRender] = useState("");
  const [when, setWhen] = useState("");
  const [pic, setPic] = useState("");
  const [which, setWhich] = useState("");
  const [commentBody, setCommentBody] = useState("");
  const [canBeDeleted, setCanBeDeleted] = useState(false);
  const [hasReplies, setHasReplies] = useState(false);
  const [replies, setReplies] = useState([]);
  const [replyForm, setReplyForm] = useState(false);

  const popMessageRef = useRef();

  useEffect(() => {
    setCanBeDeleted(props.comment.authorName === userNameToolkit);
    setCurrentScore(props.comment.score);
    setNameToRender(props.comment.authorName);
    setWhen(props.comment.createdAt);
    setPic(props.comment.authorPicture);
    setWhich(props.comment._id);
    setCommentBody(props.comment.content);
    if (props.comment.replies.length > 0) {
      setHasReplies(true);
      setReplies(props.comment.replies);
    }
  });

  const plusOrMinusHandler = async (e) => {
    e.preventDefault();
    const possibleIdsPlus = ["plusSvg", "plusButton", "plusPath"];
    const targetId = e.target.id;
    let condition = possibleIdsPlus.includes(targetId);
    let operation = "plus";
    if (!condition) {
      operation = "minus";
    }
    try {
      const change = await axios
        .patch(
          `/comments/${which}`,
          { username: userNameToolkit, id: which, type: operation },
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        )
        .then((returnedScore) => {
          setCurrentScore(returnedScore.data.score);
          dispatch(triggerChange(Math.random()));
        });
    } catch (error) {
      console.log(error);
    }
  };

  const deleteHandler = async (e) => {
    e.preventDefault();

    try {
      const act = await axios.delete(`/comments/${which}`).then((res) => {
        setPixels("-10000px");
        trigger(Math.random());
      });
    } catch (error) {
      console.log(error);
    }
  };

  const popDeleteMessage = (e) => {
    e.preventDefault();
    const messageDimensions = popMessageRef.current.getBoundingClientRect();
    if (messageDimensions.x < 0) {
      setPixels("0px");
    }
    if (messageDimensions.x > 0) {
      setPixels("-10000px");
    }
  };

  const replyHandler = async (e) => {
    e.preventDefault();
    setReplyForm(!replyForm);
  };

  return (
    <>
      <div className="comment-container">
        <div className="plusAndMinus">
          <button
            onClick={plusOrMinusHandler}
            className="plus button"
            id="plusButton"
          >
            <svg
              width="11"
              height="11"
              xmlns="http://www.w3.org/2000/svg"
              id="plusSvg"
            >
              <path
                d="M6.33 10.896c.137 0 .255-.05.354-.149.1-.1.149-.217.149-.354V7.004h3.315c.136 0 .254-.05.354-.149.099-.1.148-.217.148-.354V5.272a.483.483 0 0 0-.148-.354.483.483 0 0 0-.354-.149H6.833V1.4a.483.483 0 0 0-.149-.354.483.483 0 0 0-.354-.149H4.915a.483.483 0 0 0-.354.149c-.1.1-.149.217-.149.354v3.37H1.08a.483.483 0 0 0-.354.15c-.1.099-.149.217-.149.353v1.23c0 .136.05.254.149.353.1.1.217.149.354.149h3.333v3.39c0 .136.05.254.15.353.098.1.216.149.353.149H6.33Z"
                fill="#C5C6EF"
                id="plusPath"
              />
            </svg>
          </button>
          <h1 className="score">{currentScore}</h1>
          <button onClick={plusOrMinusHandler} className="minus button">
            <svg width="11" height="3" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M9.256 2.66c.204 0 .38-.056.53-.167.148-.11.222-.243.222-.396V.722c0-.152-.074-.284-.223-.395a.859.859 0 0 0-.53-.167H.76a.859.859 0 0 0-.53.167C.083.437.009.57.009.722v1.375c0 .153.074.285.223.396a.859.859 0 0 0 .53.167h8.495Z"
                fill="#C5C6EF"
              />
            </svg>
          </button>
        </div>
        <div className="iconsAndText">
          <div className="icons">
            <img src={pic} alt="profile picture" className="authorImage" />
            <h1 className="authorName">{nameToRender}</h1>
            {canBeDeleted && <h1 className="you">You</h1>}
            <h1 className="timestamp">{when}</h1>
            <svg
              width="14"
              height="13"
              xmlns="http://www.w3.org/2000/svg"
              className="replyIcon"
              id="replyIcon"
              onClick={replyHandler}
            >
              <path
                onClick={replyHandler}
                className="replyPath"
                d="M.227 4.316 5.04.16a.657.657 0 0 1 1.085.497v2.189c4.392.05 7.875.93 7.875 5.093 0 1.68-1.082 3.344-2.279 4.214-.373.272-.905-.07-.767-.51 1.24-3.964-.588-5.017-4.829-5.078v2.404c0 .566-.664.86-1.085.496L.227 5.31a.657.657 0 0 1 0-.993Z"
                fill="#5357B6"
                id="replyPath"
              />
            </svg>
            <h1 className="replyText" id="replyText" onClick={replyHandler}>
              Reply
            </h1>

            {canBeDeleted && (
              <>
                <svg
                  width="12"
                  height="14"
                  xmlns="http://www.w3.org/2000/svg"
                  className="deleteIcon"
                  onClick={popDeleteMessage}
                >
                  <path
                    onClick={popDeleteMessage}
                    d="M1.167 12.448c0 .854.7 1.552 1.555 1.552h6.222c.856 0 1.556-.698 1.556-1.552V3.5H1.167v8.948Zm10.5-11.281H8.75L7.773 0h-3.88l-.976 1.167H0v1.166h11.667V1.167Z"
                    fill="#ED6368"
                  />
                </svg>

                <h1 className="deleteText" onClick={popDeleteMessage}>
                  delete
                </h1>
              </>
            )}

            <div
              className="deleteConfirmation"
              ref={popMessageRef}
              style={{ transform: `translateX(${pixels})` }}
            >
              <h1 className="deleteHeading">Delete comment</h1>
              <div className="deleteMessage">
                Are you sure you want to delete this comment?This will remove
                the comment and can't be undone
              </div>
              <div className="buttons">
                <button onClick={popDeleteMessage}>NO, CANCEL</button>
                <button onClick={deleteHandler}>YES, DELETE</button>
              </div>
            </div>

            {canBeDeleted && (
              <>
                <svg
                  width="14"
                  height="14"
                  xmlns="http://www.w3.org/2000/svg"
                  className="editIcon"
                >
                  <path
                    d="M13.479 2.872 11.08.474a1.75 1.75 0 0 0-2.327-.06L.879 8.287a1.75 1.75 0 0 0-.5 1.06l-.375 3.648a.875.875 0 0 0 .875.954h.078l3.65-.333c.399-.04.773-.216 1.058-.499l7.875-7.875a1.68 1.68 0 0 0-.061-2.371Zm-2.975 2.923L8.159 3.449 9.865 1.7l2.389 2.39-1.75 1.706Z"
                    fill="#5357B6"
                  />
                </svg>
                <h1 className="editText">edit</h1>
              </>
            )}
          </div>
          <div className="commentText">{commentBody}</div>
        </div>
      </div>
      {hasReplies && (
        <>
          {replies.map((reply) => {
            return <Comment comment={reply} />;
          })}
        </>
      )}
      {replyForm && <PostComment commentId={which}></PostComment>}
    </>
  );
};

export default Comment;
