import { FC } from "react";

type ApproveButtonProps = {
    icon: string;
    message: string;
}

const ApproveButton: FC<ApproveButtonProps> = ({ icon, message }) => {
    return (
        <div className="text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 gap-x-1.5 px-3 py-1.5 flex-col flex items-center rounded-lg h-fit w-fit">
            <div className="gap-x-1.5 flex items-center">
                {icon !== "" ? <span className="material-symbols-rounded h-fit icon">{icon}</span> : null}
                {message !== "" ? <div className="text-sm">{message}</div> : null}
            </div>
            {/* Min Width */}
            <div className="w-12 h-0"></div>
        </div>
    )
}

export default ApproveButton;
