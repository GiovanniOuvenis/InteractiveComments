import "./App.css";
import { useContext } from "react";
import { CommentsContext } from "./components/Context";
import Welcome from "./components/Welcome";
import CommentsPresenter from "./components/CommentsPresenter";

function App() {
  const appContext = useContext(CommentsContext);
  const condition = appContext.stateOfUser;
  return (
    <>
      {!condition && <Welcome></Welcome>}
      {condition && <CommentsPresenter></CommentsPresenter>}
    </>
  );
}

export default App;
