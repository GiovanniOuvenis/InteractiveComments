import React, { useEffect, useState } from "react";

const CommentsContext = React.createContext();

function CommentsProvider({ children }) {
  const [valueState, setValueState] = useState("state");

  return (
    <CommentsContext.Provider value={{ valueState }}>
      {children}
    </CommentsContext.Provider>
  );
}

const CommentsConsumer = CommentsContext.Consumer;

export { CommentsContext, CommentsProvider };
