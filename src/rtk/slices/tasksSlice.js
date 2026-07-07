import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { localStorageHelpers } from "../../helpers/localStorageHelpers";

export const registration = createAsyncThunk(
  "tasks/registration",
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
  "tasks/login",
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
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getTasks = createAsyncThunk(
  "tasks/getTasks",
  async (_, thunkAPI) => {
    if (localStorageHelpers.get()) {
      try {
        const response = await fetch(`${import.meta.env.VITE_URL}/todos`, {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${localStorageHelpers.get()}`,
          },
        });
        const todos = await response.json();
        return thunkAPI.fulfillWithValue(todos);
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    }
  }
);

export const deleteTask = createAsyncThunk(
  "tasks/deleteTask",
  async (id, thunkAPI) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_URL}/todos/${id}`, {
        method: "DELETE",
        headers: {
          accept: "*/*",
          Authorization: `Bearer ${localStorageHelpers.get()}`,
        },
      });
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const createTasks = createAsyncThunk(
  "tasks/createTasks",
  async (task, thunkAPI) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_URL}/todos`, {
        method: "POST",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${localStorageHelpers.get()}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
      });
      const data = await response.json();
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const editTasks = createAsyncThunk(
  "tasks/editTasks",
  async ({ id, editTask }, thunkAPI) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_URL}/todos/${id}`, {
        method: "PATCH",
        headers: {
          accept: "*/*",
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorageHelpers.get()}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editTask),
      });
      return { id: id, editTask: editTask };
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const doneTasks = createAsyncThunk(
  "tasks/doneTasks",
  async ({ e, id }, thunkAPI) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_URL}/todos/${id}`, {
        method: "PATCH",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${localStorageHelpers.get()}`,
          "Content-Type": "application/json",
          accept: "*/*",
        },
        body: JSON.stringify({
          completed: e.target.checked,
        }),
      });
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const filterTasks = createAsyncThunk(
  "tasks/filterTasks",
  async (filter, thunkAPI) => {
    if (localStorageHelpers.get()) {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_URL}/todos${filter}`,
          {
            method: "GET",
            headers: {
              accept: "application/json",
              Authorization: `Bearer ${localStorageHelpers.get()}`,
            },
          }
        );
        const todos = await response.json();
        return thunkAPI.fulfillWithValue(todos);
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    }
  }
);

const tasksSlice = createSlice({
  name: "tasks",
  initialState: {
    value: [],
    filter: "",
    loading: true,
    errors: null,
  },
  reducers: {
    setFilter(state, action) {
      state.filter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.value = action.payload.data;
      })
      .addCase(createTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.value.push(action.payload);
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.loading = false;
        state.value = state.value.filter((item) => item.id != action.payload);
      })
      .addCase(editTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.value = state.value.map((item) =>
          item.id != action.payload.id ? item : action.payload.editTask
        );
      })
      .addCase(doneTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.value = state.value.map((item) =>
          item.id != action.payload
            ? item
            : { ...item, completed: !item.completed }
        );
      })
      .addCase(filterTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.value = action.payload.data;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        localStorageHelpers.set(action.payload["access_token"]);
      })
      .addCase(registration.fulfilled, (state, action) => {
        state.loading = false;
        localStorageHelpers.set(action.payload["access_token"]);
      })
      .addCase(registration.rejected, (state, action) => {
        state.loading = false;
        state.errors = action.payload.message;
        console.log(state.errors);
      })
      .addMatcher(
        (action) => action.type.endsWith("/pending"),
        (state) => {
          state.loading = true;
        }
      )
      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state, action) => {
          state.loading = false;
          // state.errors = action.payload.message;
        }
      );
  },
});
export const { setFilter } = tasksSlice.actions;
export default tasksSlice.reducer;
