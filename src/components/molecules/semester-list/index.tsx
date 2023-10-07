import { FC } from "react";
import StatusBox from "../../atoms/status-box";
import LecturerClassesBox from "../../atoms/lecturer-classes-box";

type SemesterListProps = {
    semester: string;
}

type Semester = {
    name: string;
    startDate: Date;
    endDate: Date;
    classesList: Class[];
};

type Class = {
    id: number;
    name: string;
    studentList: any;
};

const SemesterList: FC<SemesterListProps> = ({ semester }) => {
    const semesterList: Semester[] = JSON.parse(semester);

    if (semesterList != null) {
        return (
            <div className="flex flex-col gap-10">
                {semesterList.map((semesterItem) => (
                    <div className="flex flex-col gap-5">
                        <div>
                            <div className="flex gap-1.5 items-center">
                                <div className="text-xl font-bold">{semesterItem.name}</div>
                                {
                                    new Date(semesterItem.endDate) > new Date() ?
                                        <StatusBox color="green" message="On-going" /> :
                                        <StatusBox color="gray" message="Finish" />
                                }
                            </div>

                            <div className="text-gray-600 flex gap-1.5 items-center">
                                <span className="material-symbols-rounded h-fit icon">calendar_today</span>
                                <div className="text-sm">
                                    {new Date(semesterItem.startDate).toLocaleDateString(undefined, {
                                        year: 'numeric',
                                        month: '2-digit',
                                        day: '2-digit'
                                    })}
                                    {" - "}
                                    {new Date(semesterItem.endDate).toLocaleDateString(undefined, {
                                        year: 'numeric',
                                        month: '2-digit',
                                        day: '2-digit'
                                    })}
                                </div>
                            </div>
                        </div>

                        <div>
                            <div className="flex gap-5 flex-wrap">
                                {semesterItem.classesList.map((classItem) => (
                                    <LecturerClassesBox
                                        name={classItem.name}
                                        numOfStudent={classItem.studentList.length}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        )
    }
}

export default SemesterList;