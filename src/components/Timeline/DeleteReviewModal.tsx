import { FC, useState } from "react";
import ReactModal from "react-modal";
import { useNavigate } from "react-router-dom";
import { deleteReview } from "../../api/deleteReview";
import LoadingElement from "../../layouts/LoadingElement";
import { Review } from "../../types/review";

type DeleteReviewModalProps = {
    review: Review;
    isOpen: boolean;
    closeModal: () => void;
}

const DeleteReviewModal: FC<DeleteReviewModalProps> = ({ review, isOpen, closeModal }) => {
    const [loading, setLoading] = useState(false);
    const [deleted, setDeleted] = useState(false);
    const navigate = useNavigate();
    
    const handleSubmit = () => {
        setLoading(true)
        deleteReview(review._id, review.classCode).then(() => {
            setLoading(false);
            setDeleted(true);
        });
    }

    const handleDeleteConfirm = () => {
        closeModal();
        navigate(0);
    }

    return (
        <ReactModal
            className="w-auto p-8 my-20 2xl:my-32 mx-20 xl:mx-[24rem] 2xl:mx-[38rem] bg-white rounded-md relative"
            ariaHideApp={false}
            onRequestClose={closeModal}
            style={{
                overlay: {
                    backgroundColor: "rgba(0, 0, 0, .4)"
                },
                content: {
                    outline: "none",
                    height: "15rem"
                }
            }}
            isOpen={isOpen}
        >
            <LoadingElement loading={loading} children={
                !deleted ?
                <>
                    <div className="text-4xl text-red-500 font-fredoka mb-6">
                        Delete this Review?
                    </div>
                    <div>
                        Are you sure you want to permanently delete {review.user}'s review of {review.book.title}?
                    </div>
                    <div className="flex justify-end gap-3 mt-6">
                        <button 
                            className="bg-gray-400 hover:bg-gray-500 text-white text-xl font-bold py-2 px-4 w-24 rounded" 
                            onClick={closeModal}
                        >
                            Cancel
                        </button>
                        <button 
                            className="bg-red-500 hover:bg-red-700 text-white text-xl font-bold py-2 px-4 w-24 rounded" 
                            onClick={() => handleSubmit()}
                        >
                            Delete
                        </button>
                    </div>
                </>
                :
                <>
                    <div className="text-4xl text-green-500 font-fredoka mb-6">
                        Successfully Deleted!
                    </div>
                    <div>
                        {review.user}'s review of {review.book.title} has been permanently deleted.
                    </div>
                    <div className="flex justify-end gap-3 mt-6">
                        <button 
                            className="bg-green-500 hover:bg-green-700 text-white text-xl font-bold py-2 px-4 w-24 rounded" 
                            onClick={handleDeleteConfirm}
                        >
                            OK
                        </button>
                    </div>
                </>
            }/>
        </ReactModal>
    )
}

export default DeleteReviewModal;