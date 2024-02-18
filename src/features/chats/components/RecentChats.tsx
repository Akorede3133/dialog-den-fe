import RecentChatCard from "./RecentChatCard"

const RecentChats = () => {
  return (
    <div className=" recent--chats overflow-auto max-h-[350px] py-5">
      <ul className="space-y-5 px-5">
        <RecentChatCard />
        <RecentChatCard />
        <RecentChatCard />
        <RecentChatCard />
        <RecentChatCard />
        <RecentChatCard />
        <RecentChatCard />
        <RecentChatCard />
        <RecentChatCard />
        <RecentChatCard />
        <RecentChatCard />
        <RecentChatCard />
        <RecentChatCard />
        <RecentChatCard />
      </ul>
    </div>
  )
}

export default RecentChats