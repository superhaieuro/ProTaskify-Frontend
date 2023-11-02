import { FC } from "react";

type LeaderRouteProps = {
    children: React.ReactNode;
}

const LeaderRoute: FC<LeaderRouteProps> = ({ children }) => {
    const userInfo = sessionStorage.getItem("userSession");
    if (JSON.parse(userInfo!).inGroup !== false) {
        return (
            <>
                {children}
            </>
        );
    }
}

export default LeaderRoute;