import { FC } from "react";

type InputSelectProps = {
    title: string;
    data: string;
    onChange: (e: any) => void;
}

type feature = {
    id: string;
    name: string;
}

const InputSelect: FC<InputSelectProps> = ({ title, data, onChange }) => {
    const dataList: feature[] = JSON.parse(data);
    return (
        <div className="flex flex-col gap-y-2">
            <div className="text-sm">{title}</div>
            <div className="relative">
                <select name="feature" id="feature" className="border border-gray-200 bg-gray-50 py-1.5 px-3 text-sm rounded-lg
                            outline-none w-full h-fit ring-blue-600 focus:ring-1 focus:border-blue-600 appearance-none" onChange={(e) => onChange(e)}>
                    <option disabled hidden selected>Choose an option</option>
                    {dataList.map((featureItem) => (
                        <option value={featureItem.id}>{featureItem.name}</option>
                    ))}
                </select>
                <span className="material-symbols-rounded h-fit icon absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">arrow_drop_down_circle</span>
            </div>
        </div>
    )
}

export default InputSelect;