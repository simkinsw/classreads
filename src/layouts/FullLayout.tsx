import { FC, ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useReadLocalStorage } from "usehooks-ts";
import SideNav from "../components/SideNav";
import TopNav from "../components/TopNav";

type ReviewLayoutProps = {
    children: ReactNode;
}

const ReviewLayout: FC<ReviewLayoutProps> = ({ children }) => {
    const classCode = useReadLocalStorage("classCode");
    const user = useReadLocalStorage("user");
    const navigate = useNavigate();

    useEffect(() => {
        if(!classCode || !user) {
            navigate("/login");
        }
    }, [user, classCode, navigate])
    

    return (
        <>
            <TopNav />
            <div className="bg-gray-100 min-h-screen pt-28">
                <div className="container mx-auto">
                    <SideNav />
                    <div className="flex xl:ml-[20rem] 2xl:ml-[22rem] mt-4">
                        {children}
                    </div>
                </div>
            </div>
        </>      
    )
}

export default ReviewLayout;