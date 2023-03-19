import { FC } from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "../../assets/logo.png";
import SideNavLink from "../SideNav/SideNavLink";
import Search from "./Search";
import User from "./User";
import { AiOutlineHome } from "react-icons/ai";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { BsPerson } from "react-icons/bs";
import { BiBook } from "react-icons/bi";

type TopNavProps = {
    fullNav?: boolean
}

const TopNav: FC<TopNavProps> = ({ fullNav = true }) => {
    const path = useLocation();
    const current = path.pathname.split("/")[1];
    const iconClass = "w-6 h-6 sm:w-4 sm:h-4";

    return (
        <div className="fixed z-20 w-screen h-20 shadow-lg bg-gray-50 flex items-center">
            <div className="container mx-auto flex items-center">
                <Link className={(!fullNav ? "inline-block" : "hidden") + " xl:inline-block"} to="/">
                    <img 
                        className="h-7 w-full"
                        src={Logo} 
                        alt="Classreads logo" 
                    />
                </Link>
                {fullNav &&
                    <section className="flex gap-3 sm:gap-2 xl:hidden self-end">
                        <SideNavLink icon={<AiOutlineHome className={iconClass} />} text="Feed" path="/" active={current === ""} />
                        <SideNavLink icon={<HiOutlinePencilSquare className={iconClass} />} text="Review" path="/review" active={current === "review"} />
                        <SideNavLink icon={<BsPerson className={iconClass} />} text="Friends" path="/profile" active={current === "profile"} />
                        <SideNavLink icon={<BiBook className={iconClass} />} text="Books" path="/book" active={current === "book"} />
                    </section>
                }               
                {fullNav && <Search />}
                {fullNav && <User />}
            </div>
        </div>
    )
}

export default TopNav;