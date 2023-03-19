import { FC } from "react";
import { useReadLocalStorage } from "usehooks-ts";
import { useFetchAvatars } from "../../api/useFetchAvatars";

type AvatarProps = {
    user: string;
    size?: number;
    customClass?: string;
}

const Avatar: FC<AvatarProps> = ({ user, customClass="", size=10 }) => {
    const classCode = useReadLocalStorage<string>("classCode");
    const currentUser = useReadLocalStorage<string>("user")!;
    const currentAvatar = useReadLocalStorage<string>("avatar");
    const { data: avatars } = useFetchAvatars(classCode ?? "");

    let avatar;
    if(currentUser === user && !!currentAvatar) {
        avatar = currentAvatar;
    } else {
        avatar = avatars?.find((entry) => entry.user === user)?.avatar ?? "0";
    }

    return (
        <img 
            className={`w-${size} h-${size} rounded-full ` + customClass}
            src={require(`../../assets/avatars/avatar${avatar}.png`)} 
            alt="" 
        />
    )
}

export default Avatar;