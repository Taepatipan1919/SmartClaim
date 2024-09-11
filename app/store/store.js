import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "./counterSlice";
import patientSlice from "./patientSlice";
export const store = configureStore({
  reducer: {
    DataTran: counterSlice,
    Patient: patientSlice,
  },
});
