import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { useReadLocalStorage } from "usehooks-ts";
import { useFetchClassReviews } from "../../api/useFetchClassReviews";
import { Book } from "../../types/book";
import RecentReview from "./RecentReview";

type RecentlyReviewedProps = {
    setBook: Dispatch<SetStateAction<Book | undefined>>;
}

const RecentlyReviewed: FC<RecentlyReviewedProps> = ({ setBook }) => {
    const classCode = useReadLocalStorage<string>("classCode")!
    const user = useReadLocalStorage<string>("user");
    const { data: reviews } = useFetchClassReviews(classCode);
    const [reviewList, setReviewList] = useState<JSX.Element[]>([]);

    useEffect(() => {
        if(!reviews) return;

        const newReviewList = [];
        let counter = 0;
        const titles = new Set<string>([]);
        for (const review of reviews) {
            if(!titles.has(review.book.title) && review.user !== user) {
                titles.add(review.book.title);
                counter++;
                newReviewList.push(<RecentReview key={review.book.title} review={review} setBook={setBook} />)
                if(counter >= 4) break;
            }
        }
        setReviewList(newReviewList);
    }, [reviews, setBook, user])

    return (
        <section className="flex-1 hidden lg:flex flex-col bg-white shadow-md rounded-md p-6 px-4">
            <h2 className="text-blue-500 font-fredoka px-4 text-2xl 2xl:text-3xl mb-4">
                Reviewed by Classmates
            </h2>
            <p className="px-4">
                Pick a book reviewed by one of your classmates!
            </p>
            <ul className="flex flex-1 flex-col gap-4 mt-4 justify-between">
                {reviewList}
            </ul>
        </section>
    )
}

export default RecentlyReviewed;