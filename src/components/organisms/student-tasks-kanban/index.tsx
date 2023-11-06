import { useEffect, useState } from "react";
import TaskDetailBox from "../../atoms/task-detail-box"
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import api from "../../../config/axios";
import ModalTaskInformation from "../../molecules/modal-task-information";


type Feature = {
    id: string,
    name: string,
    description: string,
    status: boolean,
    startDate: Date,
    endDate: Date
    taskList: Tasks[]
}

type Tasks = {
    id: string,
    name: string,
    status: string,
    feedback: string,
    priority: string,
    description: string,
    createDate: Date,
    finishDate: Date,
    taskIndex: number,
    feature: Feature,
    student: Student
}

type Student = {
    RollNumber: string;
    FullName: string;
    picture: string;
}

const StudentTasksKanban = () => {
    const [featureList, setFeatureList] = useState<Feature[]>([]);
    const [taskList, setTaskList] = useState<Tasks[]>([]);

    const [todoList, setTodoList] = useState<Tasks[]>([]);
    const [inProgressList, setInProgressList] = useState<Tasks[]>([]);
    const [verifyingList, setVerifyingList] = useState<Tasks[]>([]);
    const [doneList, setDoneList] = useState<Tasks[]>([]);

    const [tempFeature, setTempFeature] = useState<Feature | undefined>();
    const [tempTask, setTempTask] = useState<Tasks | undefined>();

    const [showTaskInformationModal, setShowTaskInformationModal] = useState(false);

    const [showAssignToMeTasks, setShowAssignToMeTasks] = useState(false);

    const userId = JSON.parse(sessionStorage.getItem("userSession")!).userInfo.RollNumber;

    const filteredTaskList = showAssignToMeTasks
        ? taskList.filter(taskItem => taskItem.student.RollNumber === userId)
        : taskList;

    useEffect(() => {
        try {
            const fetchUserData = async () => {
                const studentId = JSON.parse(sessionStorage.getItem("userSession")!).userInfo.RollNumber;
                const featureData = await api.get(`/api/v1/common/view-features?userId=${studentId}&role=STUDENT`);
                const taskData = await api.get(`/api/v1/common/view-all-task-of-group?userId=${studentId}&role=STUDENT`);
                setFeatureList(JSON.parse(JSON.stringify(featureData.data)));
                setTaskList(JSON.parse(JSON.stringify(taskData.data)));
            }
            fetchUserData();
        } catch (error) {
            console.log(error);
        }
    }, [])

    useEffect(() => {
        setTodoList(filteredTaskList.filter(task => task.status === "To do").sort((a, b) => { return a.taskIndex - b.taskIndex }));
        setInProgressList(filteredTaskList.filter(task => task.status === "In progress").sort((a, b) => { return a.taskIndex - b.taskIndex }));
        setVerifyingList(filteredTaskList.filter(task => task.status === "Verifying").sort((a, b) => { return a.taskIndex - b.taskIndex }));
        setDoneList(filteredTaskList.filter(task => task.status === "Done").sort((a, b) => { return a.taskIndex - b.taskIndex }));
    }, [taskList, showAssignToMeTasks]);

    const reorderOneList = (srcIndex: number, desIndex: number, [...Task], draggedTask: Tasks) => {
        const items = Array.from([...Task]);
        items.splice(srcIndex, 1);
        items.splice(desIndex, 0, draggedTask);
        return items;
    }

    const reorderMultipleList = (srcIndex: number, desIndex: number, srcStatus: string, desStatus: string, draggedTask: Tasks) => {
        let sourceList: Tasks[] = [];
        let destinationList: Tasks[] = [];

        if (srcStatus === "To do") {
            sourceList = [...todoList];
        } else if (srcStatus === "In progress") {
            sourceList = [...inProgressList];
        } else if (srcStatus === "Verifying") {
            sourceList = [...verifyingList];
        } else if (srcStatus === "Done") {
            sourceList = [...doneList];
        }

        if (desStatus === "To do") {
            destinationList = [...todoList];
        } else if (desStatus === "In progress") {
            destinationList = [...inProgressList];
        } else if (desStatus === "Verifying") {
            destinationList = [...verifyingList];
        } else if (desStatus === "Done") {
            destinationList = [...doneList];
        }

        sourceList.splice(srcIndex, 1);
        destinationList.splice(desIndex, 0, draggedTask);

        if (srcStatus === "To do") {
            setTodoList([...sourceList]);
        } else if (srcStatus === "In progress") {
            setInProgressList([...sourceList]);
        } else if (srcStatus === "Verifying") {
            setVerifyingList([...sourceList]);
        } else if (srcStatus === "Done") {
            setDoneList([...sourceList]);
        }

        if (desStatus === "To do") {
            setTodoList([...destinationList]);
        } else if (desStatus === "In progress") {
            setInProgressList([...destinationList]);
        } else if (desStatus === "Verifying") {
            setVerifyingList([...destinationList]);
        } else if (desStatus === "Done") {
            setDoneList([...destinationList]);
        }
    };

    const handleDragEnd = (result: DropResult) => {
        const { source, destination, draggableId } = result;
        if (!destination) return;

        const draggedTask = taskList.find(task => task.id == draggableId);
        draggedTask!.taskIndex = destination.index;
        draggedTask!.status = destination.droppableId;

        if (source.droppableId === destination.droppableId) {
            if (source.droppableId === "To do") {
                setTodoList(reorderOneList(source.index, destination.index, Array.from(todoList), draggedTask!));
            } else if (source.droppableId === "In progress") {
                setInProgressList(reorderOneList(source.index, destination.index, Array.from(inProgressList), draggedTask!));
            } else if (source.droppableId === "Verifying") {
                setVerifyingList(reorderOneList(source.index, destination.index, Array.from(verifyingList), draggedTask!));
            } else if (source.droppableId === "Done") {
                setDoneList(reorderOneList(source.index, destination.index, Array.from(doneList), draggedTask!));
            }
        } else {
            reorderMultipleList(source.index, destination.index, source.droppableId, destination.droppableId, draggedTask!);
        }


        try {
            const request = {
                id: draggedTask?.id,
                name: draggedTask?.name,
                description: draggedTask?.description,
                status: draggedTask?.status,
                priority: draggedTask?.priority,
                taskIndex: draggedTask!.taskIndex + 1
            }
            const fetchUserData = async () => {
                api.put(`/api/v1/student/update-task/${draggedTask?.student.RollNumber.trim()}/${featureList.find(feature =>
                    feature.taskList.some(task => task.id === draggedTask?.id))?.id ?? 0}`, request)
            }
            fetchUserData();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <div className="border border-gray-200 rounded-lg text-gray-600 text-xs p-2.5 bg-gray-50 mb-5 flex justify-end items-center gap-1.5 w-fit ml-auto">
                <input
                    type="checkbox"
                    id="filter"
                    name="filter"
                    value="assignToMe"
                    checked={showAssignToMeTasks}
                    onChange={() => setShowAssignToMeTasks(!showAssignToMeTasks)}
                /> Assign to me
            </div>

            <div className="flex gap-5">
                <DragDropContext onDragEnd={handleDragEnd}>
                    <Droppable droppableId="To do">
                        {(provided) => (
                            <div className="w-1/4 p-2.5 rounded-lg bg-gray-50 border border-gray-200 text-xs" {...provided.droppableProps} ref={provided.innerRef}>
                                <div className="flex justify-between text-gray-600">
                                    <div>To do</div>
                                    <div>{todoList.length}</div>
                                </div>
                                {todoList.map((taskItem, index) => {
                                    return (
                                        <Draggable key={taskItem.id} draggableId={String(taskItem.id)} index={index}>
                                            {(provided) => (
                                                <div className="mt-2 w-full" ref={provided.innerRef} onClick={() => {
                                                    setShowTaskInformationModal(true)
                                                    setTempTask(taskItem);
                                                    setTempFeature(featureList.find(feature =>
                                                        feature.taskList.some(task => task.id === taskItem.id)));
                                                }}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}>
                                                    <TaskDetailBox
                                                        picture={taskItem.student.picture}
                                                        status={taskItem.priority}
                                                        feature={featureList.find(feature =>
                                                            feature.taskList.some(task => task.id === taskItem.id))?.name ?? "No feature"}
                                                        date={featureList.find(feature =>
                                                            feature.taskList.some(task => task.id === taskItem.id))?.endDate ?? null}
                                                        title={taskItem.name} />
                                                </div>
                                            )}
                                        </Draggable>
                                    );
                                })}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>

                    <Droppable droppableId="In progress">
                        {(provided) => (
                            <div className="w-1/4 p-2.5 rounded-lg bg-blue-50 border border-blue-200 text-xs" {...provided.droppableProps} ref={provided.innerRef}>
                                <div className="flex justify-between text-blue-600">
                                    <div>In progress</div>
                                    <div>{inProgressList.length}</div>
                                </div>
                                {inProgressList.map((taskItem, index) => {
                                    return (
                                        <Draggable key={taskItem.id} draggableId={String(taskItem.id)} index={index}>
                                            {(provided) => (
                                                <div className="mt-2 w-full" ref={provided.innerRef} onClick={() => {
                                                    setShowTaskInformationModal(true)
                                                    setTempTask(taskItem);
                                                    setTempFeature(featureList.find(feature =>
                                                        feature.taskList.some(task => task.id === taskItem.id)));
                                                }}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}>
                                                    <TaskDetailBox
                                                        picture={taskItem.student.picture}
                                                        status={taskItem.priority}
                                                        feature={featureList.find(feature =>
                                                            feature.taskList.some(task => task.id === taskItem.id))?.name ?? "No feature"}
                                                        date={featureList.find(feature =>
                                                            feature.taskList.some(task => task.id === taskItem.id))?.endDate ?? null}
                                                        title={taskItem.name} />
                                                </div>
                                            )}
                                        </Draggable>
                                    );
                                })}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>

                    <Droppable droppableId="Verifying">
                        {(provided) => (
                            <div className="w-1/4 p-2.5 rounded-lg bg-yellow-50 border border-yellow-200 text-xs" {...provided.droppableProps} ref={provided.innerRef}>
                                <div className="flex justify-between text-yellow-600">
                                    <div>Verifying</div>
                                    <div>{verifyingList.length}</div>
                                </div>
                                {verifyingList.map((taskItem, index) => {
                                    return (
                                        <Draggable key={taskItem.id} draggableId={String(taskItem.id)} index={index}>
                                            {(provided) => (
                                                <div className="mt-2 w-full" ref={provided.innerRef} onClick={() => {
                                                    setShowTaskInformationModal(true)
                                                    setTempTask(taskItem);
                                                    setTempFeature(featureList.find(feature =>
                                                        feature.taskList.some(task => task.id === taskItem.id)));
                                                }}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}>
                                                    <TaskDetailBox
                                                        picture={taskItem.student.picture}
                                                        status={taskItem.priority}
                                                        feature={featureList.find(feature =>
                                                            feature.taskList.some(task => task.id === taskItem.id))?.name ?? "No feature"}
                                                        date={featureList.find(feature =>
                                                            feature.taskList.some(task => task.id === taskItem.id))?.endDate ?? null}
                                                        title={taskItem.name} />
                                                </div>
                                            )}
                                        </Draggable>
                                    );
                                })}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>

                    <div className="w-1/4 p-2.5 rounded-lg bg-green-50 border border-green-200 text-xs">
                        <div className="flex justify-between text-green-600">
                            <div>Done</div>
                            <div>{doneList.length}</div>
                        </div>
                        {doneList.map((taskItem) => (
                            <div role="button" className="mt-2 w-full" onClick={() => {
                                setShowTaskInformationModal(true)
                                setTempTask(taskItem);
                                setTempFeature(featureList.find(feature =>
                                    feature.taskList.some(task => task.id === taskItem.id)));
                            }} >
                                <TaskDetailBox
                                    picture={taskItem.student.picture}
                                    status={taskItem.priority}
                                    feature={featureList.find(feature =>
                                        feature.taskList.some(task => task.id === taskItem.id))?.name ?? "No feature"}
                                    date={featureList.find(feature =>
                                        feature.taskList.some(task => task.id === taskItem.id))?.endDate ?? null}
                                    title={taskItem.name} />
                            </div>
                        ))}
                    </div>
                </DragDropContext>

                <ModalTaskInformation
                    isVisible={showTaskInformationModal}
                    onClose={() => setShowTaskInformationModal(false)}
                    task={tempTask}
                    feature={tempFeature} />
            </div>
        </div>
    )
}

export default StudentTasksKanban