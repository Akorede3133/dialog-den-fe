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
  outGoingVoiceCall: callProp | null;
  incomingVoiceCall: callProp | null;
  onGoingVoiceCall: boolean;
  remoteStream: {
    stream: MediaStream | null,
    peerConnection: RTCPeerConnection | null
  };
  offer: RTCSessionDescriptionInit | null;
  answer: RTCSessionDescriptionInit | null
  offerObj: null;
  iceCandidates: RTCIceCandidate[];
}
const initialState: ChatStateProp = {
  receiver: null,
  voiceCall: false,
  videoCall: false,
  outGoingVoiceCall: null,
  incomingVoiceCall: null,
  onGoingVoiceCall: false,
  offer: null,
  answer: null,
  offerObj: null,
  iceCandidates: [],
  remoteStream: {
    stream: null,
    peerConnection: null
  }
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
      state.incomingVoiceCall = null;
      state.outGoingVoiceCall = null;
      state.remoteStream.stream = null;
      if (state.remoteStream.peerConnection) {
        state.remoteStream.peerConnection.close();
        state.remoteStream.peerConnection.onicecandidate = null;
        state.remoteStream.peerConnection.ontrack = null;
        state.remoteStream.peerConnection = null;

      }
      state.remoteStream.stream = null;      
    },
    setRemoteStream: (state, { payload }: PayloadAction<MediaStream>) => {
      state.remoteStream.stream = payload;
    },
    setRemotePeerConnection: (state, { payload }: PayloadAction<RTCPeerConnection>) => {
      state.remoteStream.peerConnection = payload;
    },
    setOutGoingVoiceCall: (state, { payload }: PayloadAction<callProp | null>) => {
      state.outGoingVoiceCall = payload;
    },
    setIncomingVoiceCall: (state, { payload }: PayloadAction<callProp |  null>) => {
      state.incomingVoiceCall = payload;
    },
    addOffer: (state, { payload }) => {
      state.offer = payload;
    },
    addIce: (state, { payload }: PayloadAction<RTCIceCandidate>) => {
      state.iceCandidates.push(payload)
    },
    addAnswer: (state, { payload }) => {
      state.answer = payload
    },
    setOfferObj: (state, { payload }) => {
      state.offerObj = payload
    }, 
    setOnGoingVoiceCall: (state, { payload }) => {
      state.onGoingVoiceCall = payload;
    }
  }
})

export const { setReceiver, setVoiceCall, setVideoCall, turnOffCalls, setRemoteStream, setRemotePeerConnection, setOutGoingVoiceCall, setIncomingVoiceCall, addIce, addOffer, addAnswer, setOfferObj, setOnGoingVoiceCall } = chatSlice.actions;
export const selectChat = (state: RootState) => state.chat;
export default chatSlice.reducer;