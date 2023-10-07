import { NavLink } from "react-router-dom";
import MenuItem from "../../atoms/menu-item-box";
import MenuField from "../../molecules/menu-field";
import LogoutButton from "../../atoms/logout-button";

const LecturerAccountField = () => {
    return (
        <div>
            <MenuField
                title="Account"
                components={[
                    <>
                        <NavLink to={"notification"}>
                            <MenuItem icon="app_badging" message="Notification" />
                        </NavLink>

                        <LogoutButton />
                    </>
                ]}
            />
        </div>
    )
}

export default LecturerAccountField;