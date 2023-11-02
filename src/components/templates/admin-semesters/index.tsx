import { useState } from "react";
import HeaderTitle from "../../atoms/header-title";
import AdminSemesterList from "../../organisms/admin-semester-list";
import NormalButton from "../../atoms/normal-button";
import ModalCreateSemester from "../../molecules/modal-create-semester";

const AdminSemesters = () => {
    const [showModalCreateSemester, setShowModalCreateSemester] = useState(false);

    return (
        <div className="flex flex-col gap-10">
            <div className="flex flex-row justify-between">
                <HeaderTitle title="Semesters" subTitle="Manage semesters here." />
                <button className="h-fit" onClick={() => setShowModalCreateSemester(true)}>
                    <NormalButton icon="add" message="Create new semester" />
                </button>
                <ModalCreateSemester
                    isVisible={showModalCreateSemester}
                    onClose={() => setShowModalCreateSemester(false)} />
            </div>
            <AdminSemesterList />
        </div>
    )
}

export default AdminSemesters;