import { HiOutlineChevronDown, HiOutlineChevronUp, HiOutlineEllipsisVertical, HiOutlineUser } from "react-icons/hi2"
import PagesHeader from "../../../components/PagesHeader"
import logo from '../../../assets/logo.png';

const ProfileHeader = () => {
  return (
    <div className="px-5 my-10">
      <section className="flex justify-between">
        <PagesHeader text="My Profile" />
        <button>
          <HiOutlineEllipsisVertical className="text-xl" />
      </button>
      </section>
      <section className="overflow-hidden flex justify-center flex-col items-center gap-3">
        <img src={logo} alt="" className="w-[100px] h-[100px] rounded-full " />
        <div className="flex flex-col justify-center items-center">
          <p className=" text-text-primary font-medium">Patricia Smith</p>
          <p className=" text-text-gray">Active</p>
        </div>
      </section>
      <section className=" border-t  my-5 py-3">
        <p className="text-text-gray">If several languages coalesce, the grammar of the resulting language is more simple and regular than that of the individual.</p>
      </section>
      <section className="bg-white py-2 px-4 shadow-md">
        <div className=" flex justify-between items-center">
          <div className="flex items-center gap-2">
            <HiOutlineUser />
            <span className="text-sm">About</span>
          </div>
          <button>
            {false && <HiOutlineChevronUp />}
            <HiOutlineChevronDown />

          </button>
        </div>
        <ul className="space-y-4 my-3">
          <li>
            <p>Name</p>
            <p>Patricia Smith</p>
          </li>
          <li>
            <p>Name</p>
            <p>Patricia Smith</p>
          </li>
          <li>
            <p>Name</p>
            <p>Patricia Smith</p>
          </li>
          <li>
            <p>Name</p>
            <p>Patricia Smith</p>
          </li>
          <li>
            <p>Name</p>
            <p>Patricia Smith</p>
          </li>
        </ul>
      </section>
    </div>
  )
}

export default ProfileHeader