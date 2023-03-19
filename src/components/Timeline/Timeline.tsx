import { FC, useEffect, useState } from "react";
import LoadingElement from "../../layouts/LoadingElement";
import { Review } from "../../types/review"
import ReviewCard from "./ReviewCard";
import TimelineHeader from "./TimelineHeader";

type TimelineProps = {
    reviews: Review[] | undefined;
    loading: boolean;
}

const Timeline: FC<TimelineProps> = ({ reviews, loading }) => {
    const [sortedReviews, setSortedReviews] = useState<Review[]>([]);
    const [numReviews, setNumReviews] = useState(10);
    const [sortIndex, setSortIndex] = useState("time");
    const [sortDir, setSortDir] = useState(-1);

    useEffect(() => {
        if (!reviews) return;

        const sorted = reviews.slice();
        if (sortIndex === "time") {
            sorted.sort((a, b) => sortDir * (a.timestamp - b.timestamp));
        } else if (sortIndex === "stars") {
            sorted.sort((a, b) => sortDir * (a.stars - b.stars));
        }

        setSortedReviews(sorted);
    }, [reviews, sortDir, sortIndex])

    const trackScrolling = () => {
        const wrappedElement = document.getElementById('timeline');
        if(!wrappedElement) {
            console.log("timeline not found");
            return;
        }

        if (wrappedElement.getBoundingClientRect().bottom <= window.innerHeight) {
            setNumReviews(numReviews + 10);
        }
    };

    useEffect(() => {
        document.addEventListener("scroll", trackScrolling);
        return () => {
            document.removeEventListener("scroll", trackScrolling);
        }
    })

    if (!loading && sortedReviews.length === 0) return <div className="flex flex-col flex-1 gap-8 pb-12 relative z-10 text-xl">No reviews posted yet.</div>

    return (
        <section id="timeline" className="flex flex-col flex-1 gap-8 pb-12 relative z-10">
            <LoadingElement loading={loading}>
                <>
                <TimelineHeader 
                    setIndex={(ind: string) => setSortIndex(ind)}
                    setDir={(dir: number) => setSortDir(dir)}
                />
                {
                    sortedReviews.slice(0, numReviews).map((review) => {
                        return (
                            <ReviewCard key={review._id} review={review} />
                        )
                    })
                }
                </>
            </LoadingElement>
        </section>
    )
}

export default Timeline;