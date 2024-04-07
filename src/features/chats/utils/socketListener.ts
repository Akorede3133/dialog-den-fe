import { Socket } from "socket.io-client";
import { addAnswer, addPeerIce, offerObjProp, setIncomingVideoCall, setIncomingVoiceCall, setOfferObj, setOnGoingCall, setOnlineUsers, turnOffCalls } from "../redux/chatSlice";

const socketListener = (socket: Socket, dispatch) => {  
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
}

export default socketListener;