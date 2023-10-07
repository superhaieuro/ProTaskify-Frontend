import ApproveButton from "../../atoms/approve-button";
import ChatReceive from "../../atoms/chat-receive-box";
import ChatSend from "../../atoms/chat-send-box";
import TextareaAutosize from 'react-textarea-autosize';

const MessageChat = () => {
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
                </div>

                <div className="flex gap-2 p-5 border-t border-gray-200 items-end">
                    <TextareaAutosize className="border border-gray-200 bg-gray-50 py-1.5 px-3 text-sm rounded-lg outline-none w-full h-fit resize-none"
                        minRows={1} maxRows={10} placeholder="Write something..." />
                    <ApproveButton icon="send" message="" />
                </div>
            </div>
        </div>
    )
}

export default MessageChat;