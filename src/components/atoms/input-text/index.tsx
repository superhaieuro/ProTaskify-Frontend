import { FC } from "react";

type InputTextProps = {
    title: string;
    placeholder: string;
    value: string;
    readonly: boolean;
    onChange: (e: any) => void;
}

const InputText: FC<InputTextProps> = ({ title, placeholder, value, readonly, onChange }) => {
    return (
        <div className="flex flex-col gap-y-2">
            <div className="text-sm">{title}</div>
            <input className={`border border-gray-200 bg-gray-50 py-1.5 px-3 text-sm rounded-lg outline-none
            ${readonly ? null : "ring-blue-600 focus:ring-1 focus:border-blue-600"} `}
                type="text" placeholder={placeholder} value={value} readOnly={readonly}
                onChange={(e) => onChange(e)}/>
        </div>
    )
}

export default InputText;