import React from "react";

type FeatureBoardItemBoxProps = {
    totalTask: number;
    doneTask: number;
    title: string;
    startDate: Date;
    endDate: Date;
};

const FeatureBoardItemBox: React.FC<FeatureBoardItemBoxProps> = ({ totalTask, doneTask, title, startDate, endDate }) => {
    const processRate = (doneTask / totalTask) * 100;
    let color;

    if (processRate >= 0 && processRate < 30) {
        color = "red";
    } else if (processRate >= 30 && processRate < 60) {
        color = "yellow";
    } else {
        color = "green";
    }

    return (
        <div className="bg-white rounded p-2.5 flex flex-col gap-2.5 text-xs hover:shadow border border-gray-200">
            <div className={`w-full h-1.5 bg-${color}-50`}>
                <div className={`h-full bg-${color}-600`} style={{ width: `${processRate}%` }}></div>
            </div>

            <div className="text-gray-600">Done tasks: {doneTask}/{totalTask}</div>
            <div>{title}</div>

            <div className="text-gray-600 flex gap-1.5 items-center">
                <span className="material-symbols-rounded h-fit icon">calendar_today</span>
                <div>
                    {startDate.toLocaleDateString(undefined, {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit'
                    })}
                    {" - "}
                    {endDate.toLocaleDateString(undefined, {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit'
                    })}
                </div>
            </div>
        </div>
    );
};

export default FeatureBoardItemBox;
