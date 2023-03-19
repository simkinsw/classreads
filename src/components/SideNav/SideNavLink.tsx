import { FC } from "react";
import { Link } from "react-router-dom";

type SideNavLinkProps = {
    icon: JSX.Element;
    text: string;
    path: string;
    active: boolean;
}

const SideNavLink: FC<SideNavLinkProps> = ({ icon, text, path, active }) => {

    const activeStyles = "border-blue-700 xl:text-blue-700 xl:bg-blue-200/50" 

    return (
        <Link 
            to={path}
            className={
                "flex gap-2 items-center text-lg xl:text-xl font-semibold xl:px-4 p-1 xl:py-2 border-b-4 xl:border-b-0 xl:border-l-8 " +
                "xl:hover:border-blue-700 xl:hover:text-blue-700 xl:hover:bg-blue-200/50 " +
                (active ? activeStyles
                : "text-gray-500")
            }
        >
            {icon}
            {text}
        </Link>
    )
}

export default SideNavLink;