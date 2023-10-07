import HeaderTitle from "../../atoms/header-title";
import LecturerClassesManage from "../../organisms/lecturer-classes-manage";
import LecturerImportStudentList from "../../organisms/lecturer-import-student-list";

const LecturerClasses = () => {
    return (
        <div className="flex flex-col gap-10">
            <div className="flex flex-row justify-between">
                <HeaderTitle title="Classes" subTitle="Manage your classes and semester here." />
                <LecturerImportStudentList />
            </div>
            <LecturerClassesManage />
        </div>
    )
}

export default LecturerClasses;