type ImageMessageProp = {
  content: string;
  isSender: boolean;
}

const ImageMessage = ({ content, isSender }: ImageMessageProp) => {
  return (
    <div className={`${isSender ? 'mr-[3.2rem] bg-bg-silver'  : `bg-[#1C9DEA] ml-[3.2rem] text-white`} p-3 flex items-center gap-2 w-[150px] `}>
      <img src={content} alt="" className=' object-cover rounde w-full h-full' />
    </div>
  )
}

export default ImageMessage