import HeaderTitle from "../../atoms/header-title";
import LecturerMessage from "../../organisms/lecturer-message";

const LecturerNotification = () => {
    return (
        <div className="flex flex-col gap-10 h-full">
            <HeaderTitle title="Notification" subTitle="Manage your notification here." />
            <LecturerMessage />
        </div>
    )
}

export default LecturerNotification;