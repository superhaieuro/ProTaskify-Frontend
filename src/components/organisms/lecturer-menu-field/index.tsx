import { NavLink } from "react-router-dom";
import MenuItem from "../../atoms/menu-item-box";
import MenuField from "../../molecules/menu-field";

const LecturerMenuField = () => {
    return (
        <div>
            <MenuField
                title="Menu"
                components={[
                    <>
                        <NavLink to={"dashboard"}>
                            <MenuItem icon="grid_view" message="Dashboard" />
                        </NavLink>

                        <NavLink to={"classes"}>
                            <MenuItem icon="groups" message="Classes" />
                        </NavLink>
                    </>
                ]}
            />
        </div>
    )
}

export default LecturerMenuField;