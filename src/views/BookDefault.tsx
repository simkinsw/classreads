import { useNavigate } from "react-router-dom";
import { useReadLocalStorage } from "usehooks-ts";
import { useFetchBooks } from "../api/useFetchBooks";

const BookDefault = () => {
    const classCode = useReadLocalStorage<string>("classCode")!;
    const { data: bookList } = useFetchBooks(classCode);
    const navigate = useNavigate();

    const handleClick = (title: string) => {
        navigate(`/book/${title}`)
    }

    if(!bookList || bookList.size === 0) {
        return (
            <h2 className="font-bold text-2xl">
                No Books Found.
            </h2>
        )
    }

    return (
        <main>
            
            <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-4 sm:gap-y-8">
                {
                    Array.from(bookList.values()).map((book) => {
                        return (
                            <div 
                                className="bg-white shadow-md rounded-md flex items-center gap-3 px-4 py-4 cursor-pointer hover:bg-slate-200 hover:underline decoration-2" 
                                onClick={() => handleClick(book.title)}
                            >
                                <img 
                                    className="w-10 hidden sm:inline"
                                    src={book.imageLink} 
                                    alt="" 
                                />
                                <span className="font-fredoka text-lg 2xl:text-xl max-h-14 overflow-hidden">{book.title}</span>
                            </div>
                        )
                    })
                }
            </ul>
        </main>
    )
}

export default BookDefault;