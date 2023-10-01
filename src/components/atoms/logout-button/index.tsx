import MenuItem from "../menu-item";

const LogoutButton = () => {
    return (
        <button
            className="w-full"
            onClick={() => {
                localStorage.clear();
                window.location.reload();
            }}>
            <MenuItem icon="logout" message="Logout" />
        </button>
    )
}

export default LogoutButton;