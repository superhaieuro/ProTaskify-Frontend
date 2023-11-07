import { FC, useContext, useEffect, useState } from "react";
import NormalButton from "../../atoms/normal-button";
import ApproveButton from "../../atoms/approve-button";
import XButton from "../../atoms/x-button";
import InputText from "../../atoms/input-text";
import InputSelect from "../../atoms/input-select";
import api from "../../../config/axios";
import { ToastContext } from "../../../utils/toast-context";
import NotificationBox from "../../atoms/notification-box";

type ModalEditStudentProps = {
    isVisible: boolean;
    onClose: () => void;
    score: number | null;
    groupList: Group[];
    group: Group | null;
    studentId: string;
    leader: boolean;
};

type Group = {
    id: string;
    name: string;
}

const ModalEditStudent: FC<ModalEditStudentProps> = ({ isVisible, onClose, score, groupList, group, studentId, leader }) => {
    const [inputScore, setInputScore] = useState<number | null>();
    const [inputGroup, setInputGroup] = useState<string>();

    const [inputScoreError, setInputScoreError] = useState("");

    const toast = useContext(ToastContext);

    useEffect(() => {
        setInputScore(score);
        setInputGroup(group ? groupList.find(gr => gr.id = group.id)!.id : "0");
    }, [score, group])

    const handleUpdate = () => {
        let valid = true;
        if (inputScore) {
            if (isNaN(inputScore) || inputScore < 0 || inputScore > 10) {
                setInputScoreError("Score must be a number between 0 to 10");
                valid = false;
            } else {
                setInputScoreError("");
            }
        }

        if (valid === true) {
            try {
                const fetchUserData = async () => {
                    const response = await api.put(`/api/v1/lecturer/update-student-info?studentId=${studentId}&groupId=${inputGroup}${inputScore ? `&score=${inputScore}` : ""}`, {
                        headers: {
                            'Content-Type': 'application/json;charset=UTF-8'
                        }
                    });
                    if (response.status === 200) {
                        // toast?.setSuccessMessage("Create feature successfully.");
                        window.location.reload();
                    } else {
                        toast?.setErrorMessage("Failed to send data.");
                    }
                }
                fetchUserData();
            } catch (error) {
                console.log(error);
            }
        }
    }

    if (!isVisible) {
        return null;
    } else {
        return (
            <div className="absolute left-0 top-0 bg-black bg-opacity-50 h-full w-full
            flex justify-center items-center">
                <div className="bg-white w-96 p-5 border border-gray-200 rounded-lg flex flex-col gap-y-5 shadow-sm animate-modalenter">
                    <div className="flex items-center justify-between">
                        <div className="text-2xl font-bold">Edit student</div>
                        <button onClick={() => {
                            onClose();
                            setInputScore(null);
                            setInputScoreError("");
                        }}>
                            <XButton />
                        </button>
                    </div>

                    {leader ?
                        <NotificationBox icon="lightbulb" message="Can not change leader's group." style="text-blue-600 border-blue-200 bg-blue-50" /> :
                        <div className="w-full">
                            <InputSelect title="Group" value={inputGroup!} data={JSON.stringify([{ id: "0", name: "No group" }, ...groupList])} onChange={(e) => setInputGroup(e.target.value)} error="" readonly={false} />
                        </div>}



                    <div className="w-full">
                        <InputText title="Score" placeholder="" value={inputScore ? inputScore.toString() : ""} readonly={false} onChange={(e) => setInputScore(e.target.value)} error={inputScoreError} />
                    </div>

                    <div className="flex gap-2 justify-end">
                        <button onClick={() => {
                            onClose();
                            setInputScore(null);
                            setInputScoreError("");
                        }}>
                            <NormalButton icon="" message="Cancel" />
                        </button>

                        <button onClick={handleUpdate}>
                            <ApproveButton icon="" message="Update" />
                        </button>
                    </div>
                </div>
            </div >
        )
    }
}

export default ModalEditStudent;