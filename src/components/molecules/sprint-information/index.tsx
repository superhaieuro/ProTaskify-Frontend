import { useEffect, useState } from "react";
import NormalButton from "../../atoms/normal-button";
import StatusBox from "../../atoms/status-box";
import api from "../../../config/axios";
import ModalSprintHistory from "../modal-sprint-history";

type Sprint = {
    name: string;
    note: string;
    feedbackList: Feedback[];
    startDate: Date;
    endDate: Date;
}

type Feedback = {
    feedback: string;
}

const SprintInformation = () => {
    const [expand, setExpand] = useState(false);
    const [expandIcon, setExpandIcon] = useState("expand_more")
    const [showSprintHistoryModal, setShowSprintHistoryModal] = useState(false);

    const handleExpand = () => {
        expand ? setExpand(false) : setExpand(true);
        expandIcon === "expand_more" ? setExpandIcon("expand_less") : setExpandIcon("expand_more");
    }

    const [sprintList, setSprintList] = useState<Sprint[]>([]);

    useEffect(() => {
        try {
            const fetchUserData = async () => {
                const studentId = JSON.parse(sessionStorage.getItem("userSession")!).userInfo.RollNumber;
                const response = await api.get(`/api/v1/student/sprint/${studentId}`);
                setSprintList(response.data);
                console.log(response.data);

            }
            fetchUserData();
        } catch (error) {
            console.log(error);
        }
    }, [])

    return (
        <div>
            {sprintList.length !== 0 ?
                <div className="border border-gray-200 rounded-lg p-5 flex flex-col gap-5 whitespace-pre-wrap">
                    <div className="flex justify-between items-center">
                        <div>
                            <div className="flex gap-1.5 items-center">
                                <div className="text-xl font-bold">{sprintList[0].name}</div>
                                {
                                    new Date(sprintList[0].endDate) > new Date() ?
                                        <StatusBox color="green" message="On-going" /> :
                                        <StatusBox color="gray" message="Finished" />
                                }
                            </div>

                            <div className="text-sm">
                                {new Date(sprintList[0].startDate).toLocaleDateString(undefined, {
                                    year: 'numeric',
                                    month: '2-digit',
                                    day: '2-digit'
                                })}
                                {" - "}
                                {new Date(sprintList[0].endDate).toLocaleDateString(undefined, {
                                    year: 'numeric',
                                    month: '2-digit',
                                    day: '2-digit'
                                })}
                            </div>
                        </div>

                        <div className="flex gap-1.5">
                            <button onClick={() => setShowSprintHistoryModal(true)}>
                                <NormalButton icon="history" message="Feedback history" />
                            </button>

                            <button onClick={handleExpand}>
                                <NormalButton icon={expandIcon} message="" />
                            </button>
                        </div>
                    </div>

                    {expand ?
                        <div className="flex flex-col gap-2">
                            <div className="text-sm">
                                <div className="font-semibold">Note from Lecturer</div>
                                <div className="text-gray-600">{sprintList[0].note}</div>
                            </div>

                            <div className="text-sm">
                                <div className="font-semibold">Feedback from Lecturer</div>
                                <div className="text-gray-600">{
                                    sprintList[0].feedbackList.length !== 0 ?
                                        sprintList[0].feedbackList[0].feedback :
                                        "No feedback is available yet."}
                                </div>
                            </div>
                        </div>
                        : null}
                </div>
                : null}

            <ModalSprintHistory
                isVisible={showSprintHistoryModal}
                onClose={() => setShowSprintHistoryModal(false)}
                sprintList={sprintList} />
        </div>
    )
}

export default SprintInformation;