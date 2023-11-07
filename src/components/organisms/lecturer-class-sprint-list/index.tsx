import { useContext, useEffect, useState } from "react";
import { ClassInfoContext } from "../../../utils/class-info-context";
import StatusBox from "../../atoms/status-box";
import api from "../../../config/axios";
import ModalEditSprint from "../../molecules/modal-edit-sprint";
import NormalButton from "../../atoms/normal-button";
import ModalCreateSprint from "../../molecules/modal-create-new-sprint";
import NullTableCell from "../../atoms/null-table-cell";

type Sprint = {
    id: string;
    name: string;
    note: string;
    startDate: Date;
    endDate: Date;
}

const LecturerSprintStudentList = () => {
    const classIdContext = useContext(ClassInfoContext);
    const [sprintList, setSprintList] = useState<Sprint[]>([]);
    const [showEditSprintModal, setShowEditSprintModal] = useState(false);
    const [showCreateSprintModal, setShowCreateSprintModal] = useState(false);
    const [tempSprint, setTempSprint] = useState<Sprint | undefined>();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await api.get(`/api/v1/common/view-sprint/${classIdContext!.classId}`);
                setSprintList(response.data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchUserData();
    }, []);

    return (
        <div className="flex flex-col gap-5 text-sm">
            <div className="w-full flex justify-end">
                <button onClick={() => setShowCreateSprintModal(true)}>
                    <NormalButton icon="add" message="Create new sprint" />
                </button>
            </div>

            <div className="border border-gray-200 rounded-lg overflow-auto whitespace-pre-wrap">
                <div className="p-5 bg-gray-50 flex gap-x-5 border-b border-gray-200 font-semibold text-gray-600">
                    <div className="w-10">#</div>
                    <div className="w-56">Name</div>
                    <div className="w-40">Start date</div>
                    <div className="w-40">End Date</div>
                    <div className="w-36">Status</div>
                    <div>Note</div>
                </div>
                {sprintList.length != 0 ?
                    <div className="divide-y">
                        {sprintList.map((sprintItem, index) => (
                            <div key={index} className="p-5 flex gap-x-5">
                                <div className="w-10 flex-shrink-0 my-1.5 h-fit">{index + 1}</div>
                                <div className="w-56 flex-shrink-0 my-1.5 h-fit">{sprintItem.name}</div>
                                <div className="w-40 flex-shrink-0 my-1.5 h-fit">
                                    {new Date(sprintItem.startDate).toLocaleDateString(undefined, {
                                        year: 'numeric',
                                        month: '2-digit',
                                        day: '2-digit'
                                    })}
                                </div>
                                <div className="w-40 flex-shrink-0 my-1.5 h-fit">
                                    {new Date(sprintItem.endDate).toLocaleDateString(undefined, {
                                        year: 'numeric',
                                        month: '2-digit',
                                        day: '2-digit'
                                    })}
                                </div>
                                <div className="w-36 flex-shrink-0 my-1.5 items-center flex h-5">
                                    <StatusBox color={new Date(sprintItem.endDate) > new Date() ? "green" : "gray"} message={new Date(sprintItem.endDate) > new Date() ? "On-going" : "Finished"} />
                                </div>
                                <div className="w-full flex-grow-0 my-1.5 h-fit">{sprintItem.note}</div>

                                <button className="h-fit" onClick={() => {
                                    setTempSprint(sprintItem);
                                    setShowEditSprintModal(true);
                                }}>
                                    <NormalButton icon="" message="Edit" />
                                </button>
                            </div>
                        ))}
                    </div> :
                    <NullTableCell />}
            </div>

            <ModalEditSprint
                isVisible={showEditSprintModal}
                onClose={() => setShowEditSprintModal(false)}
                sprint={tempSprint} />

            <ModalCreateSprint
                isVisible={showCreateSprintModal}
                onClose={() => setShowCreateSprintModal(false)} />
        </div>
    )
}

export default LecturerSprintStudentList;