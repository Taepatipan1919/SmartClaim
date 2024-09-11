import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: "ไม่รายชื่อ",
  Data: {},
};

export const patientSlice = createSlice({
  name: "patient",
  initialState,
  reducers: {
    save2: (state, action) => {
      state.value = action.payload.value;
      state.Data = action.payload.Data;
    },
  },
});
export const { save2 } = patientSlice.actions;
export default patientSlice.reducer;
