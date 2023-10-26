import { FC } from "react";
import StatusBox from "../status-box";

type TaskBoardItemBoxProps = {
    picture: string;
    priority: string;
    feature: string | undefined;
    name: string;
    status: string;
}

const TaskBoardItemBox: FC<TaskBoardItemBoxProps> = ({ picture, priority, feature, name, status }) => {
    let priorityColor;
    let statusColor;

    if (priority === "High") {
        priorityColor = "red";
    } else if (priority === "Medium") {
        priorityColor = "yellow";
    } else {
        priorityColor = "green";
    }

    if (status === "To do") {
        statusColor = "gray";
    } else if (status === "In progress") {
        statusColor = "blue";
    } else if (status === "Verifying") {
        statusColor = "yellow";
    } else {
        statusColor = "green";
    }

    return (
        <div className="bg-white hover:shadow-sm border border-gray-200 rounded overflow-auto flex">
            <div className="p-2.5 flex gap-2 text-xs items-center justify-between w-full">
                <div>
                    <img className="w-8 h-8 rounded-full" src={picture}></img>
                </div>

                <div className="w-full truncate">
                    <div className="text-xs text-gray-600 uppercase">{feature}</div>
                    <div className="flex items-center gap-1.5">
                        {/* <div className={`text-xxs bg-${statusColor}-600 text-white px-1.5 w-fit rounded-full`}>• {status}</div> */}
                            <div className={`text-xxs border border-${statusColor}-600 text-${statusColor}-600 px-1.5 w-fit rounded-full`}>• {status}</div>
                        <div className="text-sm">{name}</div>
                    </div>
                </div>

                <StatusBox color={priorityColor} message={priority} />
            </div>
        </div>
    )
}

export default TaskBoardItemBox;