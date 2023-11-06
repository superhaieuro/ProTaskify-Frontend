import { useEffect, useState } from "react";
import NormalButton from "../../atoms/normal-button";
import api from "../../../config/axios";
import StudentInformationBox from "../../atoms/student-information-box";
import ModalGroupSetting from "../../molecules/modal-group-setting";
import ModalSettingProject from "../../molecules/modal-setting-project";
import LeaderRoute from "../../../utils/leader-route";

type Student = {
    RollNumber: string;
    FullName: string;
    facebook: string;
    github: string;
    leader: boolean;
    picture: string;
    MemberCode: string;
    skills: string;
}

type Project = {
    id: string;
    name: string;
    problems: string;
    context: string;
    actors: string;
    functionalRequirements: string,
    nonFunctionalRequirements: string;
}

type Group = {
    id: string;
    name: string;
    project: Project;
    score: string;
    studentList: Student[];
}

const StudentTeamManage = () => {
    const [expand, setExpand] = useState(false);
    const [expandIcon, setExpandIcon] = useState("expand_more")
    const [group, setGroup] = useState<Group | null>(null);
    const [showGroupSettingModal, setShowGroupSettingModal] = useState(false);
    const [showTopicSettingModal, setShowTopicSettingModal] = useState(false);

    const handleExpand = () => {
        expand ? setExpand(false) : setExpand(true);
        expandIcon === "expand_more" ? setExpandIcon("expand_less") : setExpandIcon("expand_more");
    }

    useEffect(() => {
        try {
            const fetchUserData = async () => {
                const studentId = JSON.parse(sessionStorage.getItem("userSession")!).userInfo.RollNumber;
                const response = await api.get(`/api/v1/common/get-group?userId=${studentId}&role=STUDENT`);
                setGroup(response.data);
            }
            fetchUserData();
        } catch (error) {
            console.log(error);
        }
    }, [])

    return (
        <div className="flex gap-5 flex-col">
            <div className="border border-gray-200 rounded-lg p-5 flex flex-col gap-5">
                <div className="flex justify-between items-center">
                    <div>
                        <div className="text-xl font-bold">Group: {group?.name}</div>
                        <div className="text-gray-600 text-sm">Leader: {" "}
                            {
                                group?.studentList.find(student => student.leader === true)?.FullName
                            }</div>
                    </div>

                    <div className="flex gap-1.5">
                        {/* <NormalButton icon="add" message="Add more member" /> */}
                        <LeaderRoute>
                            <button onClick={() => setShowGroupSettingModal(true)}>
                                <NormalButton icon="page_info" message="Setting" />
                            </button>
                        </LeaderRoute>
                        <button onClick={handleExpand}>
                            <NormalButton icon={expandIcon} message="" />
                        </button>
                    </div>
                </div>

                {expand ?
                    <div className="flex flex-col gap-2 whitespace-pre-wrap">
                        <div className="flex items-center justify-between">
                            <div className="text-lg font-bold ">
                                Topic details
                            </div>

                            <LeaderRoute>
                                <button onClick={() => setShowTopicSettingModal(true)}>
                                    <NormalButton icon="" message="Change topic" />
                                </button>
                            </LeaderRoute>
                        </div>

                        {
                            group?.project ?
                                <>
                                    {group?.project.name ?
                                        <div className="text-sm">
                                            <div className="font-semibold">Subject name</div>
                                            <div className="text-gray-600">{group.project.name}</div>
                                        </div> : null}

                                    {group?.project.problems ?
                                        <div className="text-sm">
                                            <div className="font-semibold">Problems</div>
                                            <div className="text-gray-600">{group.project.problems}</div>
                                        </div> : null}


                                    {group?.project.context ?
                                        <div className="text-sm">
                                            <div className="font-semibold">Context</div>
                                            <div className="text-gray-600">{group.project.context}</div>
                                        </div> : null}


                                    {group?.project.actors ?
                                        <div className="text-sm">
                                            <div className="font-semibold">Actors</div>
                                            <div className="text-gray-600">{group.project.actors}</div>
                                        </div> : null}

                                    {group?.project.functionalRequirements ?
                                        <div className="text-sm">
                                            <div className="font-semibold">Functional requirements</div>
                                            <div className="text-gray-600">{group.project.functionalRequirements}</div>
                                        </div> : null}

                                    {group?.project.nonFunctionalRequirements ?
                                        <div className="text-sm">
                                            <div className="font-semibold">Non-Functional requirements</div>
                                            <div className="text-gray-600">{group.project.nonFunctionalRequirements}</div>
                                        </div> : null}</>
                                :
                                <div className="text-sm text-gray-600">No project is chosen.</div>
                        }
                    </div>
                    : null}
            </div>

            <div className="grid grid-cols-3 gap-5">
                {group?.studentList.sort((a: Student, b: Student) => Number(b.leader) - Number(a.leader)).map((student) => (
                    <StudentInformationBox student={student} />
                ))}
            </div>

            {group ?
                <ModalGroupSetting
                    isVisible={showGroupSettingModal}
                    onClose={() => setShowGroupSettingModal(false)}
                    name={group!.name}
                    studentList={group!.studentList} />
                : null}

            <ModalSettingProject
                isVisible={showTopicSettingModal}
                onClose={() => setShowTopicSettingModal(false)}
                currentProjectId={group?.project ? group?.project.id : "0"} />
        </div>
    )
}

export default StudentTeamManage;