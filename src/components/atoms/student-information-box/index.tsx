import { FC } from "react";

type StudentInformationBoxProps = {
    student: Student;
}

type Student = {
    RollNumber: string;
    FullName: string;
    facebook: string;
    github: string;
    leader: boolean;
    picture: string;
    MemberCode: string;
    skills: string;
}

const StudentInformationBox: FC<StudentInformationBoxProps> = ({ student }) => {
    return (
        <div className="w-full p-5 h-full flex flex-col items-center gap-5 border border-gray-200 rounded-lg">
            <div className="flex gap-5 items-center">
                <img className="w-20 h-20 rounded-full" src={student.picture}></img>
                <div>
                    {student.leader ?
                        <div className="text-xs font-bold text-yellow-600 flex items-center gap-0.5">
                            <span className="material-symbols-rounded icon">
                                stars
                            </span>
                            <p>LEADER</p>
                        </div>
                        :
                        <div className="text-xs font-bold text-blue-600">MEMBER</div>
                    }
                    <div className="text-2xl font-bold">{student.FullName}</div>
                    <div className="text-base text-gray-600">{student.MemberCode}</div>
                </div>
            </div>

            <div className="w-full text-sm">
                <div className="font-semibold">Skills</div>
                <div className="text-gray-600">
                    {student.skills != null && student.skills !== "" ?
                        student.skills : "No skill"}
                </div>
            </div>

            <div className="w-full h-full justify-end text-sm flex flex-col gap-1.5">
                <div className="font-semibold">Contact</div>
                <div className="flex gap-2 items-center">
                    {student.facebook != null && student.facebook !== "" ?
                        <a href={student.facebook} target="_blank">
                            <div className="border border-blue-200 text-blue-600 px-1.5 text-xs rounded hover:bg-blue-50">Facebook</div>
                        </a>
                        :
                        <div className="border border-blue-200 text-blue-200 px-1.5 text-xs rounded">Facebook</div>
                    }

                    {student.github != null && student.github !== "" ?
                        <a href={student.github} target="_blank">
                            <div className="border border-gray-200 text-black px-1.5 text-xs rounded hover:bg-gray-50">GitHub</div>
                        </a>
                        :
                        <div className="border border-gray-200 text-gray-200 px-1.5 text-xs rounded">GitHub</div>

                    }
                </div>
            </div>
        </div>
    )
}

export default StudentInformationBox;