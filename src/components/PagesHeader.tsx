type HeaderProp = {
  text: string;
}

const PagesHeader = ({ text }: HeaderProp) => {
  return (
    <h3 className=" text-text-primary py-5 text-2xl font-medium">{text}</h3>
  )
}

export default PagesHeader