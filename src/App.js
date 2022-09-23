import "./App.css";
import Welcome from "./components/Welcome";
import CommentsPresenter from "./components/CommentsPresenter";
import Layout from "./components/Layout";
import { useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";

function App() {
  const { registered, isLoggedIn } = useSelector((store) => store.userRedux);

  return (
    <>
      <Welcome></Welcome>
    </>
  );
}

export default App;
