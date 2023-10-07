import { FC } from "react";

type MessageGroupProps = {
    title: string;
    message: string;
    date: Date
    status: boolean;
}

const MessageGroup: FC<MessageGroupProps> = ({ title, message, date, status }) => {
    if (status) {
        return (
            <div className="p-5 flex gap-5 w-full items-center">
                <div className="truncate w-full">
                    <div className="text-base">{title}</div>
                    <div className="text-xs text-gray-600">{message}</div>
                </div>
                <div className="text-xs text-gray-600">{date.toLocaleDateString(undefined, { year: 'numeric', month: '2-digit', day: '2-digit' })}</div>
                <span className="material-symbols-rounded h-fit icon">task_alt</span>
            </div>
        )
    } else {
        return (
            <div className="p-5 flex gap-5 bg-blue-50 w-full items-center">
                <div className="truncate w-full">
                    <div className="text-base text-blue-600">{title}</div>
                    <div className="text-xs text-gray-600">{message}</div>
                </div>
                <div className="text-xs text-gray-600">{date.toLocaleDateString(undefined, { year: 'numeric', month: '2-digit', day: '2-digit' })}</div>
                <span className="material-symbols-rounded h-fit icon text-blue-600">circle</span>
            </div>
        )
    } 
}

export default MessageGroup;