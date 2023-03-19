import { FC, useState } from "react";
import { BsPencilSquare } from "react-icons/bs";
import { RiDeleteBinLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import { useReadLocalStorage } from "usehooks-ts";
import { Review } from "../../types/review";
import { fromNow } from "../../utils/fromNow";
import Avatar from "../Avatar";
import ReviewHeader from "../ReviewForm/ReviewHeader";
import StarRating from "../ReviewForm/StarRating";
import DeleteReviewModal from "./DeleteReviewModal";

type ReviewCardProps = {
    review: Review;
}

const ReviewCard: FC<ReviewCardProps> = ({ review }) => {
    const [showModal, setShowModal] = useState(false);
    const teacher = useReadLocalStorage<boolean>("teacher");

    const starSize = window.innerWidth >= 1536 ? 3.2 : window.innerWidth >= 1024 ? 2.8 : 3.2;

    const handleDelete = () => {
        setShowModal(true);
    }

    return (
        <div className="bg-white rounded-md shadow-md p-3 sm:p-6 2xl:p-8 flex flex-col relative">
            <div className="flex flex-col sm:flex-row items-center mb-2">
                <ReviewHeader book={review.book} />
                <div className="mt-4 sm:mt-0 ">
                    <StarRating stars={review.stars} readOnly={true} fontSize={starSize} />
                </div>
            </div>
            <div className="pt-4 pb-2">
                {review.reviewText}
            </div>
            <Link 
                to={`/review?title=${review.book.title}`}
                className="2xl:text-lg text-blue-500 flex justify-end gap-2 items-center cursor-pointer border-b border-gray-300 pb-3"
            >
                <span className="hidden sm:inline-block">Review this book</span>
                <BsPencilSquare className="mt-.5" />
            </Link>
            <div className="flex gap-2 items-center pt-4">
                <Avatar user={review.user} />
                <span className="mr-auto">
                    Posted by&nbsp;
                    <Link className="text-blue-600" to={`/profile/${review.user}`}>
                        {review.user}
                    </Link>
                </span>
                <div className="italic">
                    {fromNow(review.timestamp)}
                </div>
            </div>
            {teacher && 
                <>
                <div className="absolute top-2 right-2">
                    <RiDeleteBinLine 
                        className="fill-gray-500 w-6 h-6 cursor-pointer hover:fill-gray-800"
                        onClick={handleDelete} 
                    />
                </div>
                <DeleteReviewModal
                    review={review}
                    isOpen={showModal}
                    closeModal={() => setShowModal(false)}
                />
                </>
            }
        </div>
    )
}

export default ReviewCard;
