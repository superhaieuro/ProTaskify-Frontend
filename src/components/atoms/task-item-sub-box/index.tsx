import { FC } from "react";

type TaskItemSubBoxProps = {
    picture: string;
    name: string;
    status: string;
}

const TaskItemSubBox: FC<TaskItemSubBoxProps> = ({ picture, name, status }) => {
    let color;
    if (status === "To do") {
        color = "gray";
    } else if (status === "In progress") {
        color = "blue";
    } else if (status === "Verifying") {
        color = "yellow";
    } else {
        color = "green";
    }
    return (
        <div className="bg-white border border-gray-200 rounded p-2.5 flex flex-col gap-2.5 shadow-sm">
            <div role="button" className="flex gap-2 items-center">
                <div>
                    <img className="w-8 h-8 rounded-full" src={picture}></img>
                </div>
                <div className="w-full text-sm">{name}</div>
            </div>

            <div className={`text-xxs w-full text-center h-fit px-1.5 rounded-full bg-${color}-50 text-${color}-600`}>{status}</div>
        </div>
    )
}

export default TaskItemSubBox;