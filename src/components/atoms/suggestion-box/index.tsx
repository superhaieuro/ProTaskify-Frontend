import { FC } from "react";

type SuggestionBoxTypes = {
    icon: string;
    message: string;
    style: string;
}

const SuggestionBox: FC<SuggestionBoxTypes> = ({ icon, message, style }) => {
    return (
        <div className={`${style} gap-x-1.5 border px-3 py-1.5 flex-row flex items-center rounded-lg h-fit`}>
            <span className="material-symbols-rounded h-fit icon">{icon}</span>
            <div className="text-xs">{message}</div>
        </div>
    )
}

export default SuggestionBox;