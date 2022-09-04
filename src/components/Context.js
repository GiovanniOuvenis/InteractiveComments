import React, { useState } from "react";

const CommentsContext = React.createContext();

function CommentsProvider({ children }) {
  const [loggedInOrRegistered, setLoggedInOrRegistered] = useState(false);
  const [userNamefromContext, setUserNameFromContext] = useState("");
  const [picFromContext, setPicFromContext] = useState("");

  const usernameFromChildComponent = (stringValue) => {
    setUserNameFromContext(stringValue);
  };

  const getStatusFromChildComponents = (bln) => {
    setLoggedInOrRegistered(bln);
  };

  const urlOfUserPicture = (strVal) => {
    setPicFromContext(strVal);
  };

  return (
    <CommentsContext.Provider
      value={{
        handler: getStatusFromChildComponents,
        userNameSetter: usernameFromChildComponent,
        userPicture: urlOfUserPicture,
        stateOfUser: loggedInOrRegistered,
      }}
    >
      {children}
    </CommentsContext.Provider>
  );
}

const CommentsConsumer = CommentsContext.Consumer;

export { CommentsContext, CommentsProvider };
