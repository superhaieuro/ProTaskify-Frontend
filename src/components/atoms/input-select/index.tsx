import { FC } from "react";

type InputSelectProps = {
    title: string;
    data: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    value: string;
    error: string
}

type Data = {
    id: string;
    name: string;
}

const InputSelect: FC<InputSelectProps> = ({ title, data, onChange, value, error }) => {
    const dataList: Data[] = JSON.parse(data);
    return (
        <div className="flex flex-col gap-y-2">
            <div className="text-sm">{title}</div>
            <div className="relative">
                <select name="feature" id="feature" className="border border-gray-200 bg-gray-50 py-1.5 pl-3 pr-10 text-sm rounded-lg
                            outline-none w-full h-fit ring-blue-600 focus:ring-1 focus:border-blue-600 appearance-none" onChange={(e) => onChange(e)}>
                    {value === "" ?
                        <option disabled hidden selected>Choose an option</option> : null}
                    {dataList.map((dataItem) => (
                        value !== "" && dataItem.id === value ?
                            <option selected value={dataItem.id}>{dataItem.name}</option> :
                            <option value={dataItem.id}>{dataItem.name}</option>
                    ))}
                </select>
                <span className="material-symbols-rounded h-fit icon absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">arrow_drop_down_circle</span>
            </div>
            {error !== "" ? <div className="text-xs text-red-600">{error}</div> : null}
        </div>
    )
}

export default InputSelect;