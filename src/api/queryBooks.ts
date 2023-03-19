import axios from "axios";
import { BooksResponse } from "../types/bookAPIResponse";
import { Book } from "../types/book";


const BANNED_WORDS = ["guide", "student", "packet", "instructional"];

const API_KEY = process.env.REACT_APP_GOOGLE_BOOKS_API_KEY!;
const BASE_URL = "https://www.googleapis.com/books/v1/volumes"

export async function queryBookByTitle(searchText: string, numResults=3): Promise<Book[]> {
    try {
        searchText = searchText.toLowerCase();
        let query = "?q="
        query += `intitle:${searchText.split(" ").join("+")}`;
        query += bannedWordsQuery(searchText);
        query += `&maxResults=${numResults}&langRestrict=en&projection=lite`;

        const cacheKey = query;
        const cached = localStorage.getItem(cacheKey);
        const whenCached = localStorage.getItem(cacheKey + ":ts");

        if (cached !== null && whenCached !== null) {
            return JSON.parse(cached) as Book[];
        }
        
        const { data } = await axios.get<BooksResponse>(
            `${BASE_URL}/${query}&key=${API_KEY}`
        );

        const filtered = data.items.filter(item => {
            return (
                item.volumeInfo.maturityRating === "NOT_MATURE"
                    && !item.volumeInfo.title.toLowerCase().includes("instructional")
                    && !item.volumeInfo.title.toLowerCase().includes("classroom")
                    && !item.volumeInfo.title.toLowerCase().includes("guide")
            );
        });

        const response = filtered.map(item => new Book(item.volumeInfo));
        localStorage.setItem(query, JSON.stringify(response));

        return response;
    } catch (err) {
        console.log(err);
    }

    return [];
}

function bannedWordsQuery(searchText: string) {
    let query = "&" + BANNED_WORDS.filter(word => !searchText.includes(word))
        .map(word => `-${word}`)
        .join("+");

    return query;
}
