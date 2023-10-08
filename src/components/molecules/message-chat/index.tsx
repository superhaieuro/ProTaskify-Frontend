import { useEffect, useState } from "react";
import ApproveButton from "../../atoms/approve-button";
import ChatReceive from "../../atoms/chat-receive-box";
import ChatSend from "../../atoms/chat-send-box";
import TextareaAutosize from 'react-textarea-autosize';
import api from "../../../config/axios";
import SockJS from "sockjs-client";
import Stomp from "stompjs";

const STUDENT_ID = "SE172220";

const MessageChat = () => {
    const [message, setMessage] = useState("");
    const [stomp, setStomp] = useState<any>(null);

    const connect = () => {
        const socket = new SockJS(`${import.meta.env.VITE_API_ENDPOINT}/api/v1/common/room`);
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
        if (message !== "") {
            try {
                const messages = {
                    content: message,
                    lecturerId: JSON.parse(sessionStorage.getItem("userSession")!).userInfo.RollNumber,
                    studentId: STUDENT_ID,
                    date: new Date(),
                    fromId: JSON.parse(sessionStorage.getItem("userSession")!).userInfo.RollNumber,
                    status: false
                }
                stomp.send("/topic/room", {}, messages);
                setMessage("");
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

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await api.get("/api/v1/common/message-detail?pageNo=1&pageSize=10&studentId=SE172220");
                // console.log(response);
            } catch (error) {
                console.log(error);
            }
        }
        fetchUserData();

        //Auto scroll into bottom
        document.getElementById("scroll-into-bottom")?.scrollIntoView({ behavior: "smooth", inline: "start" });
    }, [])

    return (
        <div className="border border-gray-200 rounded-lg h-full w-2/3 flex flex-col overflow-y-auto">
            <div className="p-5 border-b border-gray-200 bg-gray-50">
                <div className="text-lg font-bold">Rainbow Dragon</div>
                <div className="text-sm text-gray-600">NET1700</div>
            </div>

            <div className="flex flex-col h-full overflow-y-auto">
                <div className="h-full overflow-y-auto flex flex-col gap-5 py-10 px-5">
                    <ChatSend message="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
                        date={new Date(2023, 11, 19, 10, 30)} />
                    <ChatReceive message="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
                        date={new Date(2023, 11, 19, 10, 30)} />
                    <ChatSend message="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
                        date={new Date(2023, 11, 19, 10, 30)} />
                    <ChatSend message="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
                        date={new Date(2023, 11, 19, 10, 30)} />
                    <div id="scroll-into-bottom"></div>
                </div>

                <div className="flex gap-2 p-5 border-t border-gray-200 items-end">
                    <TextareaAutosize className="border border-gray-200 bg-gray-50 py-1.5 px-3 text-sm rounded-lg outline-none w-full h-fit resize-none"
                        minRows={1} maxRows={10} placeholder="Write something..."
                        value={message} onChange={(e) => { setMessage(e.target.value) }} onKeyDown={handleKeyDown} />
                    <button onClick={handleSendMessage}>
                        <ApproveButton icon="send" message="" />
                    </button>
                    <button onClick={connect}>Connect</button>
                </div>
            </div>
        </div>
    )
}

export default MessageChat;