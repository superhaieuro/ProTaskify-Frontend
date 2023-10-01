import HeaderTitle from "../../atoms/header-title";
import LecturerImportStudentList from "../../organisms/lecturer-import-student-list";

const LecturerClasses = () => {
    return (
        <div>
            <div className="flex flex-row justify-between">
                <HeaderTitle title="Classes" subTitle="Manage your classes and semester here." />
                <LecturerImportStudentList />
            </div>
        </div>
    )
}

export default LecturerClasses;