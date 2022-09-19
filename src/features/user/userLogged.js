import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  registered: false,
  isLoggedIn: false,
  userNameToolkit: "",
  passWordToolkit: "",
  picturePath: "",
};

export const tryToLog = createAsyncThunk(
  "user/tryToLog",
  async (values, thunkAPI) => {
    const { username, password } = values;
    let urlToUse = "http://localhost:5000/intcommapi/v1/auth/register";
    if (values.from === "login") {
      urlToUse = "http://localhost:5000/intcommapi/v1/auth/login";
    }
    try {
      const resp = await axios.post(
        urlToUse,
        JSON.stringify({ username, password }),
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log(resp);

      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("something went wrong");
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
      }
      if (action.meta.arg.from === "register") {
        state.registered = true;
      }
      state.data = action.payload;
    },
    [tryToLog.rejected]: (state, action) => {
      state.isLoggedIn = false;
    },
  },
});

export const { typedUserName, typedPassword, imageURL } = userSlice.actions;

export default userSlice.reducer;
