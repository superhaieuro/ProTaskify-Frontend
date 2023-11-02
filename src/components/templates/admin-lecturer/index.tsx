import { useState } from "react";
import HeaderTitle from "../../atoms/header-title";
import NormalButton from "../../atoms/normal-button";
import AdminLecturerList from "../../organisms/admin-lecturer-list";

const AdminLecturers = () => {
    return (
        <div className="flex flex-col gap-10">
            <div className="flex flex-row justify-between">
                <HeaderTitle title="Lecturer" subTitle="Manage lecturers here." />
                <button className="h-fit" onClick={() => null}>
                    <NormalButton icon="upload" message="Import new lecturers" />
                </button>
                {/* <ModalCreateSemester
                    isVisible={showModalCreateSemester}
                    onClose={() => setShowModalCreateSemester(false)} /> */}
            </div>
            <AdminLecturerList />
        </div>
    )
}

export default AdminLecturers;