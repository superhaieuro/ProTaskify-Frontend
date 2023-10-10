import { useEffect, useState } from "react";
import MessageGroup from "../../atoms/message-group";
import api from "../../../config/axios";

type MessageListProps = {
    onClick: () => void;
}

const MessageList = () => {
    const [groupChatList, setGroupChatList] = useState<[]>([]);
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const lecturerId = JSON.parse(sessionStorage.getItem("userSession")!).userInfo.RollNumber;
                const response = await api.get(`/api/v1/common/message-list?lecturerId=${lecturerId}`);
                setGroupChatList(JSON.parse(JSON.stringify(response.data)));
            } catch (error) {
                console.log(error);
            }
        }
        fetchUserData();
    }, []);

    return (
        <div className="w-1/3 border border-gray-200 rounded-lg overflow-y-auto h-fit max-h-full">
            {
                groupChatList.map((groupChatItem) => (
                    <MessageGroup
                        title={`${groupChatItem[1]} - ${groupChatItem[5]}`}
                        message={groupChatItem[2]}
                        date={new Date(groupChatItem[3])}
                        status={groupChatItem[4]} />
                ))
            }
        </div>
    )
}

export default MessageList;