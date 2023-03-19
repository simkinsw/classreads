import { ReviewCreate } from "../types/review";
import { post } from "./axiosUtils";


export async function postReview(review: ReviewCreate) {
    localStorage.removeItem(`reviews/class/${review.classCode}`);
    localStorage.removeItem(`stats/${review.classCode}`);
    return post("reviews", review);
}