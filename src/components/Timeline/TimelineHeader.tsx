import { FC, ReactNode, useState } from "react"
import { AiOutlineArrowDown, AiOutlineArrowUp, AiOutlineStar } from "react-icons/ai";
import { BsPencilSquare } from "react-icons/bs";
import { FaRegClock } from "react-icons/fa";
import { Link } from "react-router-dom";

type TimelineHeaderProps = {
    setIndex: (index: string) => void;
    setDir: (dir: number) => void;
}

const TimelineHeader: FC<TimelineHeaderProps> = ({ setIndex, setDir }) => {

    const [timeActive, setTimeActive] = useState(true);
    const [starsActive, setStarsActive] = useState(false);
    const [timeDir, setTimeDir] = useState(-1);
    const [starsDir, setStarsDir] = useState(-1);

    const clickHandler = (index: string, dir: number) => {
        setIndex(index);
        setDir(dir);

        setTimeActive(index === "time");
        setStarsActive(index === "stars");

        if (index === "time") setTimeDir(dir);
        else setStarsDir(dir);
    }  

    return (
        <header className="flex justify-end gap-2 items-center -mb-4">
            <Link 
                className="bg-blue-500 hover:bg-blue-700 text-white text-md sm:text-xl text-center font-bold p-1 sm:py-3 sm:px-4 mr-auto rounded flex lg:hidden items-center justify-center"
                to="/review"
            >
                <BsPencilSquare className="mr-2 w-6 h-6 mt-0.5 hidden sm:block" />  
                Post a Review
            </Link>
            <h2 className="font-bold text-xl pr-2 hidden sm:inline-block">
                Sort By:
            </h2>
            <ul className="flex gap-2">
                <SortBox 
                    text="Time Posted" 
                    icon={<FaRegClock className="translate-y-.5" />}
                    index="time" 
                    clickHandler={clickHandler} 
                    active={timeActive} 
                    dir={timeDir} 
                />
                <SortBox 
                    text="Number of Stars" 
                    icon={<AiOutlineStar className="w-5 h-5 translate-y-.5" />}
                    index="stars" 
                    clickHandler={clickHandler} 
                    active={starsActive} 
                    dir={starsDir} 
                />
            </ul>
        </header>
    )
}

type SortBoxProps = {
    text: string;
    icon: ReactNode;
    index: string;
    active: boolean;
    dir: number;
    clickHandler: (index: string, dir: number) => void;
}

const SortBox: FC<SortBoxProps> = ({ text, icon, index, active, dir, clickHandler }) => {
    const handleClick = () => {
        if(active) {
            clickHandler(index, -dir);
        } else {
            clickHandler(index, -1);
        }
    }

    return (
        <li className="relative cursor-pointer">
            <div 
                className={
                    "border text-lg font-bold rounded-md  py-1 px-3 select-none flex gap-2 items-center shadow-md " +
                    (active ? "border-blue-700 text-blue-700 bg-blue-200/50"
                    : "border-gray-700 bg-white text-gray-700")
                }
                onClick={handleClick}
            >
                {icon}
                <span className="hidden md:inline-block">{text}</span>
                {dir === 1 ? <AiOutlineArrowUp className={"w-5 h-5" + (!active && " fill-white")} /> : <AiOutlineArrowDown className={"w-5 h-5" + (!active && " fill-white")} />}
            </div>
        </li>
    )
}

export default TimelineHeader;