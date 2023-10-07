import { FC } from "react";

type ChatReceiveProps = {
    message: string;
    date: Date;
}

const ChatReceive: FC<ChatReceiveProps> = ({ message, date }) => {
    return (
        <div className="w-full flex justify-start">
            <div className="w-2/3 bg-gray-50 p-5 rounded-lg flex flex-col gap-2 items-start">
                <div className="text-xs text-gray-600">
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

export default ChatReceive;