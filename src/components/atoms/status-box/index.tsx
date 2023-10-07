import { FC } from "react";

type StatusBoxProps = {
    color: string;
    message: string;
}

const StatusBox: FC<StatusBoxProps> = ({ color, message }) => {
    return (
        <div className={`text-xxs w-fit h-fit px-1.5 rounded-full bg-${color}-50 text-${color}-600`}>{message}</div>
    )
}

export default StatusBox