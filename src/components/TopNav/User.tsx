import { useRef, useState } from "react";
import { useReadLocalStorage } from "usehooks-ts";
import Avatar from "../Avatar";
import AvatarSelectModal from "./AvatarSelectModal";
import Dropdown from "./Dropdown";
import useOutsideAlerter from "../../hooks/useOutsideAlerter";


const User = () => {
    const user = useReadLocalStorage<string>("user")!;
    const classCode = useReadLocalStorage<string>("classCode")!;
    const [showDropdown, setShowDropdown] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef, () => setShowDropdown(false));

    const handleChangeAvatar = () => {
        setModalVisible(true);
        setShowDropdown(false);
    }

    return (
        <div className="relative ml-auto" ref={wrapperRef} >
            <div 
                className="flex justify-end items-center gap-3 text-2xl cursor-pointer"
                onClick={() => setShowDropdown(!showDropdown)}
            >
                <span className="hidden sm:inline-block">
                    {user}
                </span>
                <Avatar user={user} /> 
            </div>
            {showDropdown && <Dropdown changeAvatar={handleChangeAvatar} hideDropdown={() => setShowDropdown(false)} />}
            <AvatarSelectModal 
                isOpen={modalVisible} 
                closeModal={() => setModalVisible(false)} 
                user={user} 
                classCode={classCode} 
            />
        </div>
    )
}

export default User;