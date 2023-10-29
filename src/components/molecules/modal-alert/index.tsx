import { FC, ReactNode } from "react";
import NormalButton from "../../atoms/normal-button";

type ModalAlertProps = {
    isVisible: boolean;
    onClose: () => void;
    type: string;
    title: string;
    description: string;
    button: ReactNode;
}

const ModalAlert: FC<ModalAlertProps> = ({ isVisible, onClose, type, title, description, button }) => {
    let color;
    if (type === "warning") {
        color = "yellow";
    }

    if (!isVisible) {
        return null;
    } else {
        return (
            <div className="absolute left-0 top-0 bg-black bg-opacity-50 h-full w-full
            flex justify-center items-center">
                <div className="bg-white w-96 p-5 border border-gray-200 rounded-lg flex flex-col gap-y-5 shadow-sm">
                    <div className="flex gap-5">
                        <div className={`bg-${color}-50 text-${color}-600 h-8 w-8 p-1.5 rounded-full`}>
                            <span className="material-symbols-rounded h-fit icon">{type}</span>
                        </div>

                        <div className="flex flex-col gap-2 text-sm">
                            <div className="font-bold">{title}</div>
                            <div className="text-gray-600">{description}</div>
                        </div>
                    </div>

                    <div className="flex gap-2 justify-end">
                        <button onClick={() => {
                            onClose();
                        }}>
                            <NormalButton icon="" message="Cancel" />
                        </button>
                        {button}
                    </div>
                </div>
            </div>
        )
    }
}

export default ModalAlert;