import { FC, ReactNode } from "react";

type MenuFieldProp = {
    title: string;
    components: ReactNode[];
}

const MenuField: FC<MenuFieldProp> = ({ title, components }) => {
    return (
        <div className="gap-y-2 w-full flex flex-col">
            <div className="text-gray-600 px-3 font-bold text-xxs uppercase">{title}</div>
            {components.map((component, index) => (
                <div className="flex gap-y-2 flex-col" key={index}>{component}</div>
            ))}
        </div>
    )
}

export default MenuField;