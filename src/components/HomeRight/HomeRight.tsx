import { Link } from "react-router-dom";
import ClassStats from "./ClassStats";
import { FC } from "react";
import { BsPencilSquare } from "react-icons/bs";

type HomeRightProps = {
    classCode: string;
}

const HomeRight: FC<HomeRightProps> = ({ classCode }) => {
    return (
        <>
            <Link 
                className="bg-blue-500 hover:bg-blue-700 text-white text-xl text-center font-bold py-3 rounded flex items-center justify-center"
                to="/review"
            >
                <BsPencilSquare className="mr-2 w-6 h-6 mt-0.5" />  
                Post a Review
            </Link>
            <ClassStats classCode={classCode} />
        </>   
    )
}

export default HomeRight;