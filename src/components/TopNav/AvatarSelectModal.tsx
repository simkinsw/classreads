import { FC, useState } from "react";
import ReactModal from "react-modal";
import { useLocalStorage } from "usehooks-ts";
import { changeAvatar } from "../../api/changeAvatar";
import { setAvatarInCache } from "../../api/useFetchAvatars";

type AvatarSelectModalProps = {
    isOpen: boolean;
    closeModal: () => void;
    user: string;
    classCode: string;
}

const AvatarSelectModal: FC<AvatarSelectModalProps> = ({ isOpen, closeModal, user, classCode }) => {
    const [selection, setSelection] = useState<number>();
    const [, setAvatar] = useLocalStorage("avatar", "");

    const handleSubmit = () => {
        if(!selection) return;
        changeAvatar(classCode, user, selection);
        setAvatar(selection + "");
        setAvatarInCache(classCode, user, selection);
        closeModal()
    }

    let avatars = [];
    for (let i = 0; i < 16; i++) {
        const cur = selection === i;
        avatars.push(
            <li 
                className={"hover:bg-gray-100 py-2 2xl:py-4 flex justify-center rounded-md border-2" + 
                    (cur ? " bg-gray-100 border-black" : " border-transparent")}
                onClick={() => setSelection(i)}
                key={i}
            >
                <img 
                    className="w-20 h-20 2xl:w-24 2xl:h-24 rounded-full"
                    src={require(`../../assets/avatars/avatar${i}.png`)} 
                    alt="" 
                />
            </li>
        )
    }

    return (
        <ReactModal
            className="w-auto p-8 my-20 2xl:my-32 mx-20 xl:mx-[24rem] 2xl:mx-[38rem] bg-white rounded-md relative"
            ariaHideApp={false}
            onRequestClose={closeModal}
            style={{
                overlay: {
                    backgroundColor: "rgba(0, 0, 0, .4)"
                },
                content: {
                    outline: "none"
                }
            }}
            isOpen={isOpen}
        >
            <div className="text-4xl text-blue-500 font-fredoka mb-6">
                Select an Avatar
            </div>
            <ul className="grid grid-cols-4 cursor-pointer">
                {avatars}
            </ul>
            <div className="flex justify-end gap-3 mt-6">
                <button 
                    className="bg-gray-400 hover:bg-gray-500 text-white text-xl font-bold py-2 px-4 w-24 rounded" 
                    onClick={closeModal}
                >
                    Cancel
                </button>
                <button 
                    className="bg-blue-500 hover:bg-blue-700 text-white text-xl font-bold py-2 px-4 w-24 rounded" 
                    onClick={() => handleSubmit()}
                >
                    OK
                </button>
            </div>
        </ReactModal>
    )
}

export default AvatarSelectModal;