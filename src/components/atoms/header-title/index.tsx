import { FC } from "react";

type HeaderTitleProps = {
    title: string;
    subTitle: string;
}

const HeaderTitle: FC<HeaderTitleProps> = ({ title, subTitle }) => {
    return (
        <div>
            <div className="text-3xl font-bold">{title}</div>
            <div className="text-base text-gray-600">{subTitle}</div>
        </div >
    )
}

export default HeaderTitle;