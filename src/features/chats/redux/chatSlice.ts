import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit'
import { RootState } from "../../../redux/store";


type ReceiverProp = {
  id: number;
  username: string;
  email: string;
}
export type callProp = {
  username: string;
  id: number;
  email: string;

}
type ChatStateProp = {
  receiver: ReceiverProp | null,
  voiceCall: boolean,
  videoCall: boolean,
  localStream: MediaStream,
  outGoingVoiceCall: callProp;
  incomingVoiceCall: callProp;
}
const initialState: ChatStateProp = {
  receiver: null,
  voiceCall: false,
  videoCall: false,
  localStream: {} as MediaStream,
  outGoingVoiceCall: {} as callProp
}

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setReceiver: (state, { payload }: PayloadAction<ReceiverProp>) => {
      state.receiver = payload;
    },
    setVoiceCall: (state) => {
      state.voiceCall = true;
    },
    setVideoCall: (state) => {
      state.videoCall = true;
    },
    turnOffCalls: (state) => {
      state.voiceCall = false;
      state.videoCall = false;
    },
    setLocalStream: (state, { payload }: PayloadAction<MediaStream>) => {
      state.localStream = payload;
    },
    setOutGoingVoiceCall: (state, { payload }: PayloadAction<callProp>) => {
      state.outGoingVoiceCall = payload;
    },
    setIncomingVoiceCall: (state, { payload }: PayloadAction<callProp>) => {
      state.incomingVoiceCall = payload;
    },
  }
})

export const { setReceiver, setVoiceCall, setVideoCall, turnOffCalls, setLocalStream, setOutGoingVoiceCall, setIncomingVoiceCall } = chatSlice.actions;
export const selectChat = (state: RootState) => state.chat;
export default chatSlice.reducer;