import { FC } from "react";

type ChatSendProps = {
    message: string;
    date: Date;
}

const ChatSend: FC<ChatSendProps> = ({ message, date }) => {
    return (
        <div className="w-full flex justify-end">
            <div className="w-2/3 bg-blue-600 text-white p-5 rounded-lg flex flex-col gap-2 items-end">
                <div className="text-xs">
                    {date.toLocaleTimeString(undefined, {
                        hour: '2-digit',
                        minute: '2-digit'
                    })}
                    {" - "}
                    {date.toLocaleDateString(undefined, {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit'
                    })}
                </div>

                <div className="text-sm">{message}</div>
            </div>
        </div>
    )
}

export default ChatSend;