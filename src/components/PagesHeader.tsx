type HeaderProp = {
  text: string;
}

const PagesHeader = ({ text }: HeaderProp) => {
  return (
    <h3 className=" text-text-primary text-2xl font-medium py-5">{text}</h3>
  )
}

export default PagesHeader