import { FC } from "react";

type NotificationBoxTypes = {
    icon: string;
    message: string;
    style: string;
}

const NotificationBox: FC<NotificationBoxTypes> = ({ icon, message, style }) => {
    return (
        <div className={`${style} gap-x-1.5 border px-3 py-1.5 flex-row flex items-center rounded-lg h-fit`}>
            {icon !== "" ? <span className="material-symbols-rounded h-fit icon">{icon}</span> : null}
            {message !== "" ? <div className="text-xs">{message}</div> : null}
        </div>
    )
}

export default NotificationBox;