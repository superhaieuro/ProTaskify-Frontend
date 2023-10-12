import HeaderTitle from "../../atoms/header-title";
import StudentTasksKanban from "../../organisms/student-tasks-kanban";

const StudentTasks = () => {
    return (
        <div className="flex flex-col gap-10">
            <HeaderTitle title="Tasks" subTitle="Manage your tasks here." />
            <StudentTasksKanban />
        </div>
    )
}

export default StudentTasks;