import { FC, useState } from "react";
import InputText from "../../atoms/input-text";
import XButton from "../../atoms/x-button";
import NormalButton from "../../atoms/normal-button";
import ApproveButton from "../../atoms/approve-button";
import TextareaAutosize from 'react-textarea-autosize';
import InputSelect from "../../atoms/input-select";

type ModalCreateNewTaskProps = {
    isVisible: boolean;
    onClose: () => void;
};

const ModalCreateNewTask: FC<ModalCreateNewTaskProps> = ({ isVisible, onClose }) => {
    const [inputName, setInputName] = useState("");
    const [inputFeature, setInputFeature] = useState("");
    const [inputPriority, setInputPriority] = useState("");
    const [inputMember, setInputMember] = useState("");
    const [inputDescription, setInputDescription] = useState("");

    const featureList = [
        { id: "1", name: "Feature 1" },
        { id: "2", name: "Feature 2" }
    ];

    const priorityList = [
        { id: "Low", name: "Low" },
        { id: "Medium", name: "Medium" },
        { id: "High", name: "High" }
    ];

    if (!isVisible) {
        return null;
    } else {
        return (
            <div className="absolute left-0 top-0 bg-black bg-opacity-50 h-full w-full
            flex justify-center items-center shadow">
                <div className="bg-white w-96 p-5 border border-gray-200 rounded-lg flex flex-col gap-y-5">
                    <div className="flex items-center justify-between">
                        <div className="text-2xl font-bold">New task</div>
                        <button onClick={() => {
                            onClose();
                            setInputName("");
                            setInputFeature("");
                            setInputPriority("");
                            setInputMember("");
                            setInputDescription("");
                        }}>
                            <XButton />
                        </button>
                    </div>

                    <div className="w-full">
                        <InputText title="Task name" placeholder="" value={inputName} readonly={false} onChange={(e) => setInputName(e.target.value)} />
                    </div>

                    <div className="w-full">
                        <InputSelect title="Feature" data={JSON.stringify(featureList)} onChange={(e) => setInputFeature(e.target.value)} />
                    </div>

                    <div className="w-full">
                        <InputSelect title="Priority" data={JSON.stringify(priorityList)} onChange={(e) => setInputFeature(e.target.value)} />
                    </div>

                    <div className="w-full">
                        <InputSelect title="Assign to" data={JSON.stringify(featureList)} onChange={(e) => setInputFeature(e.target.value)} />
                    </div>

                    <div className="w-full">
                        <div className="flex flex-col gap-y-2">
                            <div className="text-sm">Description</div>
                            <TextareaAutosize className="border border-gray-200 bg-gray-50 py-1.5 px-3 text-sm rounded-lg
                            outline-none w-full h-fit resize-none ring-blue-600 focus:ring-1 focus:border-blue-600"
                                minRows={5} maxRows={10} value={inputDescription} onChange={(e) => { setInputDescription(e.target.value) }} />
                        </div>
                    </div>

                    <div className="flex gap-2 justify-end">
                        <button onClick={() => {
                            onClose();
                            setInputName("");
                            setInputFeature("");
                            setInputPriority("");
                            setInputMember("");
                            setInputDescription("");
                        }}>
                            <NormalButton icon="" message="Cancel" />
                        </button>

                        <button>
                            <ApproveButton icon="" message="Create" />
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}

export default ModalCreateNewTask;