import { FC } from "react";
import XButton from "../../atoms/x-button";
import StatusBox from "../../atoms/status-box";

type ModalSprintHistoryProps = {
    isVisible: boolean;
    onClose: () => void;
    sprintList: Sprint[] | undefined;
};

type Sprint = {
    name: string;
    note: string;
    feedback: string;
    startDate: Date;
    endDate: Date;
}

const ModalSprintHistory: FC<ModalSprintHistoryProps> = ({ isVisible, onClose, sprintList }) => {
    if (!isVisible) {
        return null;
    } else {
        return (
            <div className="absolute left-0 top-0 bg-black bg-opacity-50 h-full w-full
            flex justify-center items-center shadow-sm">
                <div className="bg-white w-96 p-5 border border-gray-200 rounded-lg flex flex-col gap-y-5">
                    <div className="flex items-center justify-between">
                        <div className="text-2xl font-bold">Feedback history</div>
                        <button onClick={() => {
                            onClose();
                        }}>
                            <XButton />
                        </button>
                    </div>

                    <div className="flex flex-col gap-5 max-h-96 overflow-auto">
                        {sprintList!.map((sprintItem) => (
                            <div className="text-sm">
                                <div className="flex gap-1.5 items-center">
                                <div className="text-sm font-bold">{sprintItem.name}</div>
                                {
                                    new Date(sprintItem.endDate) > new Date() ?
                                        <StatusBox color="green" message="On-going" /> :
                                        <StatusBox color="gray" message="Finished" />
                                }
                            </div>
                                <div className="text-gray-600">{sprintItem.feedback}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        )
    }
}

export default ModalSprintHistory;