import { FC } from "react";

type LeaderRouteProps = {
    children: React.ReactNode;
}

const LeaderRoute: FC<LeaderRouteProps> = ({ children }) => {
    const userInfo = sessionStorage.getItem("userSession");
    if (JSON.parse(userInfo!).userInfo.leader || sessionStorage.getItem("isLeader") != null) {
        return (
            <>
                {children}
            </>
        );
    }
}

export default LeaderRoute;