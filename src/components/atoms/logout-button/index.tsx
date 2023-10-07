import MenuItem from "../menu-item-box";

const LogoutButton = () => {
    return (
        <button
            className="w-full"
            onClick={() => {
                sessionStorage.clear();
                window.location.reload();
            }}>
            <MenuItem icon="logout" message="Logout" />
        </button>
    )
}

export default LogoutButton;