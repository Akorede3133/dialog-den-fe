import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  socket: null,
}
const socketSlice = createSlice({
  name: 'socket',
  initialState,
  reducers: {}
})

export default socketSlice.reducer;