import { useParams } from "react-router-dom";
import { useReadLocalStorage } from "usehooks-ts";
import { useFetchClassReviews } from "../api/useFetchClassReviews";
import BookRight from "../components/BookRight";
import Timeline from "../components/Timeline";
import SidebarLayout from "../layouts/SidebarLayout";


const Book = () => {
    const classCode = useReadLocalStorage<string>("classCode");
    const { data: reviews, loading, error } = useFetchClassReviews(classCode!);
    const { title } = useParams();

    if (error) return <div className="text-2xl">Error loading reviews. Try again later.</div>

    const bookTitle = title?.replaceAll("_", " ") ?? "";
    const bookReviews = reviews?.filter((review) => review.book.title === bookTitle);

    const totalStars = bookReviews?.map(review => review.stars).reduce((acc, cur) => acc += cur) ?? 0;
    const averageRating = totalStars / (bookReviews?.length ?? 1)

    return (
        <SidebarLayout
            main={<Timeline reviews={bookReviews} loading={loading || !reviews} />}
            side={<BookRight book={bookReviews?.[0].book} averageRating={averageRating} timesRead={bookReviews?.length ?? 0} />}
        />
    )
}

export default Book; 