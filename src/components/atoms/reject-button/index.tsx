import { FC } from "react";

type RejectButtonProps = {
    icon: string;
    message: string;
}

const RejectButton: FC<RejectButtonProps> = ({ icon, message }) => {
    return (
        <div className="bg-red-50 text-red-600 border-red-200 hover:border-red-600 active:bg-red-200 gap-x-1.5 border px-3 py-1.5 flex-col flex items-center rounded-lg h-fit w-fit">
            <div className="gap-x-1.5 flex items-center">
                {icon !== "" ? <span className="material-symbols-rounded h-fit icon">{icon}</span> : null}
                {message !== "" ? <div className="text-sm">{message}</div> : null}
            </div>
            {/* Min Width */}
            <div className="w-12 h-0"></div>
        </div>
    )
}

export default RejectButton;