import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit'
import { RootState } from "../../../redux/store";
import { Socket, io } from "socket.io-client";
import { MessageProp } from "../components/MessageCard";
import { ChatProp } from "../components/RecentChatCard";


export type ReceiverProp = {
  id: number;
  username: string;
  email: string;
  photo: string;
}
export type callProp = {
  username: string;
  id: number;
  email: string;
  photo: string;
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

export type ChatStateProp = {
  socket: Socket;
  onlineUsers: number[];
  isAuthenticated: boolean;
  showOtherUserProfile: boolean;
  conversationMessages: MessageProp[];
  showConversation: boolean;
  receiver: ReceiverProp | null;
  voiceCall: boolean;
  videoCall: boolean;
  outGoingVoiceCall: callProp | null;
  outGoingVideoCall: callProp | null;
  incomingVoiceCall: callProp | null;
  incomingVideoCall: callProp | null;
  onGoingCall: boolean;
  localStream: MediaStream | null;
  remoteStream: {
    stream: MediaStream | null,
    peerConnection: RTCPeerConnection | null
  };
  offer: RTCSessionDescriptionInit | null;
  answer: RTCSessionDescriptionInit | null
  offerObj: offerObjProp |  null;
  peerIces: RTCIceCandidate[];
  iceCandidates: RTCIceCandidate[];
  searchMatches: MessageProp[];
  messageSearchMode: boolean;
  messageSearchText: string;
  currentSearchedMessageIndex: number;
  recentChats: ChatProp[];
  searchedRecentChats: ChatProp[]
  searchedRecentChatsText: string;
  searchedContacts: null | {};
  searchedContactsText: string;
  darkMode: boolean;


}

const initialState: ChatStateProp = {
  socket: io(import.meta.env.VITE_SOCKET_URL),
  onlineUsers: [],
  isAuthenticated: false,
  showOtherUserProfile: false,
  conversationMessages: [],
  showConversation: false,
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
  localStream: null,
  remoteStream: {
    stream: null,
    peerConnection: null
  },
  searchMatches: [],
  messageSearchMode: false,
  messageSearchText: '',
  currentSearchedMessageIndex: 0,
  recentChats: [],
  searchedRecentChats: [],
  searchedRecentChatsText: '',
  searchedContacts: null,
  searchedContactsText: '',
  darkMode: localStorage.getItem('darkMode') ? true : false

}

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    displayCoversation: (state, { payload }: PayloadAction<boolean>) => {
      state.showConversation = payload
    },
    setOnlineUsers: (state, { payload }: PayloadAction<number[]>) => {
      state.onlineUsers = payload;
    },
    setConversationMessages: (state, { payload }: PayloadAction<MessageProp[]>) => {
      state.conversationMessages = payload;
    },
    setReceiver: (state, { payload }: PayloadAction<ReceiverProp | null>) => {
      state.receiver = payload;
    },
    setVoiceCall: (state, { payload }: PayloadAction<boolean>) => {
      state.voiceCall = payload;
    },
    setVideoCall: (state, { payload }: PayloadAction<boolean>) => {
      state.videoCall = payload;
    },
    turnOffCalls: (state) => {      
      state.voiceCall = false;
      state.videoCall = false;
      state.incomingVoiceCall = null;
      state.outGoingVoiceCall = null;
      state.incomingVideoCall = null;
      state.outGoingVideoCall = null;
      state.remoteStream.stream = null;
      state.onGoingCall = false;
      state.answer = null;
      state.offer = null;
      state.peerIces = [];
      state.localStream?.getTracks().forEach(track => {
        track.stop();
      });
      if (state.localStream?.getTracks().length === 0) {
        state.localStream = null;
      }
      if (state.remoteStream.peerConnection) {
        state.remoteStream.peerConnection.close();
        state.remoteStream.peerConnection.onicecandidate = null;
        state.remoteStream.peerConnection.ontrack = null;
        state.remoteStream.peerConnection = null;
      }
    },
    setLocalStream: (state, { payload }: PayloadAction<MediaStream>) => {
      state.localStream = payload;
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
    setShowOtherUserProfile: (state, { payload }) => {
      state.showOtherUserProfile = payload;
    },
    setAuthenticated: (state, { payload}: PayloadAction<boolean>) => {
      state.isAuthenticated = payload;
    },
    setSearchMatches: (state, { payload }: PayloadAction<MessageProp[]>) => {
      state.searchMatches = payload;
    },
    setMessageSearchMode: (state, { payload }: PayloadAction<boolean>) => {
      state.messageSearchMode = payload;
    },
    setMessageSearchText: (state, { payload }: PayloadAction<string>) => {
      state.messageSearchText = payload;
    },
    setCurrentSearchedMessageIndex: (state, { payload }: PayloadAction<number>) => {
      state.currentSearchedMessageIndex = payload;
    },
    setRecentChats: (state, { payload }) => {
      state.recentChats = payload;
    },
    setSearchedRecentChats: (state, { payload }) => {
      state.searchedRecentChats = payload;
    },
    setSearchedRecentChatsText: (state, { payload }) => {
      state.searchedRecentChatsText = payload;
    },
    setSearchedContacts: (state, { payload }) => {
      state.searchedContacts = payload;
    },
    setSearchedContactsText: (state, { payload }) => {
      state.searchedContactsText = payload;
    },
    setDarkMode: (state) => {
      state.darkMode = !state.darkMode;
    },
  }
})

export const {displayCoversation, setConversationMessages, setOnlineUsers, setReceiver, setVoiceCall, setVideoCall, turnOffCalls, setLocalStream, setRemoteStream, setRemotePeerConnection, setOutGoingVoiceCall, setOutGoingVideoCall, setIncomingVoiceCall, setIncomingVideoCall, addIce, addOffer, addAnswer, setOfferObj, setOnGoingCall, addPeerIce, setShowOtherUserProfile, setAuthenticated, setSearchMatches, setMessageSearchMode, setMessageSearchText, setCurrentSearchedMessageIndex, setRecentChats, setSearchedRecentChats, setSearchedRecentChatsText, setSearchedContacts, setSearchedContactsText, setDarkMode  } = chatSlice.actions;
export const selectChat = (state: RootState) => state.chat;
export default chatSlice.reducer;