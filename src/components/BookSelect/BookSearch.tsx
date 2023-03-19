import { Dispatch, FC, SetStateAction, useState } from "react";
import { Book } from "../../types/book";
import BookOptionList from "./BookOptionList";
import BookOptionLoading from "./BookOptionLoading"
import BookPicker from "./BookPicker"

type BookSearchProps = {
    setBook: Dispatch<SetStateAction<Book | undefined>>;
}

const BookSearch: FC<BookSearchProps> = ({ setBook }) => {
    const [options, setOptions] = useState<Book[]>();
    const [loading, setLoading] = useState(false);

    return (
        <div className="flex flex-col bg-white rounded-md shadow-md py-6 px-4 flex-[1.5_1.5_0%]">
            <BookPicker setOptions={setOptions} setLoading={setLoading} />
            {loading && <BookOptionLoading />}
            {!loading && options && <BookOptionList options={options} setBook={setBook} />}
        </div>
    )
}

export default BookSearch;