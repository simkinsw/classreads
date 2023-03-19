import { FC, FormEvent, useState } from "react";
import classData from "../../data/classData";

type ClassCodeSelectProps = {
    setCode: (code: string) => void;
}

const ClassCodeSelect: FC<ClassCodeSelectProps> = ({ setCode }) => {
    const [text, setText] = useState("");
    const [validCode, setValidCode] = useState(true);

    const handleSubmit = (event?: FormEvent<HTMLFormElement>) => {
        if(event) event.preventDefault();
        const newCode = text.toLowerCase();
        if(classData.has(newCode)) {
            setCode(text.toLowerCase());
        } else {
            setValidCode(false);
            setText("");
        }
    }

    return (
        <div className="pt-48 px-2">
            <div className="bg-white rounded-md shadow-md p-16 w-full lg:w-2/3 xl:w-3/5 2xl:w-1/2 mx-auto flex flex-col items-center">
                <div className="text-4xl md:text-5xl text-blue-500 font-fredoka mb-12">
                    Enter Your Class Code
                </div>
                <div className="flex gap-2">
                    <form 
                        className={
                            "border-2 border-gray-400 rounded-lg px-2 py-2 text-xl w-64 " +
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
                <div className="h-6 mt-1 mb-6 self-start ml-36 pl-1 text-red-500">
                    {!validCode && "Invalid Code"}
                </div>
                <div className="text-center text-lg">
                    <div>
                        Don't know your class code? 
                    </div>
                    <div>
                        Ask your teacher for help.
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ClassCodeSelect;