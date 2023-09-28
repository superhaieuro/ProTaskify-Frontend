const UserInfoTab = () => {
    const userInfo = JSON.parse(localStorage.getItem("userSession")!);

    return (
        <div className="border border-gray-200 w-full rounded-lg px-3 py-1.5 flex gap-1.5 items-center">
            <img className="w-8 h-8 rounded-full" 
            src={userInfo.userInfo.picture}></img>
            <div className="w-fit">
                <div className="text-sm">{userInfo.userInfo.name}</div>
                <p className="text-xs text-gray-600">{userInfo.role}</p>
            </div>
        </div>
    )
}

export default UserInfoTab;