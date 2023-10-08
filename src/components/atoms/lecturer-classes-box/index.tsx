import { FC } from "react";

type LecturerClassesBoxProps = {
    name: string;
    numOfStudent: number;
}

const LecturerClassesBox: FC<LecturerClassesBoxProps> = ({ name, numOfStudent }) => {
    return (
        <button className="flex flex-col gap-2 p-5 rounded-lg border border-gray-200 bg-gray-50 w-40 items-center
        hover:bg-blue-50 hover:border-blue-200">
            <div className="text-base">{name}</div>
            <div className="text-gray-600 flex">
                <span className="material-symbols-rounded h-fit icon">person</span>
                <div className="text-sm">{numOfStudent}</div>
            </div>
        </button>
    )
}

export default LecturerClassesBox;