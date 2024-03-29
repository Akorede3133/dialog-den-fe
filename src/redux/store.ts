import { configureStore } from "@reduxjs/toolkit";
import chatReducer from "../features/chats/redux/chatSlice";
export const store = configureStore({
  reducer: {
    chat: chatReducer,
  },
  middleware: (getDefaultMiddleWare) => (
    getDefaultMiddleWare({
      serializableCheck: false,
    })
  ),
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;