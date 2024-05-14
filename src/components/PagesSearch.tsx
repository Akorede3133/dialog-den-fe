import { ChangeEvent } from "react";
import { HiOutlineMagnifyingGlass } from "react-icons/hi2"
type PageSearchProp = {
  placeholder: string;
  search: ((e: ChangeEvent<HTMLInputElement>) => void);
}
const PagesSearch = ( { placeholder, search }: PageSearchProp) => {
  return (
    <div className=" bg-bg-silver flex items-center gap-8 px-4 py-3 rounded-sm mb-5">
      <HiOutlineMagnifyingGlass className="text-[18px] text-text-gray" />
      <input type="text" className="bg-inherit text-sm outline-none focus:outline-none w-full" placeholder={placeholder} onChange={search} />
    </div>
  )
}

export default PagesSearch