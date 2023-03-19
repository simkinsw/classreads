import { useLocation } from "react-router-dom";
import SideNavLink from "./SideNavLink"
import { AiOutlineHome } from "react-icons/ai";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { BsPerson } from "react-icons/bs";
import { BiBook } from "react-icons/bi";

const SideNav = () => {
    const path = useLocation();
    const current = path.pathname.split("/")[1];

    const iconClass = "w-6 h-6";

    return (
        <section className="hidden xl:flex flex-col gap-3 w-[20rem] 2xl:w-[22rem] fixed top-32 pr-10 2xl:pr-16 items-stretch z-10">
            <SideNavLink icon={<AiOutlineHome className={iconClass} />} text="Feed" path="/" active={current === ""} />
            <SideNavLink icon={<HiOutlinePencilSquare className={iconClass} />} text="Write a Review" path="/review" active={current === "review"} />
            <SideNavLink icon={<BsPerson className={iconClass} />} text="Classmates" path="/profile" active={current === "profile"} />
            <SideNavLink icon={<BiBook className={iconClass} />} text="Books" path="/book" active={current === "book"} />
        </section>
    )
}

export default SideNav;