import { FC } from "react";
import { IoCheckmarkCircle } from "react-icons/io5";
import { Link } from "react-router-dom";

type ReviewSuccessfulProps = {
    reset: () => void;
}

const ReviewSuccessful: FC<ReviewSuccessfulProps> = ({ reset }) => {
    return (
        <main className="flex flex-1">
            <div className="bg-white rounded-md shadow-md h-[400px] w-full lg:w-4/5 mx-auto xl:mx-0 text-center py-8 flex flex-col justify-evenly">
                <h2 className="font-fredoka text-4xl mb-6">
                    Review posted Successfully!
                </h2>
                <IoCheckmarkCircle className="mx-auto w-40 h-40 mb-6 fill-green-500" />
                <div className="text-xl">
                    <Link className="text-blue-500 hover:underline" to="/">Return home</Link>
                    &nbsp;or&nbsp;
                    <span className="text-blue-500 cursor-pointer hover:underline" onClick={reset}>post another review</span>
                </div>
            </div>
        </main>
    )   
}

export default ReviewSuccessful;