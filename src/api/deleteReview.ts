import { post } from "./axiosUtils";


export async function deleteReview(id: string, classCode: string) {
    return post("reviews/delete", { id, classCode });
}