import { Dispatch, SetStateAction, FC } from "react";
import { Book } from "../../types/book";

type BookOptionProps = {
    setBook: Dispatch<SetStateAction<Book | undefined>>;
    book: Book;
}

const BookOption: FC<BookOptionProps> = ({ setBook, book }) => {
    return (
        <li 
            className="flex p-4 rounded-md hover:bg-gray-200 cursor-pointer items-center"
            onClick={() => setBook(book)}
        >
            <img 
                className="h-28 mr-4"
                src={book.imageLink} 
                alt="" 
            />
            <div className="flex flex-col mr-auto self-start">
                <span className="text-xl 2xl:text-2xl mb-1">{book.title}</span>
                <span className="text-lg italic">by {book.author ?? "unknown"}</span>
            </div>
            <button className="bg-blue-500 hover:bg-blue-700 text-white text-xl font-bold py-4 px-4 ml-4 rounded">
                Review
            </button>
        </li>
    )
}

export default BookOption;