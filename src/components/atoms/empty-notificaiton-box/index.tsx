import { FC } from "react";

type EmptyNotificationBoxProps = {
    icon: string;
    message: string;
    subMessage: string;
}

const EmptyNotificationBox: FC<EmptyNotificationBoxProps> = ({ icon, message, subMessage }) => {
    return (
        <div className="text-center w-fit h-fit">
            {icon !== "" ? <span className="material-symbols-rounded text-8xl text-gray-400">{icon}</span> : null}
            {message !== "" ? <div className="text-3xl font-bold">{message}</div> : null}
            {subMessage !== "" ? <div className="text-base text-gray-600">{subMessage}</div> : null}
        </div>
    )
}

export default EmptyNotificationBox;