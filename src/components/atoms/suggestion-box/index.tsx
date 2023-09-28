import { FC } from "react";

type SuggestionBoxTypes = {
    icon: string;
    message: string;
}

const SuggestionBox: FC<SuggestionBoxTypes> = ({ icon, message }) => {
    return (
        <div className="gap-x-1.5 border border-gray-200 bg-gray-50 px-3 py-1.5 text-gray-600 flex-row flex items-center rounded-lg">
            <span className="material-symbols-rounded h-fit icon">{icon}</span>
            <div className="text-xs">{message}</div>
        </div>
    )
}

export default SuggestionBox;