import React from "react";

type FeatureBoardItemBoxProps = {
    totalTask: number;
    doneTask: number;
    title: string;
    startDate: Date;
    endDate: Date;
};

const FeatureBoardItemBox: React.FC<FeatureBoardItemBoxProps> = ({ totalTask, doneTask, title, startDate, endDate }) => {
    let progressRate;
    if (totalTask === 0) {
        progressRate = 100;
    } else {
        progressRate = (doneTask / totalTask) * 100;
    }

    let color;
    if (progressRate >= 0 && progressRate < 30) {
        color = "red";
    } else if (progressRate >= 30 && progressRate < 60) {
        color = "yellow";
    } else {
        color = "green";
    }

    return (
        <div className="bg-white rounded p-2.5 flex flex-col gap-2.5 text-xs shadow-sm border border-gray-200">
            <div className={`w-full h-1.5 bg-${color}-50`}>
                <div className={`h-full bg-${color}-600`} style={{ width: `${progressRate}%` }}></div>
            </div>

            <div className="flex justify-between">
                <div className="text-gray-600 flex gap-1.5 items-center">
                    {/* <span className="material-symbols-rounded h-fit icon">calendar_today</span> */}
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

                <div className="text-gray-600">Done tasks: {doneTask}/{totalTask}</div>
            </div>

            <div className="text-sm">{title}</div>
        </div>
    );
};

export default FeatureBoardItemBox;
