import { configureStore } from "@reduxjs/toolkit";
import counteReducer from "./reducers/counterSlice";
import habrSlice from "./reducers/habrSlice";

export default configureStore({
  reducer: {
    counter: counteReducer,
    habr: habrSlice,
  },
});
