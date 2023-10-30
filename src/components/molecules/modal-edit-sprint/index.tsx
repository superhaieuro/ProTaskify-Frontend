import { FC, useContext, useEffect, useState } from "react";
import XButton from "../../atoms/x-button";
import InputText from "../../atoms/input-text";
import { ToastContext } from "../../../utils/toast-context";
import InputDate from "../../atoms/input-date";
import TextareaAutosize from 'react-textarea-autosize';
import NormalButton from "../../atoms/normal-button";
import ApproveButton from "../../atoms/approve-button";
import api from "../../../config/axios";

type Sprint = {
    id: string;
    name: string;
    note: string;
    startDate: Date;
    endDate: Date;
}

type ModalEditSprintProps = {
    isVisible: boolean;
    onClose: () => void;
    sprint: Sprint | undefined;
};

const ModalEditSprint: FC<ModalEditSprintProps> = ({ isVisible, onClose, sprint }) => {
    const [inputNote, setInputNote] = useState("");
    const [inputName, setInputName] = useState("");
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    const [inputNameError, setInputNameError] = useState("");
    const [inputNoteError, setInputNoteError] = useState("");

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
        if (sprint) {            
            setInputName(sprint.name);
            setInputNote(sprint.note);
            setStartDate(new Date(sprint.startDate));
            setEndDate(new Date(sprint.endDate));
        }
    }, [sprint]);

    const handleUpdate = () => {
        let valid = true;
        if (inputName.length < 5 || inputName.length > 100) {
            setInputNameError("Name must be from 5 to 100 characters.");
            valid = false;
        } else {
            setInputNameError("");
        }

        if (inputNote.length < 5) {
            setInputNoteError("Note must be from 5 characters.");
            valid = false;
        } else {
            setInputNoteError("");
        }

        if (valid === true) {
            try {
                const request = {
                    name: inputName,
                    note: inputNote,
                    startDate: startDate,
                    endDate: endDate
                }
                const fetchUserData = async () => {
                    const response = await api.put(`/api/v1/lecturer/update-sprint/${sprint!.id}`, request, {
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
            flex justify-center items-center shadow-sm">
                <div className="bg-white w-96 p-5 border border-gray-200 rounded-lg flex flex-col gap-y-5">
                    <div className="flex items-center justify-between">
                        <div className="text-2xl font-bold">Edit sprint</div>
                        <button onClick={() => {
                            onClose();
                            setInputNameError("");
                            setInputNoteError("");
                        }}>
                            <XButton />
                        </button>
                    </div>

                    <div className="w-full">
                        <InputText title="Sprint name" placeholder="" value={inputName} readonly={false} onChange={(e) => setInputName(e.target.value)} error={inputNameError} />
                    </div>

                    <div className="flex gap-5">
                        <div className="w-full">
                            <InputDate value={startDate} title="Start date" readonly={false} onChange={(e) => setStartDate(e)} />
                        </div>

                        <div className="w-full">
                            <InputDate value={endDate} title="End date" readonly={false} onChange={(e) => setEndDate(e)} />
                        </div>
                    </div>

                    <div className="w-full">
                        <div className="flex flex-col gap-y-2">
                            <div className="text-sm font-semibold">Note</div>
                            <TextareaAutosize className="border border-gray-200 bg-gray-50 py-1.5 px-3 text-sm rounded-lg
                            outline-none w-full h-fit resize-none ring-blue-600 focus:ring-1 focus:border-blue-600"
                                minRows={5} maxRows={10} value={inputNote} onChange={(e) => { setInputNote(e.target.value) }} />
                            {inputNoteError !== "" ? <div className="text-xs text-red-600">{inputNoteError}</div> : null}
                        </div>
                    </div>

                    <div className="flex gap-2 justify-end">
                        <button onClick={() => {
                            onClose();
                            setInputNameError("");
                            setInputNoteError("");
                        }}>
                            <NormalButton icon="" message="Cancel" />
                        </button>

                        <button onClick={handleUpdate}>
                            <ApproveButton icon="" message="Save" />
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}

export default ModalEditSprint;