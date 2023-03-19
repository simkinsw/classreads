import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "usehooks-ts";
import ClassCodeSelect from "../components/ClassCodeSelect";
import StudentSelect from "../components/StudentSelect";
import TopNav from "../components/TopNav";
import { User } from "../data/classData";

const Login = () => {
    const [classCode, setClassCode] = useLocalStorage("classCode", "");
    const [user, setUser] = useLocalStorage("user", "");
    const [, setTeacher] = useLocalStorage("teacher", false)
    const navigate = useNavigate();

    const login = (user: User) => {
        setUser(user.name);
        setTeacher(user.type === "teacher");
        setClassCode(classCode.replace("teacher", ""))
    }

    useEffect(() => {
        if(classCode && user) {
            navigate("/")
        }
    }); 

    return (
        <>
        <TopNav fullNav={false} />
        <div className="bg-gray-100 min-h-screen w-full">
            <main className="container mx-auto">
                {
                    !classCode ?
                    <ClassCodeSelect setCode={(code: string) => setClassCode(code)} />
                    : <StudentSelect classCode={classCode} setUser={login} resetClassCode={() => setClassCode("")} />
                }
            </main>
        </div>
        </>
    )
}

export default Login;