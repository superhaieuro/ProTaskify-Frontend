import MenuItem from "../menu-item";

const LogoutButton = () => {
    return (
        <button
            className="w-full"
            onClick={() => {
                localStorage.removeItem("userSession");
                window.location.reload();
            }}>
            <MenuItem icon="logout" message="Logout" />
        </button>
    )
}

export default LogoutButton;