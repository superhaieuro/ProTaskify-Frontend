import { useEffect, useState } from "react";
import ApproveButton from "../../atoms/approve-button";
import ChatReceive from "../../atoms/chat-receive-box";
import ChatSend from "../../atoms/chat-send-box";
import TextareaAutosize from 'react-textarea-autosize';
import api from "../../../config/axios";
import SockJS from "sockjs-client";
import Stomp from "stompjs";

const STUDENT_ID = "SE172220";

type MessageChat = {
    content: string;
    date: Date;
    fromId: string;
    status: boolean;
}

const MessageChat = () => {
    const [inputMessage, setInputMessage] = useState(""); //Message input box
    const [stomp, setStomp] = useState<any>(null); //Connect with Socket
    const [pageSize, setPageSize] = useState(20);
    const [messageChatList, setMessageChatList] = useState<MessageChat[]>([]);

    const connect = () => {
        const socket = new SockJS(`${import.meta.env.VITE_API_ENDPOINT}/web-socket`);
        setStomp(Stomp.over(socket));
        if (stomp) {
            stomp.connect({}, () => {
                stomp.subscribe('/topic/room', (response: any) => {
                    console.log(response);
                });
            })
        }
    }

    if (stomp == null) {
        connect();
    }

    const handleSendMessage = () => {
        if (inputMessage.trim() !== "") {
            try {
                const messages = {
                    content: inputMessage,
                    lecturerId: JSON.parse(sessionStorage.getItem("userSession")!).userInfo.RollNumber,
                    studentId: STUDENT_ID,
                    date: new Date().toISOString(),
                    fromId: JSON.parse(sessionStorage.getItem("userSession")!).userInfo.RollNumber,
                }
                stomp.send("/app/room", {}, JSON.stringify(messages));
                setInputMessage("");
                setPageSize(pageSize + 1);
                getNewMessage();
            } catch (error) {
                console.log(error);
            }
        }
    }

    const handleKeyDown = (e: any) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    const getNewMessage = () => {
        const fetchUserData = async () => {
            try {
                const lecturerId = JSON.parse(sessionStorage.getItem("userSession")!).userInfo.RollNumber;
                const studentId = STUDENT_ID;
                const response = await api.get(`/api/v1/common/message-detail?pageNo=0&pageSize=${pageSize}&studentId=${studentId}&lecturerId=${lecturerId}`);
                setMessageChatList(JSON.parse(JSON.stringify(response.data)).reverse());
                if (response.data.length < 10) {
                    setPageSize(response.data.length + 1);
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchUserData();
    }

    useEffect(() => {
        getNewMessage();

        //Auto scroll into bottom
        document.getElementById("scroll-into-bottom")?.scrollIntoView({ behavior: "smooth", inline: "start" });
    }, [messageChatList.length, pageSize]);

    return (
        <div className="border border-gray-200 rounded-lg h-full w-2/3 flex flex-col overflow-y-auto">
            <div className="p-5 border-b border-gray-200 bg-gray-50">
                <div className="text-lg font-bold">Rainbow Dragon</div>
                <div className="text-sm text-gray-600">NET1700</div>
            </div>

            <div className="flex flex-col h-full overflow-y-auto">
                <div className="h-full overflow-y-auto flex flex-col gap-5 py-10 px-5">
                    {messageChatList.map((chatItem) => (
                        chatItem.fromId === JSON.parse(sessionStorage.getItem("userSession")!).userInfo.RollNumber ?
                            <ChatSend message={chatItem.content} date={new Date(chatItem.date)} /> :
                            <ChatReceive message={chatItem.content} date={new Date(chatItem.date)} />
                    ))}
                    <div id="scroll-into-bottom"></div>
                </div>

                <div className="flex gap-2 p-5 border-t border-gray-200 items-end">
                    <TextareaAutosize className="border border-gray-200 bg-gray-50 py-1.5 px-3 text-sm rounded-lg outline-none w-full h-fit resize-none"
                        minRows={1} maxRows={10} placeholder="Write something..."
                        value={inputMessage} onChange={(e) => { setInputMessage(e.target.value) }} onKeyDown={handleKeyDown} />
                    <button onClick={handleSendMessage}>
                        <ApproveButton icon="send" message="" />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default MessageChat;