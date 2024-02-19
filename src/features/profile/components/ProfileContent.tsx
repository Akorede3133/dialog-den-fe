import { HiOutlineChevronDown, HiOutlineChevronUp, HiOutlineUser } from "react-icons/hi2"

const ProfileContent = () => {
  return (
    <div  className="px-5 mb-5 overflow-auto profile">
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
        </ul>
      </section>
    </div>
  )
}

export default ProfileContent