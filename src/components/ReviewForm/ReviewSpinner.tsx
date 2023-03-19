import { CircularProgress } from "@mui/material";

const ReviewSpinner = () => {
    return (
        <div className="bg-white rounded-md shadow-md h-[400px] w-full lg:w-4/5 text-gray-400 flex justify-center items-center mx-auto xl:mx-0">
            <CircularProgress size={75} thickness={6} color="inherit" />
        </div>
    )
}

export default ReviewSpinner;