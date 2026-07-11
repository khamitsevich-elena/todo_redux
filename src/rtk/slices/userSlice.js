import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { localStorageHelpers } from "../../helpers/localStorageHelpers";

export const registration = createAsyncThunk(
  "user/registration",
  async ({ email, password }, thunkAPI) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_URL}/auth/register`,
        {
          method: "POST",
          headers: {
            accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        }
      );
      const data = await response.json();
      if (data.error) {
        return thunkAPI.rejectWithValue(data);
      }
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const login = createAsyncThunk(
  "user/login",
  async ({ email, password }, thunkAPI) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_URL}/auth/login`, {
        method: "POST",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
      const data = await response.json();
      if (data.error) {
        return thunkAPI.rejectWithValue(data);
      }
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    loading: true,
    errors: null,
  },
  reducers: {
    deleteErrors(state) {
      state.errors = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        (action) => action.type.endsWith("/pending"),
        (state) => {
          state.loading = true;
        }
      )
      .addMatcher(
        (action) => action.type.endsWith("/fulfilled"),
        (state, action) => {
          state.loading = false;
          localStorageHelpers.set(action.payload["access_token"]);
        }
      )
      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state, action) => {
          state.loading = false;
          state.errors = action.payload.message;
          console.log(state.errors);
        }
      );
  },
});

export const { deleteErrors } = userSlice.actions;
export default userSlice.reducer;
