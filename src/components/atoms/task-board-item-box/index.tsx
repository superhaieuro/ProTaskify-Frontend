import { FC } from "react";
import StatusBox from "../status-box";

type TaskBoardItemBoxProps = {
    picture: string;
    priority: string;
    feature: string | undefined;
    name: string;
}

const TaskBoardItemBox: FC<TaskBoardItemBoxProps> = ({ picture, priority, feature, name }) => {
    let priorityColor;

    if (priority === "High") {
        priorityColor = "red";
    } else if (priority === "Medium") {
        priorityColor = "yellow";
    } else {
        priorityColor = "green";
    }

    return (
        <div className="bg-white rounded p-2.5 flex gap-2 text-xs hover:shadow-sm border border-gray-200 items-center">
            <div>
                <img className="w-8 h-8 rounded-full" src={picture}></img>
            </div>

            <div className="w-full truncate">
                <div className="text-xs text-gray-600 uppercase">{feature}</div>
                <div className="text-sm">{name}</div>
            </div>

            <StatusBox color={priorityColor} message={priority} />
        </div>
    )
}

export default TaskBoardItemBox;