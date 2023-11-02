import { useState } from "react";
import HeaderTitle from "../../atoms/header-title";
import AdminImportProjectList from "../../organisms/admin-import-project";
import AdminProjectList from "../../organisms/admin-project-list";

const AdminProject = () => {
    const [showModalCreateSemester, setShowModalCreateSemester] = useState(false);

    return (
        <div className="flex flex-col gap-10">
            <div className="flex flex-row justify-between">
                <HeaderTitle title="Projects" subTitle="Manage topic here." />
                <AdminImportProjectList />
            </div>
            <AdminProjectList />
        </div>
    )
}

export default AdminProject;