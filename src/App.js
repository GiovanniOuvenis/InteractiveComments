import "./App.css";
import Welcome from "./components/Welcome";
import CommentsPresenter from "./components/CommentsPresenter";
import { useSelector } from "react-redux";

function App() {
  const { registered, isLoggedIn } = useSelector((store) => store.userRedux);

  return (
    <>
      {!isLoggedIn && <Welcome></Welcome>}
      {isLoggedIn && <CommentsPresenter></CommentsPresenter>}
    </>
  );
}

export default App;
