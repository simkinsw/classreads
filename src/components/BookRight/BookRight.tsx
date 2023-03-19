import { FC } from "react";
import { BsPencilSquare } from "react-icons/bs";
import { Link } from "react-router-dom";
import { Book } from "../../types/book";
import { Stat } from "../HomeRight/ClassStats";
import StarRating from "../ReviewForm/StarRating";

type BookRightProps = {
    book: Book | undefined;
    timesRead: number;
    averageRating: number;
}

const BookRight: FC<BookRightProps> = ({ book, averageRating, timesRead }) => {

    if (!book) return <></>

    const starSize = window.innerWidth >= 1536 ? 2.8 : 2.4;

    return (
        <>
            <Link 
                className="bg-blue-500 hover:bg-blue-700 text-white text-xl text-center font-bold py-3 rounded flex items-center justify-center"
                to={`/review?title=${book.title.replaceAll(" ", "_")}`}
            >
                <BsPencilSquare className="mr-2 w-6 h-6 mt-0.5" /> 
                Write a Review
            </Link>
            <div className="bg-white rounded-md overflow-hidden shadow-md flex flex-col items-center relative">
                <div className="absolute mt-6 w-36 h-36 2xl:w-40 2xl:h-40 rounded-full overflow-hidden border-white border-4 shadow-md"> 
                    <img 
                        className="w-full h-full"
                        src={book.imageLink} 
                        alt="" 
                    />
                </div>
                <div className="w-full bg-blue-500 h-[96px] 2xl:h-[108px]" />
                <div className="border-b border-b-gray-300 pb-3 self-stretch mx-6 mt-24">
                    <h1 className="font-fredoka text-xl 2xl:text-2xl">
                        {book.title}
                    </h1>
                    <span className="italic">
                        by {book.author}
                    </span>
                </div>
                <div className="flex flex-col gap-6 self-start my-4 ml-6">
                    <Stat name="Times Read" value={timesRead + ""} />
                    <div className="flex flex-col text w-full">
                        <span className="mr-4 mb-2 text-xl">Average Rating</span>
                        <span className="-ml-2">
                            <StarRating stars={averageRating} readOnly fontSize={starSize} precision={.25} />
                        </span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default BookRight;