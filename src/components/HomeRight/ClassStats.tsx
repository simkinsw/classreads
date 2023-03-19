import { FC } from "react";
import { Link } from "react-router-dom";
import { useFetchClassStats } from "../../api/useFetchClassStats";

type ClassStatsProps = {
    classCode: string;
}

const ClassStats: FC<ClassStatsProps> = ({ classCode }) => {
    const { data } = useFetchClassStats(classCode);

    return (
        <div className="bg-white rounded-md shadow-md p-6 overflow-hidden">
            <h1 className="text-3xl text-center mb-7 font-fredoka">
                Class Stats
            </h1>
            <div className="flex flex-col gap-10">
                <Stat name="Read this year" value={(data?.readYtd ?? "-") + ""} />
                <Stat name="Read this month" value={(data?.readMtd ?? "-") + ""} />
                <Stat name="Most read book" value={data?.mostRead} link />
                <Stat name="Favorite book" value={data?.favorite} link />
            </div>
        </div>
    )
}

type StatProps = {
    name: string;
    value: string | undefined;
    link?: boolean;
}

export const Stat: FC<StatProps> = ({ name, value, link=false }) => {
    return (
        <div className="flex flex-col text w-full">
            <span className="mr-4 mb-2 text-xl">{name}</span>
            {
                link ?
                <Link className="text-blue-600" to={`/book/${value?.replaceAll(" ", "_")}`}><span className="text-xl 2xl:text-2xl">{value ?? "-"}</span></Link>
                : <span className="text-3xl 2xl:text-4xl">{value ?? "-"}</span>
            }
        </div>
    )
}

export default ClassStats;