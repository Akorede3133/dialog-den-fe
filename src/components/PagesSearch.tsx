import { HiOutlineMagnifyingGlass } from "react-icons/hi2"
type PageSearchProp = {
  placeholder: string;
}
const PagesSearch = ( { placeholder }: PageSearchProp) => {
  return (
    <div className=" bg-bg-silver flex items-center gap-8 px-4 py-3 rounded-sm mb-5">
      <HiOutlineMagnifyingGlass className="text-[18px] text-text-gray" />
      <input type="text" className="bg-inherit text-sm outline-none focus:outline-none w-full" placeholder={placeholder} />
    </div>
  )
}

export default PagesSearch