import { useState } from "react";
import TaskDetailBox from "../../atoms/task-detail-box"
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';


type taskType = {
    id: string;
    picture: string;
    status: string;
    priority: string;
    feature: string;
    date: Date;
    description: string;
}

const taskList: taskType[] = [
    {
        id: "1",
        picture: "",
        status: "Todo",
        priority: "High",
        feature: "Feature 1",
        date: new Date(),
        description: "This is the task which is a small thing to do"
    },

    {
        id: "2",
        picture: "",
        status: "Processing",
        priority: "Low",
        feature: "Feature 2",
        date: new Date(),
        description: "This is the task which is a small thing to do"
    },

    {
        id: "3",
        picture: "",
        status: "Verifing",
        priority: "High",
        feature: "Feature 3",
        date: new Date(),
        description: "This is the task which is a small thing to do"
    },

    {
        id: "4",
        picture: "",
        status: "Done",
        priority: "Medium",
        feature: "Feature 4",
        date: new Date(),
        description: "This is the task which is a small thing to do"
    },

    {
        id: "5",
        picture: "",
        status: "Done",
        priority: "Low",
        feature: "Feature 5",
        date: new Date(),
        description: "This is the task which is a small thing to do"
    },
]

const StudentTasksKanban = () => {
    const [tasks, setTasks] = useState(taskList);

    const handleDragEnd = (result: DropResult) => {
        const { source, destination } = result;
        if (!destination) return;

        const items = Array.from(tasks);
        const [newOrder] = items.splice(source.index, 1);
        items.splice(destination.index, 0, newOrder);

        setTasks(items);
    };

    return (
        <div className="flex gap-5">
            <DragDropContext onDragEnd={handleDragEnd}>
                <div className="w-1/4 p-2.5 rounded-lg bg-gray-50 border border-gray-200 text-xs">
                    <div className="flex justify-between text-gray-600">
                        <div>To Do</div>
                        <div>2</div>
                    </div>
                    <Droppable droppableId="todo">
                        {(provided) => (
                            <div {...provided.droppableProps} ref={provided.innerRef}>
                                {tasks.map(({ id, picture, priority, feature, date, description }, index) => {
                                    return (
                                        <Draggable key={id} draggableId={id} index={index}>
                                            {(provided) => (
                                                <div className="mt-2" ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}>
                                                    <TaskDetailBox
                                                        picture={picture}
                                                        status={priority}
                                                        feature={feature}
                                                        date={date}
                                                        description={description} />
                                                </div>
                                            )}
                                        </Draggable>
                                    );
                                })}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </div>
            </DragDropContext>

            {/* <div className="w-1/4 p-2.5 rounded-lg bg-blue-50 border border-blue-200 text-xs flex flex-col gap-2">
                <div className="flex justify-between text-blue-600">
                    <div>Processing</div>
                    <div>2</div>
                </div>

                <TaskDetailBox
                    picture=""
                    status="High"
                    feature="Login module for example"
                    date={new Date()}
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
                    date={new Date()}
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
                    date={new Date()}
                    description="This is the task which is a small thing to do of a feature. Whenever all the tasks are done, the feature is done." />
            </div> */}
        </div>
    )
}

export default StudentTasksKanban