import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useReadLocalStorage } from "usehooks-ts";
import { useFetchBooks } from "../api/useFetchBooks";
import BookSelect from "../components/BookSelect";
import ReviewForm from "../components/ReviewForm";
import ReviewSuccessful from "../components/ReviewSuccessful";
import { Book } from "../types/book";

const Review = () => {
    const [queryParams] = useSearchParams()
    const classCode = useReadLocalStorage<string>("classCode");
    const { data: bookList } = useFetchBooks(classCode ?? "");
    const title = queryParams.get("title");

    const [book, setBook] = useState<Book | undefined>();
    const [posted, setPosted] = useState(false);

    useMemo(() => {
        if (!!bookList && !!title) {
            const linkedBook = bookList.get(title.replaceAll("_", " "));
            setBook(linkedBook);
        }
    }, [title, bookList])

    const reset = () => {
        setBook(undefined);
        setPosted(false);
    }

    if (posted) return (<ReviewSuccessful reset={reset} />)

    return (
        !!book  ? <ReviewForm book={book} setBook={setBook} setPosted={setPosted} /> 
                : <BookSelect setBook={setBook} />
    )
}

export default Review;