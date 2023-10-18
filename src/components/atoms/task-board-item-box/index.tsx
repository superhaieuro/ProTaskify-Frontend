import { FC } from "react";
import StatusBox from "../status-box";

type TaskBoardItemBoxProps = {
    picture: string;
    priority: string;
    feature: string | undefined;
    name: string;
}

const TaskBoardItemBox: FC<TaskBoardItemBoxProps> = ({ picture, priority, feature, name }) => {
    let color;

    if (priority === "High") {
        color = "red";
    } else if (priority === "Medium") {
        color = "yellow";
    } else {
        color = "green";
    }

    return (
        <div className="bg-white rounded p-2.5 flex flex-col gap-2.5 text-xs hover:shadow border border-gray-200">
            <div className="flex justify-between items-center">
                <img className="w-8 h-8 rounded-full" src={picture}></img>
                <StatusBox color={color} message={priority} />
            </div>

            <div>
                <div className="text-xxs font-bold text-gray-600 uppercase">{feature}</div>
                <div className="w-full text-sm">{name}</div>
            </div>
        </div>
    )
}

export default TaskBoardItemBox;