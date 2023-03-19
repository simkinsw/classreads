import { Dispatch, FC, SetStateAction, useState } from "react";
import { useReadLocalStorage } from "usehooks-ts";
import { postReview } from "../../api/postReview";
import { Book } from "../../types/book";
import ReviewHeader from "./ReviewHeader";
import StarRating from "./StarRating";
import { AiOutlineArrowLeft } from "react-icons/ai";
import ReviewSpinner from "./ReviewSpinner";

type ReviewFormProps = {
    book: Book;
    setBook: Dispatch<SetStateAction<Book | undefined>>;
    setPosted: Dispatch<SetStateAction<boolean>>;
}

const ReviewForm: FC<ReviewFormProps> = ({ book, setBook, setPosted }) => {
    const [loading, setLoading] = useState(false);
    const [stars, setStars] = useState(0);
    const [reviewText, setReviewText] = useState("");
    const user = useReadLocalStorage<string>("user")!;
    const classCode = useReadLocalStorage<string>("classCode")!;

    const handleSubmit = () => {
        const review = { user, book, classCode, stars, reviewText };
        setLoading(true);
        postReview(review).then((result) => setTimeout(() => {
            setPosted(true);
            setLoading(false);
        }, 1000));
    }

    if (loading) return <ReviewSpinner />

    const starSize = window.innerWidth >= 1536 ? 5 : window.innerWidth >= 640 ? 4 : 3;
    const backText = window.innerWidth >= 640 ? "Choose a Different Book" : "Go Back";

    return (
        <div className="flex-1">
            <div className="mb-2 flex justify-between w-full lg:w-4/5 items-end mx-auto xl:mx-0">
                <h2 className="text-2xl sm:text-3xl text-blue-500 font-fredoka">
                    Write your Review!
                </h2>
                <div 
                    onClick={() => setBook(undefined)}
                    className="flex items-center gap-1.5 cursor-pointer hover:underline decoration-blue-500"
                >
                    <AiOutlineArrowLeft className="w-5 h-5 fill-blue-500" />
                    <span className="text-blue-500 text-lg sm:text-xl">
                        {backText}
                    </span>
                </div>
            </div>
            <div className="bg-white rounded-md shadow-md p-3 sm:p-6 w-full lg:w-4/5 mx-auto xl:mx-0">
                <div className="flex flex-col sm:flex-row items-center mb-6">
                    <ReviewHeader book={book} showLink={false} />
                    <div className="mt-4 sm:mt-0">
                        <StarRating stars={stars} setStars={setStars} fontSize={starSize} />
                    </div>
                </div>
                <textarea 
                    className="border-2 border-gray-300 rounded-sm mb-4 min-h-[10rem] w-full px-1 py-1 text-lg 2xl:text-xl" 
                    name="review" 
                    value={reviewText}
                    placeholder="What did you think?"
                    onChange={e => setReviewText(e.target.value)}
                />
                <div className="flex justify-end">
                    <input 
                        className="cursor-pointer bg-blue-600 hover:bg-blue-700 rounded-md text-white text-xl px-4 py-2 font-bold"
                        type="button" 
                        value="Post Review" 
                        onClick={handleSubmit} 
                    />
                </div>
            </div>
        </div>
    )
}

export default ReviewForm;