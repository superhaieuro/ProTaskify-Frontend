import { FC, useContext, useEffect, useState } from "react";
import XButton from "../../atoms/x-button";
import InputText from "../../atoms/input-text";
import ApproveButton from "../../atoms/approve-button";
import NormalButton from "../../atoms/normal-button";
import api from "../../../config/axios";
import { ToastContext } from "../../../utils/toast-context";

export type Project = {
    Subjectname: string | null;
    Problems: string | null;
    Context: string | null;
    Actors: string | null;
    Functionalrequirements: string | null;
    NonFunctionalrequirements: string | null;
};

type ModalImportProjectListProps = {
    isVisible: boolean;
    onClose: () => void;
    data: string;
};

const ModalImportProjectList: FC<ModalImportProjectListProps> = ({
    isVisible,
    onClose,
    data,
}) => {
    const toast = useContext(ToastContext);
    const [loading, setLoading] = useState(false);

    const handleCreate = () => {
        setLoading(true);
    };

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const request = {
                    projects: JSON.parse(data),
                };
                console.log(request);
                const response = await api.post(
                    "api/v1/admin/import-project",
                    request,
                    {
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );
                if (response.status === 200) {
                    toast?.setSuccessMessage("Import successfully.");
                    onClose();
                } else {
                    toast?.setErrorMessage("Failed to send data.");
                }
            } catch (error) {
                console.log(error);
                toast?.setErrorMessage("An error occurred.");
            } finally {
                setLoading(false);
            }
        };

        if (loading) {
            fetchUserData();
        }
    }, [loading]);

    if (!isVisible) {
        return null;
    } else {
        const jsonData: Project[] = JSON.parse(data);
        return (
            <div
                className="absolute left-0 top-0 bg-black bg-opacity-50 h-full w-full
            flex justify-center items-center drop-shadow"
            >
                <div className="bg-white p-5 border border-gray-200 rounded-lg flex flex-col gap-y-5">
                    <div className="flex items-center justify-between">
                        <div className="text-2xl font-bold">Import projects</div>
                        <button onClick={() => onClose()}>
                            <XButton />
                        </button>
                    </div>

                    {/* <div className="flex gap-5">
                        <div className="w-full">
                            <InputText
                                title="Semester"
                                placeholder=""
                                value="Fall 2023"
                                readonly={true} onChange={function (e: any): void {
                                    throw new Error("Function not implemented.");
                                }} error={""} />
                        </div>
                    </div> */}

                    <div className="flex flex-col gap-2 text-sm">
                        {/* <div>Project list</div> */}
                        <div className="border border-gray-200 rounded-lg">
                            <div className="p-5 bg-gray-50 flex gap-x-2 rounded-t-lg border-b border-gray-200 ">
                                <div className="w-10">#</div>
                                <div className="w-32">Subject name</div>
                                <div className="w-52">Context</div>
                                <div className="w-52">Actors</div>
                                <div className="w-52">Functional requirements</div>
                                <div className="w-52">Non-Functional requirements</div>
                            </div>
                            <div className="h-80 overflow-y-auto divide-y">
                                {jsonData.map((project, index) => (
                                    <div key={index} className="p-5 flex gap-x-2">
                                        <div className="w-10">{index + 1}</div>
                                        <div className="w-32">{project.Subjectname}</div>
                                        <div className="w-52">{project.Context}</div>
                                        <div className="w-52">{project.Actors}</div>
                                        <div className="w-52">
                                            {project.Functionalrequirements}
                                        </div>
                                        <div className="w-52">
                                            {project.NonFunctionalrequirements}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-2 justify-end">
                        <button onClick={() => onClose()}>
                            <NormalButton icon="" message="Cancel" />
                        </button>

                        <button onClick={handleCreate} disabled={loading}>
                            <ApproveButton icon="" message="Create" />
                        </button>
                    </div>
                </div>
            </div>
        );
    }
};

export default ModalImportProjectList;
