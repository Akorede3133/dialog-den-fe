import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit'
import { RootState } from "../../../redux/store";


type ReceiverProp = {
  id: number;
  username: string;
  email: string;
}
type ChatStateProp = {
  receiver: ReceiverProp | null
}
const initialState: ChatStateProp = {
  receiver: null
}

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setReceiver: (state, { payload }: PayloadAction<ReceiverProp>) => {
      state.receiver = payload;
    }
  }
})

export const { setReceiver } = chatSlice.actions;
export const selectChat = (state: RootState) => state.chat;
export default chatSlice.reducer;