import { HiOutlineXMark } from "react-icons/hi2"
import { useAppDispatch, useAppSelector } from "../../../redux/hooks"
import { selectChat, setShowOtherUserProfile } from "../../chats/redux/chatSlice"

const OtherUserProfileHeader = () => {
  const { receiver } = useAppSelector(selectChat)
  const dispatch = useAppDispatch();
  return (
    <div className="px-5">
      <section className="flex justify-end pt-10">
        <button onClick={() => dispatch(setShowOtherUserProfile(false))}>
          <HiOutlineXMark className="text-xl" />
      </button>
      </section>
      <section className="overflow-hidden flex justify-center flex-col items-center gap-3">
        <div className="relative">
          <img src={receiver?.photo} alt="" className="w-[100px] h-[100px] rounded-full object-cover" />
        </div>
        <div className="flex flex-col justify-center items-center">
          <p className=" text-text-primary font-medium">{receiver?.username}</p>
          <p className=" text-text-gray">Active</p>
        </div>
      </section>
      <section className=" border-t  my-5 py-3">
        <p className="text-text-gray">If several languages coalesce, the grammar of the resulting language is more simple and regular than that of the individual.</p>
      </section>
    </div>
  )
}

export default OtherUserProfileHeader