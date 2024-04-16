import PagesHeader from "../../../components/PagesHeader"
import { HiCamera, HiOutlineEllipsisVertical } from "react-icons/hi2";
import { useRef, useState } from "react";
import useCurrentUser from "../../auth/hooks/useCurrentUser";
import useUpdateProfile from "../hooks/useUpdateProfile";
import PhotoCapture from "./PhotoCapture";
import ContextMenu from "../../../context/ContextMenu";

const ProfileHeader = () => {
  const photoRef = useRef<HTMLInputElement>(null)
  const { user } = useCurrentUser();
  const { updateUserProfile } = useUpdateProfile();
  const [takePhoto, setTakePhoto] = useState(false);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target?.files?.[0];
    const data: { photo: File, username: string } = {
      photo: file as File,
      username: user?.username as string,
    }

    updateUserProfile({ userId: user?.id as number, data })
  }
  return (
    <div className="px-5">
      <section className="flex justify-between">
        <PagesHeader text="My Profile" />
        {takePhoto && <PhotoCapture hideCapture={() => setTakePhoto(false)} /> }
        <button>
          <HiOutlineEllipsisVertical className="text-xl" />
      </button>
      </section>
      <section className="overflow-hidden flex justify-center flex-col items-center gap-3">
        <div className="relative">
          <img src={user?.photo} alt="" className="w-[100px] h-[100px] rounded-full object-cover" />
          <ContextMenu>
            <>
            <ContextMenu.Open type="profile">
              <button className=" bg-message-bg-blue absolute right-[10%] top-[75%] rounded-md p-[1px]">
                <HiCamera className=" text-text-primary text-xl" />
              </button>
            </ContextMenu.Open>
            <ContextMenu.Window type="profile">
              <ul className=" absolute top-[20%] right-[-90%] bg-white  shadow-lg w-[120px] rounded-md text-text-primary text-sm">
                <li className=" hover:bg-bg-silver">
                  <button className="w-full p-3 text-left" onClick={() => setTakePhoto(true)}>Camera</button>
                </li>
                <li className=" hover:bg-bg-silver">
                  <button onClick={() => photoRef.current?.click()} className="w-full text-left p-3">Gallery</button>
                </li>
              </ul>
            </ContextMenu.Window>
            </>
          </ContextMenu>
         
          <input onChange={handlePhotoUpload} ref={photoRef} type="file" hidden/>
        </div>
        <div className="flex flex-col justify-center items-center">
          <p className=" text-text-primary font-medium">{user?.username}</p>
          <p className=" text-text-gray">Active</p>
        </div>
      </section>
      <section className=" border-t  my-5 py-3">
        <p className="text-text-gray">If several languages coalesce, the grammar of the resulting language is more simple and regular than that of the individual.</p>
      </section>
    </div>
  )
}

export default ProfileHeader