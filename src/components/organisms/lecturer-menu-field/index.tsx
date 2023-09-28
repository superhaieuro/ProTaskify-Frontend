import { NavLink } from "react-router-dom";
import MenuItem from "../../atoms/menu-item";
import MenuField from "../../molecules/menu-field";

const LecturerMenuField = () => {
    return (
        <div>
            <MenuField
                title="Menu"
                components={[
                    <>
                        <NavLink to={"dashboard"}>
                            <MenuItem icon="line_axis" message="Dashboard" />
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