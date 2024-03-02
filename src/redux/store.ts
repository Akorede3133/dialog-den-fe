import { configureStore } from "@reduxjs/toolkit";
import chatReducer from "../features/chats/redux/chatSlice";
import socketReducer from "../features/chats/redux/socketSlice";
export const store = configureStore({
  reducer: {
    chat: chatReducer,
    socket: socketReducer,
  }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;