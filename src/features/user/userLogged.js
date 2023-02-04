import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../api/axios";

const initialState = {
  registered: false,
  isLoggedIn: false,
  userNameToolkit: "",
  passWordToolkit: "",
  picturePath: "",
  pictureBig: "",
  accessTkn: "",
  trigger: false,
  deleteComment: false,
  commentToDelete: "",
};

export const tryToLog = createAsyncThunk(
  "user/tryToLog",
  async (values, thunkAPI) => {
    const { username, password } = values;
    let urlToUse = "/auth/register";
    if (values.from === "login") {
      urlToUse = "/auth/login";
    }
    try {
      const resp = await axios.post(
        urlToUse,
        JSON.stringify({ username, password }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      return resp.data;
    } catch (error) {
      console.log(error.response.data);
      if (error.response.status === 403) {
        return thunkAPI.rejectWithValue(error.response.data.msg);
      }
      if (error.response.status === 400) {
        return thunkAPI.rejectWithValue(error.response.data.msg);
      }
    }
  }
);

export const tryToRefresh = createAsyncThunk(
  "user/tryToRefresh",
  async (thunkAPI) => {
    try {
      const refreshResponse = await axios.get("/auth/refresh", {
        withCredentials: true,
      });

      return refreshResponse.data;
    } catch (error) {
      console.log(error);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    typedUserName: (state, { payload }) => {
      state.userNameToolkit = payload;
    },
    typedPassword: (state, { payload }) => {
      state.passWordToolkit = payload;
    },
    imageURL: (state, { payload }) => {
      state.picturePath = payload.small;
      state.pictureBig = payload.big;
      state.isLoggedIn = true;
    },
    triggerChange: (state, { payload }) => {
      console.log("triggered");
      state.trigger = !state.trigger;
    },
    deleteRequest: (state, { payload }) => {
      state.deleteComment = !state.deleteComment;
      state.commentToDelete = payload;
    },
  },
  extraReducers: {
    [tryToLog.pending]: (state) => {
      state.isLoggedIn = false;
      state.passWordToolkit = "";
    },
    [tryToLog.fulfilled]: (state, action) => {
      if (action.meta.arg.from === "login") {
        state.isLoggedIn = true;
        state.picturePath = action.payload.image.big;
        state.accessTkn = action.payload.accessToken;
      }
      if (action.meta.arg.from === "register") {
        state.registered = true;
      }
      state.data = action.payload;
    },
    [tryToLog.rejected]: (state, action) => {
      state.isLoggedIn = false;
    },
    [tryToRefresh.pending]: (state, action) => {},
    [tryToRefresh.fulfilled]: (state, action) => {
      if (!action.payload) {
        return;
      }
      state.isLoggedIn = true;
      state.accessTkn = action.payload.accessToken;
      state.userNameToolkit = action.payload.un;
      state.picturePath = action.payload.pic.big;
    },
    [tryToRefresh.rejected]: (state, action) => {
      console.log(state, action);
    },
  },
});

export const {
  typedUserName,
  typedPassword,
  imageURL,
  triggerChange,
  deleteRequest,
} = userSlice.actions;

export default userSlice.reducer;
