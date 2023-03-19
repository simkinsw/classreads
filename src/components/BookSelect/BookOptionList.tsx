import { Dispatch, FC, SetStateAction } from "react";
import { Book } from "../../types/book";
import { checkProfanity } from "../../utils/checkProfanity";
import BookOption from "./BookOption";

type BookOptionListProps = {
    setBook: Dispatch<SetStateAction<Book | undefined>>;
    options: Book[];
}

const BookOptionList: FC<BookOptionListProps> = ({ setBook, options }) => {

    const filtered = options.filter(book => checkProfanity(book.title));
    if (filtered.length === 0) return <div className="mt-4 text-lg">No results found. Try another search.</div>

    return (
        <ul className="flex flex-col gap-4 mt-4">
            {
                options.map((book, i) => {
                    return (
                        <BookOption key={book.title + i} setBook={setBook} book={book} />
                    )
                })
            }
        </ul>
    )
}

export default BookOptionList;