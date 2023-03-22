import { FC, FormEvent, useState } from "react";
import { useLocalStorage } from "usehooks-ts";
import classData from "../../data/classData";

type ClassCodeSelectProps = {
    setCode: (code: string) => void;
}

const ClassCodeSelect: FC<ClassCodeSelectProps> = ({ setCode }) => {
    const [text, setText] = useState("");
    const [validCode, setValidCode] = useState(true);
    const [, setTeacher] = useLocalStorage("teacher", false)

    const handleSubmit = (event?: FormEvent<HTMLFormElement>) => {
        if(event) event.preventDefault();
        const newCode = text.toLowerCase();
        if(classData.has(newCode)) {
            setTeacher(newCode.toLowerCase().includes("teacher"));
            setCode(text.toLowerCase().replace("teacher", ""));
        } else {
            setValidCode(false);
            setText("");
        }
    }

    return (
        <div className="pt-16 sm:pt-32 md:pt-48 sm:px-2">
            <div className="bg-white rounded-md sm:shadow-md py-16 sm:px-16 w-full lg:w-2/3 xl:w-3/5 2xl:w-1/2 mx-auto flex flex-col items-center">
                <div className="text-3xl sm:text-4xl md:text-5xl text-blue-500 font-fredoka mb-12">
                    Enter Your Class Code
                </div>
                <div className="flex flex-col mb-6">
                    <div className="flex flex-col sm:flex-row items-center gap-2">
                        <form 
                            className={
                                "border-2 border-gray-400 rounded-lg px-2 py-2 text-xl w-64" +
                                (!validCode && "border-red-500")
                            }
                            onSubmit={handleSubmit}
                        >
                            <input 
                                className="outline-0"
                                type="text"
                                placeholder={"xyz123"}
                                value={text}
                                onChange={(e) => {
                                    setValidCode(true);
                                    setText(e.target.value)
                                }}
                            />
                        </form>
                        <button className="bg-blue-500 hover:bg-blue-700 text-white text-xl font-bold py-2 px-4 w-16 rounded" onClick={() => handleSubmit()}>
                            Go!
                        </button>
                    </div>
                    <div className="h-6 mb-1 sm:mt-1 sm:mb-0 text-red-500 -order-1 sm:order-1">
                        {!validCode && "Invalid Code"}
                    </div>
                </div>
                <div className="sm:text-center text-lg">
                    <div>Don't know your class code? </div>
                    <div>Ask your teacher for help.</div>
                </div>
            </div>
        </div>
    )
}

export default ClassCodeSelect;