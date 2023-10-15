import { FC } from "react";

type DashedButtonProps = {
    icon: string;
    message: string;
}

const DashedButton: FC<DashedButtonProps> = ({ icon, message }) => {
    return (
        <div className="text-gray-400 border border-gray-200 hover:bg-gray-100 border-dashed gap-x-1.5 px-3 py-1.5 flex-col flex items-center rounded h-fit w-full">
            <div className="gap-x-1.5 flex items-center">
                {icon !== "" ? <span className="material-symbols-rounded h-fit icon">{icon}</span> : null}
                {message !== "" ? <div className="text-sm">{message}</div> : null}
            </div>
        </div>
    )
}

export default DashedButton;
