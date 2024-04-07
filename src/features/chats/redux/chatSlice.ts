import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit'
import { RootState } from "../../../redux/store";
import { Socket, io } from "socket.io-client";
import useCurrentUser from "../../auth/hooks/useCurrentUser";
import { currentUser } from "../../auth/api/auth";
import { UserProp } from "../../contacts/components/ContactCard";


type ReceiverProp = {
  id: number;
  username: string;
  email: string;
}
export type callProp = {
  username: string;
  id: number;
  email: string;
  type: string;
}
export type offerObjProp = {
  offererId: number,
  offer: RTCSessionDescriptionInit
  offererIceCandiates: RTCIceCandidate[],
  answererId: number,
  answer: RTCSessionDescriptionInit,
  answererIceCandiates: RTCIceCandidate[],
}

type ChatStateProp = {
  socket: Socket,
  loggedInUser: UserProp,
  onlineUsers: number[],
  receiver: ReceiverProp | null,
  voiceCall: boolean,
  videoCall: boolean,
  outGoingVoiceCall: callProp | null;
  outGoingVideoCall: callProp | null;
  incomingVoiceCall: callProp | null;
  incomingVideoCall: callProp | null;
  onGoingCall: boolean;
  remoteStream: {
    stream: MediaStream | null,
    peerConnection: RTCPeerConnection | null
  };
  offer: RTCSessionDescriptionInit | null;
  answer: RTCSessionDescriptionInit | null
  offerObj: offerObjProp |  null;
  peerIces: RTCIceCandidate[];
  iceCandidates: RTCIceCandidate[];
}
const user = await currentUser();

const initialState: ChatStateProp = {
  socket: io('http://localhost:3000', {
    query: {
      userId: user.id
    }
  }),
  onlineUsers: [],
  receiver: null,
  voiceCall: false,
  videoCall: false,
  outGoingVoiceCall: null,
  outGoingVideoCall: null,
  incomingVoiceCall: null,
  incomingVideoCall: null,
  onGoingCall: false,
  offer: null,
  answer: null,
  offerObj: null,
  peerIces: [],
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
    setOnlineUsers: (state, { payload }: PayloadAction<number[]>) => {
      state.onlineUsers = payload;
    },
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
      state.onGoingCall = false;
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
    setOutGoingVideoCall: (state, { payload }: PayloadAction<callProp | null>) => {
      state.outGoingVideoCall = payload;
    },
    setIncomingVoiceCall: (state, { payload }: PayloadAction<callProp |  null>) => {
      state.incomingVoiceCall = payload;
    },
    setIncomingVideoCall: (state, { payload }: PayloadAction<callProp |  null>) => {
      state.incomingVideoCall = payload;
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
    setOnGoingCall: (state, { payload }) => {
      state.onGoingCall = payload;
    },
    addPeerIce: (state, { payload }) => {
      state.peerIces.push(payload);
    },
  }
})

export const {setOnlineUsers, setReceiver, setVoiceCall, setVideoCall, turnOffCalls, setRemoteStream, setRemotePeerConnection, setOutGoingVoiceCall, setOutGoingVideoCall, setIncomingVoiceCall, setIncomingVideoCall, addIce, addOffer, addAnswer, setOfferObj, setOnGoingCall, addPeerIce } = chatSlice.actions;
export const selectChat = (state: RootState) => state.chat;
export default chatSlice.reducer;