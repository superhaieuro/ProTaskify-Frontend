import MessageChat from "../../molecules/message-chat";
import MessageList from "../../molecules/message-list";

const LecturerMessage = () => {
    return (
        <div className="flex gap-5 overflow-y-auto">
            <MessageList />
            <MessageChat />
        </div>
    )
}

export default LecturerMessage;