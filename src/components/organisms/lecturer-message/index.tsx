import { useState } from "react";
import MessageChat from "../../molecules/message-chat";
import MessageList from "../../molecules/message-list";

const LecturerMessage = () => {
    const [viewMessage, setViewMessage] = useState<string | null>(null);

    return (
        <div className="flex gap-5 h-full overflow-y-auto">
            <MessageList />
            {/* {
                viewMessage == null ?
                null : <MessageChat />
            } */}
            <MessageChat />
        </div>
    )
}

export default LecturerMessage;