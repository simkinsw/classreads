import { FC } from "react";
import { Link } from "react-router-dom";
import { Book } from "../../types/book";

type ReviewHeaderProps = {
    book: Book;
    showLink?: boolean;
}

const ReviewHeader: FC<ReviewHeaderProps> = ({ book, showLink=true }) => {
    return (
        <div className="flex rounded-md items-start mr-auto pr-2">
            <Link className="flex-shrink-0" to={`/book/${book.title.replaceAll(" ", "_")}`}>
                <img 
                    className="h-28 2xl:h-32 mr-4"
                    src={book.imageLink} 
                    alt="" 
                />
            </Link>
            <div className="flex flex-col mr-auto self-start h-28 2xl:h-32">
                <Link to={`/book/${book.title.replaceAll(" ", "_")}`} className="text-2xl lg:text-xl 2xl:text-3xl mb-.5 2xl:mb-1 font-bold">
                    {book.title}
                </Link>
                <span className="text-lg lg:text-md 2xl:text-xl italic mb-auto">by {book.author ?? "unknown"}</span>
            </div>
        </div>
    )
}

export default ReviewHeader;

