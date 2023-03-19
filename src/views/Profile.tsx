import { useParams } from "react-router-dom";
import { useReadLocalStorage } from "usehooks-ts";
import { useFetchClassReviews } from "../api/useFetchClassReviews";
import ProfileRight from "../components/ProfileRight";
import Timeline from "../components/Timeline";
import SidebarLayout from "../layouts/SidebarLayout";


const Profile = () => {
    const classCode = useReadLocalStorage<string>("classCode");
    const { data: reviews, loading, error } = useFetchClassReviews(classCode!);
    const { name } = useParams();

    if (error) return <div className="text-2xl">Error loading reviews. Try again later.</div>

    const userReviews = reviews?.filter((review) => review.user.toLowerCase() === name?.toLowerCase());

    const readYtd = userReviews?.length ?? 0;
    const readMtd = userReviews?.filter(review => new Date(review.timestamp).getMonth() === new Date().getMonth()).length ?? 0;

    return (
        <SidebarLayout
            main={<Timeline reviews={userReviews} loading={loading || !reviews} />}
            side={<ProfileRight user={name!} readYtd={readYtd} readMtd={readMtd} />}
        />
    )
}

export default Profile;