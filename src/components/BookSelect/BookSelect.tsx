import { Dispatch, FC, SetStateAction } from "react"
import { Book } from "../../types/book";
import BookSearch from "./BookSearch";
import RecentlyReviewed from "./RecentlyReviewed";

type BookSelectProps = {
    setBook: Dispatch<SetStateAction<Book | undefined>>;
}

const BookSelect: FC<BookSelectProps> = ({ setBook }) => {
    return (
        <main className="flex flex-1 gap-8">
            <BookSearch setBook={setBook} />
            <RecentlyReviewed setBook={setBook} />
        </main>
    )
}

export default BookSelect;