import { FC } from "react";
import XButton from "../../atoms/x-button";
import StatusBox from "../../atoms/status-box";

type ModalTaskInformationProps = {
    isVisible: boolean;
    onClose: () => void;
    task: Tasks | undefined;
    feature: Feature | undefined;
};

type Tasks = {
    id: string,
    name: string,
    status: string,
    feedback: string,
    priority: string,
    description: string,
    createDate: Date,
    finishDate: Date,
    taskIndex: number,
    feature: Feature,
    student: Student
}

type Feature = {
    id: string;
    name: string;
    startDate: Date;
    endDate: Date;
}

type Student = {
    RollNumber: string;
    FullName: string;
}

const ModalTaskInformation: FC<ModalTaskInformationProps> = ({ isVisible, onClose, task, feature }) => {
    let color;

    if (task?.priority) {
        if (task?.priority === "High") {
            color = "red";
        } else if (task!.priority === "Medium") {
            color = "yellow";
        } else {
            color = "green";
        }
    }

    if (!isVisible) {
        return null;
    } else {
        return (
            <div className="absolute left-0 top-0 bg-black bg-opacity-50 h-full w-full
            flex justify-center items-center shadow-sm">
                <div className="bg-white w-96 p-5 border border-gray-200 rounded-lg flex flex-col gap-y-5">
                    <div className="flex items-center justify-between">
                        <div className="text-2xl font-bold">Task information</div>
                        <button onClick={() => {
                            onClose();
                        }}>
                            <XButton />
                        </button>
                    </div>

                    <StatusBox color={color!} message={task!.priority} />

                    {feature ?
                        <>
                            <div>
                                <div className="text-sm font-semibold">Feature</div>
                                <div className="text-sm text-gray-600">{feature?.name}</div>
                            </div>

                            <div>
                                <div className="text-sm font-semibold">Due date</div>
                                <div className="text-sm text-gray-600">
                                    {new Date(feature!.startDate).toLocaleDateString(undefined, {
                                        year: 'numeric',
                                        month: '2-digit',
                                        day: '2-digit'
                                    })}
                                    {" - "}
                                    {new Date(feature!.endDate).toLocaleDateString(undefined, {
                                        year: 'numeric',
                                        month: '2-digit',
                                        day: '2-digit'
                                    })}
                                </div>
                            </div>
                        </> : null}

                    <div>
                        <div className="text-sm font-semibold">Assign to</div>
                        <div className="text-sm text-gray-600">{task?.student.FullName}</div>
                    </div>

                    <div>
                        <div className="text-sm font-semibold">Description</div>
                        <div className="text-sm text-gray-600 whitespace-pre-wrap">{task?.description}</div>
                    </div>

                    {task?.feedback == null ? null :
                        <div>
                            <div className="text-sm font-semibold">Feedback from leader</div>
                            <div className="text-sm text-gray-600 whitespace-pre-wrap">{task?.feedback}</div>
                        </div>
                    }
                </div>
            </div>
        )
    }
}

export default ModalTaskInformation;