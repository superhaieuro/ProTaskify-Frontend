import { NavLink } from "react-router-dom";
import MenuItem from "../../atoms/menu-item-box";
import MenuField from "../../molecules/menu-field";

const StudentMenuField = () => {
    return (
        <div>
            <MenuField
                title="Menu"
                components={[
                    <>
                        <NavLink to={"timeline"}>
                            <MenuItem icon="view_timeline" message="Timeline" />
                        </NavLink>

                        <NavLink to={"backlog"}>
                            <MenuItem icon="grid_view" message="Backlog" />
                        </NavLink>

                        <NavLink to={"tasks"}>
                            <MenuItem icon="task" message="Tasks" />
                        </NavLink>

                        <NavLink to={"team"}>
                            <MenuItem icon="group" message="Team" />
                        </NavLink>
                    </>
                ]}
            />
        </div>
    )
}

export default StudentMenuField;