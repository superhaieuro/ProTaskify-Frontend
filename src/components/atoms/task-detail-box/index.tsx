import { FC } from "react";
import StatusBox from "../status-box";

type TaskDetailBoxProps = {
    picture: string;
    status: string;
    feature: string;
    date: Date | null;
    title: string;
}

const TaskDetailBox: FC<TaskDetailBoxProps> = ({ picture, status, feature, date, title: description }) => {
    let color;

    if (status === "High") {
        color = "red";
    } else if (status === "Medium") {
        color = "yellow";
    } else {
        color = "green";
    }

    return (
        <div className="bg-white rounded p-2.5 flex flex-col gap-2.5 text-xs hover:shadow-sm border border-gray-200">
            <div className="flex justify-between items-center">
                <img className="w-8 h-8 rounded-full" src={picture}></img>
                <StatusBox color={color} message={status} />
            </div>

            <div className="text-start">
                <div className="text-xs text-gray-600 uppercase">{feature}</div>
                <div className="w-full text-sm">{description}</div>
            </div>

            <div className="text-gray-600 flex gap-1.5 items-center">
                {/* <span className="material-symbols-rounded h-fit icon">calendar_today</span> */}
                {date != null ?
                    <div>
                        {new Date(date).toLocaleDateString(undefined, {
                            year: 'numeric',
                            month: '2-digit',
                            day: '2-digit'
                        })}
                    </div> : null
                }

            </div>
        </div>
    )
}

export default TaskDetailBox;