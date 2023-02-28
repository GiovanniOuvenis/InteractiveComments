import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/user/userLogged";
const commentsStore = configureStore({
  reducer: {
    userRedux: userReducer,
  },
});

export default commentsStore;
