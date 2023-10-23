import HeaderTitle from "../../atoms/header-title";
import StudentTeamManage from "../../organisms/student-team-manage";

const StudentTeam = () => {
    return (
        <div className="flex flex-col gap-10">
            <HeaderTitle title="Team" subTitle="Manage your team here." />
            <StudentTeamManage />
        </div>
    )
}

export default StudentTeam;