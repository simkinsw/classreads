import { Autocomplete, Popper, Typography } from "@mui/material";
import { getStudentList } from "../../data/classData";
import { AiOutlineSearch } from "react-icons/ai";
import { useReadLocalStorage } from "usehooks-ts";
import { useFetchBooks } from "../../api/useFetchBooks";
import { BiBook } from "react-icons/bi";
import { BsPerson } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

type AutocompleteOption = {
    label: string;
    type: string;
}

const Search = () => {
    const classCode = useReadLocalStorage<string>("classCode")!
    const { data: books } = useFetchBooks(classCode);
    const studentList = getStudentList(classCode);
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    const options: AutocompleteOption[] = [];
    if (studentList) {
        options.push(...studentList.map((student) => { return { label: student, type: "profile" }}));
    }
    if (books) {
        for (const book of Array.from(books.keys())) {
            options.push({ label: book, type: "book" })
        }
    }

    const handleChange = (_e: any, option: AutocompleteOption | null, _r: any) => {
        setOpen(false);
        if(option) navigate(`/${option.type}/${option.label}`);
    }

    const handleInputChange = (e: any, value: string, r: string) => {
        if (value === "") {
            setOpen(false);
        } else {
            setOpen(true);
        }
    }   

    return (
        <div className="flex-1 hidden lg:block">
            <div className="flex justify-center w-128 mx-auto"> 
                <Autocomplete
                    options={options}
                    isOptionEqualToValue={(option, value) => option.label === value.label}
                    onChange={handleChange}
                    onInputChange={handleInputChange}
                    PopperComponent={(props) => {
                        return (
                            <Popper
                                {...props}
                                open={open}
                                modifiers={[
                                {
                                    name: "offset",
                                    options: {
                                        offset: [0, 6],
                                    },
                                },
                                ]}
                            >
                            </Popper>
                        )
                    }}
                    ListboxProps={{
                        style: {
                            maxHeight: "10rem"
                        },
                    }}
                    sx={{ width: 300 }}
                    renderOption={(props, option, state) => {
                        return (    
                            <li {...props}>
                                <div className={"flex gap-2 items-center text-lg cursor-pointer text-gray-700"}>
                                    {option.type === "book" ? <BiBook /> : <BsPerson />}
                                    <div className="max-w-[235px]"><Typography noWrap>{option.label}</Typography></div>
                                </div>
                            </li>
                        )
                    }}
                    renderInput={(params) => {
                        return (
                            <div ref={params.InputProps.ref} className="flex flex-1 relative">
                                <input 
                                    {...params.inputProps}
                                    type="text" 
                                    className="h-12 w-full pr-8 pl-4 z-0 rounded text-lg focus:shadow outline-none focus:outline-black focus:outline-1.5" 
                                    placeholder="Type to search..." 
                                />
                                <AiOutlineSearch className="w-7 h-7 absolute fill-gray-400 right-2 translate-y-2" />
                            </div>
                        )
                    }}
                />
            </div>
        </div>
    )
}

export default Search;