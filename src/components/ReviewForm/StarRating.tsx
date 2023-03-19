import { Rating } from "@mui/material";
import { FC } from "react";

type StarRatingProps = {
    stars: number;
    setStars?: (stars: number) => void;
    readOnly?: boolean;
    fontSize?: number;
    precision?: number;
}

const StarRating: FC<StarRatingProps> = ({ stars, setStars=() => {}, readOnly=false, fontSize=4, precision=1 }) => {
    return (
        <Rating
            size="large"
            value={stars}
            readOnly={readOnly}
            precision={precision}
            sx={{
                fontSize: `${fontSize}rem`
            }}
            onChange={(event, newValue) => {
                setStars(newValue ?? 0);
            }}
        />
    )
}

export default StarRating;