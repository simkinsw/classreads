import { Review } from "../types/review";
import { useCachedGet } from "./axiosUtils";

export function useFetchClassReviews(classCode: string){
    const { data, error, loading } = useCachedGet<Review[]>(`reviews/class/${classCode}`, 300);
    return { data, error, loading };
}

