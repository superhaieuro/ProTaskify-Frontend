import { Navigate } from "react-router-dom";
import RejectButton from "../../atoms/reject-button";
import ApproveButton from "../../atoms/approve-button";
import StudentCreateGroup from "../../molecules/student-create-group";
import { useContext, useEffect, useState } from "react";
import api from "../../../config/axios";
import { ToastContext } from "../../../utils/toast-context";

type Invitation = {
    id: string;
    date: Date;
    status: boolean;
    group: Group;
}

type Group = {
    name: string;
}

const StudentWelcome = () => {
    const userInfo = sessionStorage.getItem("userSession");
    const [inviteList, setInviteList] = useState<Invitation[]>([]);

    const toast = useContext(ToastContext);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await api.get(`/api/v1/student/get-invite/${JSON.parse(userInfo!).userInfo.RollNumber}`);
                if (response.status === 200) {
                    setInviteList(response.data);
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchUserData();
    }, [])

    const handleAccept = (invitationId: string) => {
        const fetchUserData = async () => {
            try {
                const response = await api.put(`/api/v1/student/accept-invitation/${invitationId}/${JSON.parse(userInfo!).userInfo.RollNumber}`);
                if (response.status === 200) {
                    if (JSON.parse(response.data)) {
                        const updatedUserInfo = {
                            ...JSON.parse(userInfo!),
                            inGroup: true,
                        }
                        sessionStorage.setItem("userSession", JSON.stringify(updatedUserInfo));
                        sessionStorage.setItem("isMember", "true");
                        sessionStorage.removeItem("isLeader");
                        window.location.reload();
                    } else {
                        toast?.setErrorMessage("Group is full!")
                    }
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchUserData();
    }

    const handleDecline = (invitationId: string) => {
        const fetchUserData = async () => {
            try {
                const response = await api.delete(`/api/v1/student/delete-invitation/${invitationId}`);
                if (response.status === 200) {
                    window.location.reload();
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchUserData();
    }

    if (userInfo != null && JSON.parse(userInfo).groupStatus !== true || userInfo != null && JSON.parse(userInfo).inGroup !== true) {
        return (
            <>
                {JSON.parse(userInfo).groupStatus === false && JSON.parse(userInfo).inGroup === true ?
                    <StudentCreateGroup /> :
                    <div className="flex h-screen w-full justify-center items-center">
                        <div className="flex flex-col items-center gap-5">
                            <div className="text-center w-fit h-fit">
                                {/* <div className="text-3xl font-bold">Oops! You are not in any groups</div> */}
                                <div className="text-3xl font-bold">Welcome! {JSON.parse(userInfo).userInfo.FullName}</div>
                                <div className="text-base text-gray-600">Wait for your friends to invite or create a new group.</div>
                            </div>

                            <div className="flex gap-2">
                                <button onClick={() => {
                                    const updatedUserInfo = {
                                        ...JSON.parse(userInfo),
                                        inGroup: true
                                    }
                                    sessionStorage.setItem("userSession", JSON.stringify(updatedUserInfo));
                                    sessionStorage.setItem("isLeader", "true");
                                    window.location.reload();
                                }}>
                                    <ApproveButton icon="add" message="Create new group" />
                                </button>

                                <button onClick={() => {
                                    sessionStorage.clear();
                                    window.location.reload();
                                }}>
                                    <RejectButton icon="logout" message="Logout" />
                                </button>
                            </div>

                            {inviteList.length != 0 ?
                                <div className="text-sm flex flex-col gap-2">
                                    {inviteList.map((inviteItem) => (
                                        <div className="text-center">
                                            <span className="font-semibold">{inviteItem.group.name}</span>
                                            <span> invited you to join them. </span>
                                            <span onClick={() => handleAccept(inviteItem.id)} role="button" className="underline text-blue-600 hover:text-blue-700 active:text-blue-800">Accept</span>
                                            <span> or </span>
                                            <span onClick={() => handleDecline(inviteItem.id)} role="button" className="underline text-red-600 hover:text-red-700 active:text-red-800">Decline</span>
                                        </div>
                                    ))}
                                </div>
                                : null}
                        </div>
                    </div >
                }
            </>
        )
    } else {
        return <Navigate to={"/"} replace={true} />;
    }
}

export default StudentWelcome;