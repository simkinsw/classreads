import { CircularProgress } from "@mui/material";
import { FC } from "react";

type LoadingProps = {
    children: JSX.Element;
    loading: boolean;
}

const LoadingElement: FC<LoadingProps> = ({ children, loading }) => {
    if (loading) {
        return (
            <div className="flex justify-center text-gray-500">
                <CircularProgress size={75} thickness={6} color="inherit" />
            </div>
        );
    }

    return <>{children}</>
}

export default LoadingElement;