import HeaderTitle from "../../atoms/header-title";
import AdminLecturerList from "../../organisms/admin-lecturer-list";
import AdminImportLecturerList from "../../organisms/admin-import-lecturer-list";

const AdminLecturers = () => {
    return (
        <div className="flex flex-col gap-10">
            <div className="flex flex-row justify-between">
                <HeaderTitle title="Lecturer" subTitle="Manage lecturers here." />
                <AdminImportLecturerList />
            </div>
            <AdminLecturerList />
        </div>
    )
}

export default AdminLecturers;