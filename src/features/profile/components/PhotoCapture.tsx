import { HiOutlineX } from "react-icons/hi"

const PhotoCapture = () => {
  return (
    <div className="absolute z-[2000] min-h-screen top-0 left-0 w-full">
      <video src="" className="w-full h-[80vh] bg-black"></video>

      <div className="flex justify-center gap-10">
        <button>
          <HiOutlineX className="text-2xl text-gray-500" />
        </button>
        <button className=" w-[50px] h-[50px] rounded-full overflow-hidden hover:opacity-65 my-2">
          <div className="bg-white rounded-full w-full h-full border-[7px] border-slate-600 ">
          </div>
        </button>
      </div>
    </div>
  )
}

export default PhotoCapture