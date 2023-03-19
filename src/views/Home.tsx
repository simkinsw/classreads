import { useReadLocalStorage } from "usehooks-ts";
import { useFetchClassReviews } from "../api/useFetchClassReviews";
import HomeRight from "../components/HomeRight";
import Timeline from "../components/Timeline";
import SidebarLayout from "../layouts/SidebarLayout";


const Home = () => {
    const classCode = useReadLocalStorage<string>("classCode");
    const { data: reviews, loading, error } = useFetchClassReviews(classCode!);

    if (error) return <div className="text-2xl">Error loading reviews. Try again later.</div>

    return (
        <SidebarLayout
            main={<Timeline reviews={reviews} loading={loading || !reviews} />}
            side={<HomeRight classCode={classCode!} />}
        />
    )
}

export default Home;