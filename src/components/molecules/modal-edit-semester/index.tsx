import { FC, useContext, useEffect, useState } from "react";
import XButton from "../../atoms/x-button";
import ApproveButton from "../../atoms/approve-button";
import NormalButton from "../../atoms/normal-button";
import InputText from "../../atoms/input-text";
import InputDate from "../../atoms/input-date";
import { ToastContext } from "../../../utils/toast-context";
import api from "../../../config/axios";

type ModalEditSemesterProps = {
    isVisible: boolean;
    onClose: () => void;
    semester: Semester;
};

type Semester = {
    id: string;
    name: string;
    startDate: Date;
    endDate: Date;
    status: boolean;
}

const ModalEditSemester: FC<ModalEditSemesterProps> = ({ isVisible, onClose, semester }) => {
    const [inputName, setInputName] = useState("");
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    const [inputNameError, setInputNameError] = useState("");

    const toast = useContext(ToastContext);

    const tomorrow = (date: Date): Date => {
        const nextDay = new Date(date);
        nextDay.setDate(date.getDate() + 1);
        setEndDate(nextDay);
        return nextDay;
    }

    useEffect(() => {
        if (endDate < startDate) {
            setEndDate(tomorrow(startDate));
            toast?.setErrorMessage("End date cannot be earlier than the start date.");
        }
    }, [startDate, endDate]);

    useEffect(() => {
        setInputName(semester.name);
        setStartDate(new Date(semester.startDate));
        setEndDate(new Date(semester.endDate));
    }, [semester])

    const handleCreate = () => {
        let valid = true;
        if (inputName.length < 5 || inputName.length > 11) {
            setInputNameError("Name must be from 5 to 11 characters.");
            valid = false;
        } else {
            setInputNameError("");
        }

        if (valid === true) {
            try {
                const request = {
                    name: inputName,
                    status: true,
                    startDate: startDate,
                    endDate: endDate
                }
                const fetchUserData = async () => {
                    const response = await api.put(`/api/v1/admin/update-semester/${semester.id}`, request, {
                        headers: {
                            'Content-Type': 'application/json;charset=UTF-8'
                        }
                    });
                    if (response.status === 200) {
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
            flex justify-center items-center shadow-sm">
                <div className="bg-white w-96 p-5 border border-gray-200 rounded-lg flex flex-col gap-y-5">
                    <div className="flex items-center justify-between">
                        <div className="text-2xl font-bold">Edit semester</div>
                        <button onClick={() => {
                            onClose();
                            setInputNameError("");
                            setStartDate(new Date());
                            setEndDate(new Date());
                        }}>
                            <XButton />
                        </button>
                    </div>

                    <div className="w-full">
                        <InputText title="Semester name" placeholder="" value={inputName} readonly={false} onChange={(e) => setInputName(e.target.value)} error={inputNameError} />
                    </div>

                    <div className="flex gap-5">
                        <div className="w-full">
                            <InputDate value={startDate} title="Start date" readonly={false} onChange={(e) => setStartDate(e)} />
                        </div>

                        <div className="w-full">
                            <InputDate value={endDate} title="End date" readonly={false} onChange={(e) => setEndDate(e)} />
                        </div>
                    </div>

                    <div className="flex gap-2 justify-end">
                        <button onClick={() => {
                            onClose();
                            setInputNameError("");
                            setStartDate(new Date());
                            setEndDate(new Date());
                        }}>
                            <NormalButton icon="" message="Cancel" />
                        </button>

                        <button onClick={handleCreate}>
                            <ApproveButton icon="" message="Save" />
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}

export default ModalEditSemester;