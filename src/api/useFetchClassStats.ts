import { ClassStats } from "../types/classStats";
import { useCachedGet } from "./axiosUtils";

export function useFetchClassStats(classCode: string){
    const { data, error, loading } = useCachedGet<ClassStats>(`stats/${classCode}`);
    return { data, error, loading };
}