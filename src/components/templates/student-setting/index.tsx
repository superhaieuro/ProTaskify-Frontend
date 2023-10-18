import HeaderTitle from "../../atoms/header-title";
import StudentSettingForm from "../../organisms/student-setting-form";

const StudentSetting = () => {
    return (
        <div className="flex flex-col gap-10">
            <HeaderTitle title="Setting" subTitle="Manage your account here." />
            <div className="flex justify-center">
                <StudentSettingForm />
            </div>
        </div>
    )
}

export default StudentSetting;