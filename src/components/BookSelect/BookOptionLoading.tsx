import { CircularProgress } from "@mui/material";

const BookOptionLoading = () => {
    return (
        <div className="flex items-center justify-center flex-1 text-gray-400 py-8">
            <CircularProgress size={75} thickness={6} color="inherit" />
        </div>
    )
}

export default BookOptionLoading;