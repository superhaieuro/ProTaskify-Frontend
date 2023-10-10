import { FC } from "react";

type ChatReceiveProps = {
    message: string;
    date: Date;
}

const ChatReceive: FC<ChatReceiveProps> = ({ message, date }) => {
    return (
        <div className="w-full flex flex-col items-start gap-1.5">
            <div className="text-xs text-gray-600 w-fit">
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
            <div className="text-sm whitespace-pre-wrap max-w-md w-fit bg-gray-50 px-3 py-1.5 rounded-lg">{message}</div>
        </div>
    )
}

export default ChatReceive;