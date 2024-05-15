import { LoaderIcon } from "react-hot-toast";

type ImageMessageProp = {
  content: string;
  isSender: boolean;
  status: string;
}

const ImageMessage = ({ content, isSender, status }: ImageMessageProp) => {
  return (
    <div className={`${isSender ? ' bg-bg-silver dark:bg-sidebar-dark'  : `bg-[#1C9DEA] dark:bg-message-bg-blue ml-[3.2rem] text-white`} p-3 flex flex-col items-center gap-2 w-[170px] h-[170px] `}>
      <img src={content} alt="" className=' object-cover rounde w-full h-full' />
      { status === 'sending' && <div className=" self-end">
        <LoaderIcon />
      </div>}
    </div>
  )
}

export default ImageMessage