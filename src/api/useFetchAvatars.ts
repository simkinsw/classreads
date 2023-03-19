import { useEffect } from "react";
import { Avatar } from "../types/avatar";
import { useCachedGet } from "./axiosUtils";

export function useFetchAvatars(classCode: string | undefined){
    const {data, error, loading} = useCachedGet<Avatar[]>(`avatars/${classCode}`)

    useEffect(() => {
        if(!data) return;

        if (userAvatar && classCode === userAvatar.classCode) {
            const toReplace = data?.find((avatar) => avatar.user === userAvatar.user)

            if (toReplace) {
                toReplace.avatar = userAvatar.avatar;
            }
        }
    }, [data, classCode])

    return { data, error, loading };
}

export function setAvatarInCache(classCode: string, user: string, avatar: number) {
    userAvatar = { classCode, user, avatar };
}

let userAvatar: {
    classCode: string;
    user: string;
    avatar: number;
};