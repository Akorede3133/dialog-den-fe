import { useAppDispatch } from "../../../redux/hooks";
import { setReceiver } from "../../chats/redux/chatSlice";

type CategoryProp = {
  category: string;
  users: UserProp[]
}
export type UserProp = {
  id: number;
  username: string;
  email: string
}
const ContactCard = ({ category, users }: CategoryProp) => {  
  const dispatch = useAppDispatch();
  return ( 
    <li className="space-y-4">
      <h2 className="text-primary-blue font-medium">{category}</h2>
      <ul className="space-y-4">
        {users.map((user) => (
          <li key={user.id}>
            <button onClick={() => dispatch(setReceiver(user))}>{user.username}</button>
          </li>
        ))}
      </ul>
    </li>
  );
};

export default ContactCard;