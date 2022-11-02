import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../api/axios";

const initialState = {
  registered: false,
  isLoggedIn: false,
  userNameToolkit: "",
  passWordToolkit: "",
  picturePath: "",
  accessTkn: "",
  trigger: false,
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
      if (error.response.status === 403) {
        return thunkAPI.rejectWithValue("Password or Username are not correct");
      }
      if (error.response.status === 400) {
        return thunkAPI.rejectWithValue("Please provide username and Password");
      }
    }
  }
);

export const tryToRefresh = createAsyncThunk(
  "user/tryToRefresh",
  async (thunkAPI) => {
    // oti kanei h refresh function
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
      state.picturePath = payload;
      state.isLoggedIn = true;
    },
    triggerChange: (state, { payload }) => {
      state.trigger = !state.trigger;
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
      state.isLoggedIn = true;
      state.accessTkn = action.payload.accessToken;
      state.userNameToolkit = action.payload.un;
      state.picturePath = action.payload.pic;
    },
    [tryToRefresh.rejected]: (state, action) => {
      console.log(state, action);
    },
  },
});

export const { typedUserName, typedPassword, imageURL, triggerChange } =
  userSlice.actions;

export default userSlice.reducer;
