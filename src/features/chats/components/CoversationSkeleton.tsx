const CoversationSkeleton = ({ index }: { index: number }) => {
  return (
    <div className={`${ index % 2 ? ' self-end' : 'self-start' } w-[50%]  bg-gray animate-pulse gap-2 flex items-center`}>
      <div className="w-[50px] h-[40px] rounded-full bg-gray-200 self-start">
      </div>
      <div className="flex flex-col gap-2 bg-re  w-full">
        <div className="h-[20px] w-full bg-gray-200"></div>
        <div className="h-[20px] w-full bg-gray-200"></div>
      </div>
    </div>
  )
}

export default CoversationSkeleton