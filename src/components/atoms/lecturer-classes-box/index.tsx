import { FC } from "react";

type LecturerClassesBoxProps = {
    name: string;
    numOfStudent: number;
    numOfGroup: number;
}

const LecturerClassesBox: FC<LecturerClassesBoxProps> = ({ name, numOfStudent, numOfGroup }) => {
    return (
        <button className="flex flex-col gap-2 p-5 rounded-lg border border-gray-200 bg-gray-50 w-40 items-center
        hover:bg-gray-100">
            <div className="text-base">{name}</div>
            <div className="flex gap-2">
                <div className="text-gray-600 flex">
                    <span className="material-symbols-rounded h-fit icon">person</span>
                    <div className="text-sm">{numOfStudent}</div>
                </div>

                <div className="text-gray-600 flex">
                    <span className="material-symbols-rounded h-fit icon">group</span>
                    <div className="text-sm">{numOfGroup}</div>
                </div>
            </div>
        </button>
    )
}

export default LecturerClassesBox;