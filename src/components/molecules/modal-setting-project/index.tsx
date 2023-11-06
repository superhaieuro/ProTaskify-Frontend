import { FC, useContext, useEffect, useState } from "react";
import NormalButton from "../../atoms/normal-button";
import HeaderTitle from "../../atoms/header-title";
import api from "../../../config/axios";
import ApproveButton from "../../atoms/approve-button";
import { ToastContext } from "../../../utils/toast-context";

type ModalSettingProjectProps = {
    isVisible: boolean;
    onClose: () => void;
    currentProjectId: string | undefined;
}

type Project = {
    id: string;
    name: string;
    problems: string;
    context: string;
    actors: string;
    functionalRequirements: string;
    nonFunctionalRequirements: string;
}

const ModalSettingProject: FC<ModalSettingProjectProps> = ({ isVisible, onClose, currentProjectId }) => {
    const [projectList, setProjectList] = useState<Project[]>([]);

    const toast = useContext(ToastContext);

    useEffect(() => {
        try {
            const fetchUserData = async () => {
                const response = await api.get("/api/v1/common/get-all-topic");
                setProjectList(response.data);
            }
            fetchUserData();
        } catch (error) {
            console.log(error);
        }
    }, [])

    const handleUpdate = (projectId: string) => {
        try {
            const fetchUserData = async () => {
                const userInfo = JSON.parse(sessionStorage.getItem("userSession")!);
                const response = await api.put(`/api/v1/student/update-group-topic/${userInfo.userInfo.RollNumber}/${projectId}`, {
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

    if (!isVisible) {
        return null;
    } else {
        return (
            <div className="absolute bg-white w-full min-h-full left-0 top-0 p-5 flex flex-col gap-5">
                <div>
                    <button onClick={() => onClose()}>
                        <NormalButton icon="arrow_back" message="Back to team" />
                    </button>
                </div>

                <HeaderTitle
                    title="Select topic"
                    subTitle="Change your group's project topic." />

                <div className="border border-gray-200 rounded-lg text-sm">
                    <div className="p-5 bg-gray-50 flex gap-x-5 border-b border-gray-200 font-semibold text-gray-600 rounded-t-lg">
                        <div className="w-fit">
                            #
                            <div className="w-10"></div>
                        </div>

                        <div className="w-1/2">
                            Project information
                        </div>
                    </div>
                    <div className="divide-y">
                        {projectList.map((projectItem, index) => (
                            <div key={index} className="p-5 flex gap-x-5 whitespace-pre-wrap">
                                <div className="w-fit">
                                    {index + 1}
                                    <div className="w-10"></div>
                                </div>

                                <div className="flex flex-col gap-2 w-full">
                                    {projectItem.name ?
                                        <div className="text-sm">
                                            <div className="font-semibold">Subject name</div>
                                            <div className="text-gray-600">{projectItem.name}</div>
                                        </div> : null}

                                    {projectItem.problems ?
                                        <div className="text-sm">
                                            <div className="font-semibold">Problems</div>
                                            <div className="text-gray-600">{projectItem.problems}</div>
                                        </div> : null}


                                    {projectItem.context ?
                                        <div className="text-sm">
                                            <div className="font-semibold">Context</div>
                                            <div className="text-gray-600">{projectItem.context}</div>
                                        </div> : null}


                                    {projectItem.actors ?
                                        <div className="text-sm">
                                            <div className="font-semibold">Actors</div>
                                            <div className="text-gray-600">{projectItem.actors}</div>
                                        </div> : null}

                                    {projectItem.functionalRequirements ?
                                        <div className="text-sm">
                                            <div className="font-semibold">Functional requirements</div>
                                            <div className="text-gray-600">{projectItem.functionalRequirements}</div>
                                        </div> : null}

                                    {projectItem.nonFunctionalRequirements ?
                                        <div className="text-sm">
                                            <div className="font-semibold">Non-Functional requirements</div>
                                            <div className="text-gray-600">{projectItem.nonFunctionalRequirements}</div>
                                        </div> : null}
                                </div>

                                {projectItem.id == currentProjectId ?
                                    <div className="border-gray-200 bg-white text-gray-200 gap-x-1.5 border px-3 py-1.5 flex-col flex items-center rounded-lg h-fit w-fit text-sm">
                                        Selected
                                    </div> :
                                    <button className="h-fit" onClick={() => handleUpdate(projectItem.id)}>
                                        <ApproveButton icon="" message="Select" />
                                    </button>}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        )
    }
}

export default ModalSettingProject;