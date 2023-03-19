import { FC } from "react"
import { AiOutlineArrowLeft } from "react-icons/ai";
import classData, { User } from "../../data/classData";
import StudentCard from "./StudentCard";

type StudentSelectProps = {
    setUser: (user: User) => void;
    resetClassCode: () => void;
    classCode: string;
}

const StudentSelect: FC<StudentSelectProps> = ({ resetClassCode, setUser, classCode }) => {
    const studentList = classData.get(classCode)!;

    const divClass = classCode.includes("teacher") ? "pt-2 lg:mx-16 2xl:mx-24 grid grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-x-4 lg:gap-x-6 gap-y-8"
        : "pt-2 lg:mx-16 2xl:mx-24 grid grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-x-4 lg:gap-x-6 gap-y-8"

    return (
        <>
        <div 
            onClick={resetClassCode}
            className="pt-32 lg:mx-16 2xl:mx-24 flex items-center gap-1.5 cursor-pointer hover:underline decoration-blue-500"
        >
            <AiOutlineArrowLeft className="w-5 h-5 fill-blue-500" />
            <span className="text-blue-500 text-xl">
                Go Back
            </span>
        </div>
        <div className={divClass}>
            {
                studentList.map((student) => {
                    return (
                        <StudentCard 
                            key={student.name} 
                            student={student} 
                            setUser={setUser} />
                    )
                })
            }
        </div>
        </>
    )
}

export default StudentSelect;