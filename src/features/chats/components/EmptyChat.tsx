import emptyConvoImg from '../../../assets/empty_convo.png';

const EmptyChat = () => {
  return (
    <div className="hidden sm:bloc h-full sm:flex items-center justify-center">
      <div>
        <img src={emptyConvoImg} alt="empty conversation" />
      </div>
    </div>
  )
}

export default EmptyChat