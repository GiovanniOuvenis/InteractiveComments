import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../api/axios";

const initialState = {
  registered: false,
  isLoggedIn: false,
  userNameToolkit: "",
  passWordToolkit: "",
  picturePath: "",
  accessTkn: "",
};

export const tryToLog = createAsyncThunk(
  "user/tryToLog",
  async (values, thunkAPI) => {
    const { username, password } = values;
    let urlToUse = "/register";
    if (values.from === "login") {
      urlToUse = "/login";
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
      return thunkAPI.rejectWithValue("something went wrong");
    }
  }
);

export const tryToRefresh = createAsyncThunk(
  "user/tryToRefresh",
  async (thunkAPI) => {
    // oti kanei h refresh function
    try {
      const refreshResponse = await axios.get("/refresh", {
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
      state.picturePath = payload;
      state.registered = true;
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
        state.picturePath = action.payload.image.png;
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
      state.accessTkn = action.payload.accessToken;
    },
    [tryToRefresh.rejected]: (state, action) => {
      console.log(state, action);
    },
  },
});

export const { typedUserName, typedPassword, imageURL } = userSlice.actions;

export default userSlice.reducer;
