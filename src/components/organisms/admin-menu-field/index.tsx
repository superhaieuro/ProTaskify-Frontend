import { NavLink } from "react-router-dom";
import MenuItem from "../../atoms/menu-item-box";
import MenuField from "../../molecules/menu-field";
import LogoutButton from "../../atoms/logout-button";

const AdminMenuField = () => {
    return (
        <div>
            <MenuField
                title="Menu"
                components={[
                    <>
                        <NavLink to={"semesters"}>
                            <MenuItem icon="school" message="Semesters" />
                        </NavLink>

                        <NavLink to={"lecturers"}>
                            <MenuItem icon="badge" message="Lecturers" />
                        </NavLink>

                        <NavLink to={"projects"}>
                            <MenuItem icon="topic" message="Projects" />
                        </NavLink>

                        <LogoutButton />
                    </>
                ]}
            />
        </div>
    )
}

export default AdminMenuField;