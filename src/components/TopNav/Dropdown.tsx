import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "usehooks-ts";
import { FiLogOut } from "react-icons/fi";
import { IoPersonCircle } from "react-icons/io5";
import { FC } from "react";
import { AiOutlineProfile } from "react-icons/ai";

type DropdownProps = {
    changeAvatar: (classCode: string, user: string) => void;
    hideDropdown: () => void;
}

const Dropdown: FC<DropdownProps> = ({ changeAvatar, hideDropdown }) => {
    const [user, setUser] = useLocalStorage("user", "");
    const [classCode, setClassCode] = useLocalStorage("classCode", "");
    const [, setAvatar] = useLocalStorage("avatar", "");
    const navigate = useNavigate();

    const logout = () => {
        setUser("");
        setClassCode("");
        setAvatar("");
        navigate("/login");
    }

    const profile = () => {
        hideDropdown();
        navigate(`/profile/${user}`)
    }

    const clickChangeAvatar = () => {
        changeAvatar(classCode, user)
    }

    const liClass = "group text-xl text-white px-3 py-3 hover:bg-gray-300 hover:text-black flex justify-between items-center"

    return (
        <ul className="absolute top-12 right-0 bg-gray-500 w-52 cursor-pointer rounded-md shadow-xl flex flex-col overflow-hidden">
            <li className={liClass} onClick={clickChangeAvatar}>
                Change Avatar
                <IoPersonCircle className="w-7 h-7 fill-white group-hover:fill-gray-700" />
            </li>
            <li className={liClass} onClick={profile}>
                Profile
                <AiOutlineProfile className="w-6 h-6 stroke-white group-hover:stroke-gray-700" />
            </li>
            <li className={liClass} onClick={logout}>
                Logout
                <FiLogOut className="w-6 h-6 stroke-white group-hover:stroke-gray-700" />
            </li>
        </ul>
    )
}

export default Dropdown;