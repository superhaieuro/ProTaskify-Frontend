import { FC } from "react";
import StatusBox from "../status-box";

type TaskDetailBoxProps = {
    picture: string;
    status: string;
    feature: string;
    date: Date;
    description: string;
}

const TaskDetailBox: FC<TaskDetailBoxProps> = ({ picture, status, feature, date, description }) => {
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

            <div className="text-gray-600 flex gap-1.5 items-center">
                <span className="material-symbols-rounded h-fit icon">calendar_today</span>
                <div>
                    {date.toLocaleDateString(undefined, {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit'
                    })}
                </div>
            </div>
        </div>
    )
}

export default TaskDetailBox;