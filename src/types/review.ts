import { Book } from "./book";

export type Review = {
    _id: string;
    timestamp: number;
    user: string;
    book: Book;
    classCode: string;
    stars: number;
    reviewText: string;
}

export type ReviewCreate = Omit<Review, "_id" | "timestamp">;