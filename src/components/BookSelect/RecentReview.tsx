import { Dispatch, FC, SetStateAction } from "react";
import { Book } from "../../types/book";
import { Review } from "../../types/review"

type RecentReviewProps = {
    review: Review;
    setBook: Dispatch<SetStateAction<Book | undefined>>;
}

const RecentReview: FC<RecentReviewProps> = ({ review, setBook }) => {
    return (
        <li 
            className="flex p-4 pb-2 rounded-md hover:bg-gray-200 cursor-pointer items-center"
            key={review.book.title}
            onClick={() => setBook(review.book)}
        >
            <div className="flex flex-col mr-auto self-start">
                <span className="text-xl 2xl:text-2xl mb-1">{review.book.title}</span>
                <span className="text-lg italic">by {review.book.author ?? "unknown"}</span>
            </div>
            <button className="bg-blue-500 hover:bg-blue-700 text-white text-xl font-bold py-4 px-4 ml-4 rounded">
                Review
            </button>
        </li>
    )
}

export default RecentReview;