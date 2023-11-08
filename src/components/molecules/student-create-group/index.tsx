import { useContext, useEffect, useState } from "react";
import InputText from "../../atoms/input-text";
import api from "../../../config/axios";
import ApproveButton from "../../atoms/approve-button";
import { ToastContext } from "../../../utils/toast-context";
import NotificationBox from "../../atoms/notification-box";
import RejectButton from "../../atoms/reject-button";
import ModalAlert from "../modal-alert";
import LeaderRoute from "../../../utils/leader-route";

type Class = {
    id: number;
    name: string;
    studentList: Student[];
    groupList: Group[];
};

type Student = {
    RollNumber: string;
    FullName: string;
    picture: string;
    MemberCode: string;
    status: boolean;
    leader: boolean;
}

type Group = {
    id: string;
    name: string;
    status: boolean;
    studentList: Student[];
}

const StudentCreateGroup = () => {
    const [inputName, setInputName] = useState("New group");
    const [classInfo, setClassInfo] = useState<Class | null>(null);
    const [groupId, setGroupId] = useState<string | null>(null);
    const [showModalAlert, setShowModalAlert] = useState(false);

    const [inputNameError, setInputNameError] = useState("");

    const userInfo = sessionStorage.getItem("userSession");

    const toast = useContext(ToastContext);

    const getClassDetail = () => {
        const fetchUserData = async () => {
            try {
                // For debug
                // console.log("is leader: " + sessionStorage.getItem("isLeader"));
                // console.log("is member: " + sessionStorage.getItem("isMember"));
                // console.log(JSON.parse(sessionStorage.getItem("isLeader") ?? "false"));
                // console.log("Session user: " + JSON.parse(userInfo!).userInfo.leader);

                // console.log("final: " + (JSON.parse(sessionStorage.getItem("isLeader") ?? "false") || JSON.parse(userInfo!).userInfo.leader));
                
                const response = await api.get(`/api/v1/student/get-class/${JSON.parse(userInfo!).userInfo.RollNumber}`);
                setClassInfo(response.data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchUserData();
    }

    useEffect(() => {
        if (JSON.parse(userInfo!).userInfo.leader || sessionStorage.getItem("ismember") == null && sessionStorage.getItem("isLeader") != null) {
            if (inputName.length >= 5 && inputName.length <= 50) {
                setInputNameError("");
                const fetchUserData = async () => {
                    try {
                        await api.put(`/api/v1/student/update-group-info/${JSON.parse(userInfo!).userInfo.RollNumber}/${JSON.parse(userInfo!).userInfo.RollNumber}/${inputName}`);
                    } catch (error) {
                        console.log(error);
                    }
                }
                fetchUserData();
            } else {
                setInputNameError("Name must be from 5 to 50 characters.");
            }
        }
    }, [inputName])

    useEffect(() => {
        if (classInfo) {
            let groupInfo = classInfo?.groupList.find(group => group.studentList.some(st => st.RollNumber === JSON.parse(userInfo!).userInfo.RollNumber));
            if (groupInfo == null && sessionStorage.getItem("isLeader") == null) {
                const updatedUserInfo = {
                    ...JSON.parse(userInfo!),
                    inGroup: false,
                    groupStatus: false
                }
                sessionStorage.setItem("userSession", JSON.stringify(updatedUserInfo));
                window.location.reload();
            } else {
                if (groupInfo?.status) {
                    const updatedUserInfo = {
                        ...JSON.parse(userInfo!),
                        inGroup: true,
                        groupStatus: true
                    }
                    sessionStorage.setItem("userSession", JSON.stringify(updatedUserInfo));
                    window.location.reload();
                }
                let grId = null;
                grId = groupInfo?.id;
                // grId = classInfo?.groupList.find(group => group.studentList.some(st => st.RollNumber === JSON.parse(userInfo!).userInfo.RollNumber))?.id;
                if (grId != null) {
                    setGroupId(grId);
                    let grName = classInfo?.groupList.find(group => group.studentList.some(st => st.RollNumber === JSON.parse(userInfo!).userInfo.RollNumber))?.name;
                    if (grName != null) {
                        setInputName(grName);
                    }
                } else {
                    const fetchUserData = async () => {
                        try {
                            const request = {
                                name: inputName,
                                status: false
                            }
                            const response = await api.post(`/api/v1/student/create-group/${JSON.parse(userInfo!).userInfo.RollNumber}`, request);
                            if (response.status === 200) {
                                sessionStorage.setItem("isLeader", "true");
                                getClassDetail();
                            }
                        } catch (error) {
                            console.log(error);
                        }
                    }
                    fetchUserData();
                }
            }
        }
    }, [classInfo])

    const outGroup = (studentId: string) => {
        const fetchUserData = async () => {
            try {
                const response = await api.put(`/api/v1/student/out-group/${studentId}`);
                if (response.status === 200) {
                    if (sessionStorage.getItem("isMember") != null) {
                        const updatedUserInfo = {
                            ...JSON.parse(userInfo!),
                            inGroup: false,
                            groupStatus: false
                        }
                        sessionStorage.removeItem("isMember");
                        sessionStorage.setItem("userSession", JSON.stringify(updatedUserInfo));
                        window.location.reload();
                    } else {
                        getClassDetail();
                    }
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchUserData();
    }

    const createGroup = () => {
        const fetchUserData = async () => {
            try {
                const response = await api.put(`/api/v1/student/create-group/${groupId}`);
                if (response.status === 200) {
                    const updatedUserInfo = {
                        ...JSON.parse(userInfo!),
                        inGroup: true,
                        groupStatus: true,
                    }
                    sessionStorage.setItem("userSession", JSON.stringify(updatedUserInfo));
                    window.location.reload();
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchUserData();
    }

    const invite = (studentId: string) => {
        const fetchUserData = async () => {
            try {
                const request = {
                    date: new Date(),
                    status: false
                }
                const response = await api.post(`/api/v1/student/invite/${groupId}/${studentId}`, request);
                if (response.status === 200) {
                    if (JSON.parse(response.data)) {
                        toast?.setSuccessMessage("Invite friend successfully!")
                    } else {
                        toast?.setErrorMessage("Friend have been invited!")
                    }
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchUserData();
    }

    useEffect(() => {
        getClassDetail();
    }, []);

    const handleDelete = () => {
        const fetchUserData = async () => {
            try {
                const response = await api.delete(`/api/v1/student/delete-group/${groupId}/${classInfo?.id}`);
                if (response.status === 200) {
                    const updatedUserInfo = {
                        ...JSON.parse(userInfo!),
                        inGroup: false
                    }
                    sessionStorage.setItem("userSession", JSON.stringify(updatedUserInfo));
                    window.location.reload();
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchUserData();
    }

    return (
        <div className="h-screen p-5 flex justify-center">
            <div className="flex flex-col gap-5 h-fit max-h-full w-1/3">
                <div className="flex flex-col gap-5 p-5 border border-gray-200 rounded-lg h-full overflow-auto">
                    <div className="flex justify-between items-start">
                        <div>
                            <div className="text-2xl font-bold">Create new group</div>
                            <div className="text-base font-bold text-gray-600">{classInfo?.name}</div>
                        </div>

                        <div className="flex gap-2">
                            <LeaderRoute>
                                {classInfo?.groupList.find(gr => gr.id == groupId)?.studentList.length! < 4 || classInfo?.groupList.find(gr => gr.id == groupId)?.studentList.length! > 6 ? null :
                                    <button onClick={createGroup}>
                                        <ApproveButton icon="" message="Create" />
                                    </button>}
                            </LeaderRoute>

                            <button onClick={() => {
                                sessionStorage.clear();
                                window.location.reload();
                            }}>
                                <RejectButton icon="logout" message="" />
                            </button>

                            {sessionStorage.getItem("isMember") != null ?
                                <button onClick={() => {
                                    outGroup(JSON.parse(userInfo!).userInfo.RollNumber);
                                }}>
                                    <RejectButton icon="" message="Leave" />
                                </button>
                                :
                                <button onClick={() => { setShowModalAlert(true) }}>
                                    <RejectButton icon="delete" message="" />
                                </button>
                            }

                        </div>

                        <ModalAlert
                            isVisible={showModalAlert}
                            onClose={() => setShowModalAlert(false)} type={"warning"}
                            title="Warning"
                            description="Are you sure you want to delete this group?"
                            button={
                                <button onClick={handleDelete}>
                                    <RejectButton icon="" message="Delete" />
                                </button>
                            } />
                    </div>

                    <div className="w-full">
                        <InputText title="Group name" placeholder="" value={inputName} readonly={!(JSON.parse(sessionStorage.getItem("isLeader") ?? "false") || JSON.parse(userInfo!).userInfo.leader)} onChange={(e) => setInputName(e.target.value)} error={inputNameError} />
                    </div>

                    <div className="flex flex-col gap-y-2">
                        <div className="text-sm font-semibold flex gap-1.5 items-center">
                            Current members
                            <span role="button" onClick={getClassDetail} className="material-symbols-rounded h-fit icon text-gray-600 hover:text-black">refresh</span>
                        </div>
                        {classInfo?.groupList.find(gr => gr.id == groupId)?.studentList.map((student) => (
                            <div className="flex gap-1.5 text-sm text-gray-600">{student.FullName}
                                {student.leader ?
                                    <div className="text-xs font-bold text-yellow-600 flex items-center gap-0.5">
                                        <span className="material-symbols-rounded icon">
                                            stars
                                        </span>
                                        {/* <p>LEADER</p> */}
                                    </div>
                                    :
                                    null
                                }

                                {student.leader ?
                                    null
                                    :
                                    <LeaderRoute>
                                        <span onClick={() => outGroup(student.RollNumber)} role="button" className="material-symbols-rounded h-fit icon text-white hover:text-red-600">do_not_disturb_on</span>
                                    </LeaderRoute>
                                }
                            </div>
                        ))}
                    </div>

                    <LeaderRoute>
                        {classInfo?.groupList.find(gr => gr.id == groupId)?.studentList.length! < 6 ?
                            <div className="flex flex-col gap-y-2 overflow-auto">
                                <div className="text-sm font-semibold">Student list</div>

                                <div className="border border-gray-200 rounded-lg h-full flex flex-col overflow-auto text-sm">
                                    <div className="p-5 bg-gray-50 flex gap-x-5 border-b border-gray-200 font-semibold text-gray-600">
                                        <div className="w-28">Roll Number</div>
                                        <div className="w-52">Full Name</div>
                                    </div>
                                    <div className="max-h-full overflow-y-auto divide-y">
                                        {classInfo?.studentList.filter(student => (
                                            classInfo.groupList.every(group => (
                                                !group.studentList.some(st => st.RollNumber === student.RollNumber)
                                            )))).map((student, index) =>
                                                student.RollNumber !== JSON.parse(userInfo!).userInfo.RollNumber ?
                                                    <div key={index} className="p-5 flex gap-x-5 items-center">
                                                        {/* <div className="w-10">{index + 1}</div> */}
                                                        <div className="w-28">{student.RollNumber}</div>
                                                        <div className="w-52 mr-auto">{student.FullName}</div>
                                                        <button onClick={() => invite(student.RollNumber)}>
                                                            <ApproveButton icon="" message="Invite" />
                                                        </button>
                                                    </div> : null
                                            )}
                                    </div>
                                </div>
                            </div> :
                            <NotificationBox icon="lightbulb" message="You group has reached the requirement number of members (4 - 6 members)." style="text-blue-600 border-blue-200 bg-blue-50" />}
                    </LeaderRoute>
                </div>
            </div>
        </div>
    )
}

export default StudentCreateGroup;