import { useEffect, useState } from "react";
import { Book } from "../types/book";
import { Review } from "../types/review";
import { useCachedGet } from "./axiosUtils";

export function useFetchBooks(classCode: string){
    const { data: reviewData, error, loading } = useCachedGet<Review[]>(`reviews/class/${classCode}`, 300);
    const [data, setData] = useState<Map<string, Book>>();

    useEffect(() => {
        if (reviewData) {
            const bookMap = new Map<string, Book>()
            for (const review of reviewData) {
                bookMap.set(review.book.title, review.book);
            }
            setData(bookMap);
        }
    }, [reviewData])

    return { data, error, loading };
}

