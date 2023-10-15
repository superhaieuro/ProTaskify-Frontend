const UserInfoTab = () => {
    const userInfo = JSON.parse(sessionStorage.getItem("userSession")!);

    return (
        <div className="border border-gray-200 w-full rounded-lg px-3 py-1.5 flex gap-1.5 items-center">
            <img className="w-8 h-8 rounded-full" src={userInfo.userInfo.picture}></img>
            <div className="w-fit">
                <div className="text-sm">{userInfo.userInfo.FullName}</div>
                <p className="text-xxs text-gray-600">{userInfo.userInfo.authorities[0].authority}</p>
            </div>
        </div>
    )
}

export default UserInfoTab;