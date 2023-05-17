import { useEffect } from "react";
import { useNavigate } from "react-router-dom"
import { useLocalStorage } from "usehooks-ts";

const DevUserLogin = () => {
    const navigate = useNavigate();
    const [, setClassCode] = useLocalStorage("classCode", "dev");
    const [, setUser] = useLocalStorage("user", "Dev User");
    const [, setTeacher] = useLocalStorage("teacher", true);

    useEffect(() => {
        setClassCode("dev");
        setUser("Dev User");
        setTeacher(true);
        navigate("/");
    });

    return <></>
}

export default DevUserLogin;