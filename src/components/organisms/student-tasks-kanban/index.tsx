import TaskDetailBox from "../../atoms/task-detail-box"

const StudentTasksKanban = () => {
    return (
        <div className="flex gap-5">
            <div className="w-1/4 p-2.5 rounded-lg bg-gray-50 border border-gray-200 text-xs flex flex-col gap-2">
                <div className="flex justify-between text-gray-600">
                    <div>To Do</div>
                    <div>2</div>
                </div>

                <TaskDetailBox
                    picture=""
                    status="High"
                    feature="Login module for example"
                    description="This is the task which is a small thing to do of a feature. Whenever all the tasks are done, the feature is done." />
            </div>

            <div className="w-1/4 p-2.5 rounded-lg bg-blue-50 border border-blue-200 text-xs flex flex-col gap-2">
                <div className="flex justify-between text-blue-600">
                    <div>Processing</div>
                    <div>2</div>
                </div>

                <TaskDetailBox
                    picture=""
                    status="High"
                    feature="Login module for example"
                    description="This is the task which is a small thing to do of a feature. Whenever all the tasks are done, the feature is done." />
            </div>

            <div className="w-1/4 p-2.5 rounded-lg bg-yellow-50 border border-yellow-200 text-xs flex flex-col gap-2">
                <div className="flex justify-between text-yellow-600">
                    <div>Verifing</div>
                    <div>2</div>
                </div>

                <TaskDetailBox
                    picture=""
                    status="High"
                    feature="Login module for example"
                    description="This is the task which is a small thing to do of a feature. Whenever all the tasks are done, the feature is done." />
            </div>

            <div className="w-1/4 p-2.5 rounded-lg bg-green-50 border border-green-200 text-xs flex flex-col gap-2">
                <div className="flex justify-between text-green-600">
                    <div>Done</div>
                    <div>2</div>
                </div>

                <TaskDetailBox
                    picture=""
                    status="High"
                    feature="Login module for example"
                    description="This is the task which is a small thing to do of a feature. Whenever all the tasks are done, the feature is done." />
            </div>
        </div>
    )
}

export default StudentTasksKanban