import { post } from "./axiosUtils";

export function changeAvatar(classCode: string, user: string, avatar: number) {
    post("/avatars", {user, classCode, avatar});
}