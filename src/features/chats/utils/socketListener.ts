import { Socket } from "socket.io-client";
import { addAnswer, addPeerIce, offerObjProp, setIncomingVideoCall, setIncomingVoiceCall, setOfferObj, setOnGoingCall, setOnlineUsers, turnOffCalls } from "../redux/chatSlice";
import { AppDispatch } from "../../../redux/store";

const socketListener = (socket: Socket, dispatch: AppDispatch) => {
    
  socket.on('getOnlineUsers', (users: number[]) => {
    dispatch(setOnlineUsers(users))
  })
  socket.on('sendOutgoingCallToReceiver', (caller) => {
    if (caller.type === 'voice') {
      dispatch(setIncomingVoiceCall(caller))

    } else if (caller.type === 'video') {
      dispatch(setIncomingVideoCall(caller))
    }
  });
  socket.on('cancelOutgoingVoiceCallForReceiver', () => {
    console.log('Cancelling...');
    
    dispatch(turnOffCalls())  
  });
  socket.on('cancelOutgoingVideoCallForReceiver', () => {    
    dispatch(turnOffCalls())  
  });
  socket.on('sendOnGoingCall', () => {
    dispatch(setOnGoingCall(true));
  })
  socket.on('sendOffer', (offerObj: offerObjProp) => {
    dispatch(setOfferObj(offerObj))
  });
  socket.on('sendAnswer', async (answer) => {      
    dispatch(addAnswer(answer));
  });
  socket.on('updatedOfferWithIceCandiadates', async ({candidate}) => {   
    dispatch(addPeerIce(candidate))
  }); 
    // dispatch(setConversationMessages(updatedConvoMessages))
    // const chat = recentChats.map((chat) => {
    //   const chatCopy = { ...chat };
    //   if (chatCopy.user.receiverId === receiver?.id) {
    //     return { ...chatCopy, status: 'read' };
    //   }
    //   return chatCopy
    // });
    // console.log(chat);
    
    // dispatch(setRecentChats(chat))
    // queryClient.invalidateQueries({queryKey: ['recentChats']})
    // queryClient.invalidateQueries({ queryKey: ['messages', receiver?.id] })                 

    // dispatch(setHasUnreadMessagesState(false));
  // })
}

export default socketListener;