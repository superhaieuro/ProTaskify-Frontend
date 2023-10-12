import { FC } from "react";

type InputDateProps = {
    title: string;
    value: Date;
    readonly: boolean;
    onChange: (date: Date) => void;
}

const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
};

const InputDate: FC<InputDateProps> = ({ title, value, readonly, onChange }) => {
    if (value == null) {
        value = new Date();
    }

    const date = formatDate(value);

    return (
        <div className="flex flex-col gap-y-2">
            <div className="text-sm">{title}</div>

            <div className="relative">
                <input id="inputDate" className={`border border-gray-200 bg-gray-50 py-1.5 px-3 text-sm rounded-lg outline-none w-full
            ${readonly ? null : "ring-blue-600 focus:ring-1 focus:border-blue-600"} `}
                    type="date" value={date} readOnly={readonly} onChange={(e) => onChange(new Date(e.target.value))} />
                {/* <span className="material-symbols-rounded h-fit icon absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">arrow_drop_down_circle</span> */}
            </div>
        </div>
    )
}

export default InputDate;