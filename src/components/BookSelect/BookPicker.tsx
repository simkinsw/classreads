import { Autocomplete, Popper } from "@mui/material";
import { Dispatch, FC, SetStateAction, useState } from "react"
import { useReadLocalStorage } from "usehooks-ts";
import { queryBookByTitle } from "../../api/queryBooks";
import { useFetchBooks } from "../../api/useFetchBooks";
import { Book } from "../../types/book";

type AutocompleteOption = {
    label: string;
}

type BookPickerProps = {
    setOptions: Dispatch<SetStateAction<Book[] | undefined>>;
    setLoading: (loading: boolean) => void;
}

const BookPicker: FC<BookPickerProps> = ({ setOptions, setLoading }) => {
    const [value, setValue] = useState("");
    const classCode = useReadLocalStorage<string>("classCode")!
    const { data: booklist } = useFetchBooks(classCode);

    const handleSubmit = async (title: AutocompleteOption | string | null) => {
        if (!title) return;
        const searchText = typeof title === 'string' ? title : title.label;

        setLoading(true);
        const books = await queryBookByTitle(searchText);
        setLoading(false);
        if(books) {
            setOptions(books);
            setValue("");
        }

    }

    const options: AutocompleteOption[] = [];
    if (booklist) {
        for (const book of Array.from(booklist.keys())) {
            options.push({ label: book })
        }
    }

    return (
        <div className="mb-1 px-4">
            <h2 className="text-blue-500 font-fredoka text-2xl 2xl:text-3xl mb-4">
                Search for Books
            </h2>
            <div className="flex gap-4 flex-col sm:flex-row">
                <Autocomplete
                    className="flex-1"
                    onChange={(e, val) => handleSubmit(val)}
                    inputValue={value}
                    onInputChange={(e, val, reason) => setValue(val)}
                    freeSolo
                    options={options}
                    PopperComponent={(props) => {
                        return (
                            <Popper
                                {...props}
                                modifiers={[{
                                    name: "offset",
                                    options: {
                                    offset: [0, 3],
                                    },
                                }]}
                            />
                        )
                    }}
                    renderInput={(params) => {
                        return (
                            <div ref={params.InputProps.ref} className="flex flex-1 relative">
                                <input 
                                    {...params.inputProps}
                                    type="text" 
                                    className="w-full pr-8 pl-2 sm:pl-4 py-3 rounded text-lg sm:text-2xl focus:shadow outline-none border-2 border-gray-300 focus:border-blue-500" 
                                    placeholder="Enter a Title" 
                                />
                            </div>
                        )
                    }}
                />
                <button className="bg-emerald-500 hover:bg-emerald-700 text-white text-xl font-bold py-2 px-4 rounded" onClick={() => handleSubmit(value)}>
                    Search
                </button>
            </div>
        </div>
    )
}

export default BookPicker;