import { useNavigate } from "react-router-dom";
import { useReadLocalStorage } from "usehooks-ts";
import Avatar from "../components/Avatar";
import { getStudentList } from "../data/classData";

const ProfileDefault = () => {
    const classCode = useReadLocalStorage<string>("classCode")!;
    const studentList = getStudentList(classCode);
    const navigate = useNavigate();

    const handleClick = (student: string) => {
        navigate(`/profile/${student}`)
    }

    return (
        <main className="pb-8 flex-1">
            <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 2xl:grid-cols-5 gap-x-4 lg:gap-x-6 gap-y-4 lg:gap-y-6">
                {
                    studentList.map((student) => {
                        const longName = student.length > 11;
                        return (
                            <div 
                                className="bg-white shadow-md rounded-md flex items-center gap-2 lg:gap-3 px-4 py-6 cursor-pointer hover:bg-slate-200 hover:underline decoration-2" 
                                onClick={() => handleClick(student)}
                            >
                                <Avatar user={student} />
                                <span className={"font-fredoka " + (longName ? "text-lg" : "text-xl")}>{student}</span>
                            </div>
                        )
                    })
                }
            </ul>
        </main>
    )
}

export default ProfileDefault;