import HeaderTitle from "../../atoms/header-title";

const LecturerDashboard = () => {
    return (
        <div>
            <HeaderTitle title="Welcome back" subTitle={JSON.parse(localStorage.getItem("userSession")!).userInfo.FullName} />
        </div>
    )
}

export default LecturerDashboard;