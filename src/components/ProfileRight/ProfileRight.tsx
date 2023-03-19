import { FC } from "react";
import Avatar from "../Avatar";
import { Stat } from "../HomeRight/ClassStats";

type ProfileRightProps = {
    user: string;
    readYtd: number,
    readMtd: number
}

const ProfileRight: FC<ProfileRightProps> = ({ user, readMtd, readYtd }) => {
    return (
        <>
            <div className="bg-white rounded-md overflow-hidden shadow-md flex flex-col items-center gap-6 relative">
                <div className="absolute mt-6">
                    <Avatar user={user} size={40} customClass="border-4 border-white shadow-md" />
                </div>
                <div className="flex w-full bg-blue-500 h-[108px] items-center" />
                <h1 className="font-fredoka text-3xl 2xl:text-4xl self-stretch mx-6 pb-3 text-center mt-16 border-b border-b-gray-300">
                    {user}
                </h1>
                <div className="flex flex-col gap-6 self-start mb-6 ml-6">
                    <Stat name="Read this year" value={readYtd + ""} />
                    <Stat name="Read this month" value={readMtd + ""} />
                </div>
            </div>
        </>
    )
}

export default ProfileRight;