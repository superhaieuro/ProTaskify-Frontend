import { FC } from "react";
import StatusBox from "../status-box";

type TaskBoardItemBoxProps = {
    picture: string;
    status: string;
    feature: string;
    description: string;
}

const TaskBoardItemBox: FC<TaskBoardItemBoxProps> = ({ picture, status, feature, description }) => {
    let color;

    if (status === "High") {
        color = "red";
    } else if (status === "Medium") {
        color = "yellow";
    } else {
        color = "green";
    }

    return (
        <div className="bg-white rounded p-2.5 flex flex-col gap-2.5 text-xs hover:shadow border border-gray-200">
            <div className="flex justify-between items-center">
                <img className="w-8 h-8 rounded-full" src={picture}></img>
                <StatusBox color={color} message={status} />
            </div>

            <div className="text-xs text-gray-600 uppercase">{feature}</div>

            <div className="w-full">{description}</div>
        </div>
    )
}

export default TaskBoardItemBox;