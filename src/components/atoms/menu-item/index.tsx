import { FC } from "react";

type MenuItemProps = {
    icon: string;
    message: string;
}

const MenuItem: FC<MenuItemProps> = ({ icon, message }) => {
    return (
        <div className="gap-x-1.5 px-3 py-1.5 flex-row flex items-center rounded-lg hover:bg-gray-200 text-gray-600">
            <span className="material-symbols-rounded h-fit icon">{icon}</span>
            <div className="text-sm">{message}</div>
        </div>
    )
}

export default MenuItem;