import { useAppDispatch } from "../../../redux/hooks";
import { displayCoversation, setReceiver } from "../../chats/redux/chatSlice";

type CategoryProp = {
  category: string;
  users: UserProp[]
}
export type UserProp = {
  id: number;
  username: string;
  email: string;
  photo: string;
}


const ContactCard = ({ category, users }: CategoryProp) => {  
  const dispatch = useAppDispatch();
  const handleSelectChat = (user: UserProp) => {
    dispatch(setReceiver(user));
    dispatch(displayCoversation(true));
  }
  return ( 
    <li className="space-y-4">
      <h2 className="text-primary-blue font-medium">{category}</h2>
      <ul className="space-y-4">
        {users.map((user) => (
          <li className="w-full" key={user.id}>
            <button className="w-full text-left" onClick={() => handleSelectChat(user)}>{user.username}</button>
          </li>
        ))}
      </ul>
    </li>
  );
};

export default ContactCard;