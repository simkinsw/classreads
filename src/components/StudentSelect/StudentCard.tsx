import { FC } from "react";
import { User } from "../../data/classData";
import Avatar from "../Avatar";

type StudentCardProps = {
    student: User;
    setUser: (user: User) => void;
}

const StudentCard: FC<StudentCardProps> = ({ student, setUser }) => {
    return (
        <div 
            className="bg-white shadow-md rounded-md flex items-center gap-2 lg:gap-3 px-4 py-6 cursor-pointer hover:bg-slate-200 hover:underline decoration-2" 
            onClick={() => setUser(student)}
        >
            <Avatar user={student.name} />
            <span className="text-xl font-fredoka">{student.name}</span>
        </div>
    )
}

export default StudentCard;