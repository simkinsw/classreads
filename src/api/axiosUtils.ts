import axios from "axios";
import { useEffect, useState } from "react";

const BASE_URL = process.env.REACT_APP_PROD_URL!;
const KEY = process.env.REACT_APP_PROD_KEY!;
const OPTIONS = {
    headers: {
        "x-api-key": KEY,
    },
};

export function useCachedGet<T>(path: string, ttl = 300, options = OPTIONS) {
    const [data, setData] = useState<T>();
    const [error, setError] = useState<Error>();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const cacheKey = path;
        const cached = localStorage.getItem(cacheKey);
        const whenCached = localStorage.getItem(cacheKey + ":ts");
        if (ttl > 0 && cached !== null && whenCached !== null) {
            const age = (Date.now() - parseInt(whenCached)) / 1000;
            if (age < ttl) {
                setData(JSON.parse(cached) as T);
                setLoading(false);
            } else {
                localStorage.removeItem(cacheKey);
                localStorage.removeItem(cacheKey + ":ts");
            }
        } else {
            axios
                .get<T>(`${BASE_URL}/${path}`, options)
                .then((response) => {
                    setData(response.data);
                    localStorage.setItem(
                        cacheKey,
                        JSON.stringify(response.data)
                    );
                    localStorage.setItem(
                        cacheKey + ":ts",
                        Date.now().toString()
                    );
                })
                .catch((err) => {
                    setData(undefined);
                    console.log(err);
                    setError(err);
                })
                .finally(() => setLoading(false));
        }
    }, [ttl, path, options]);

    return { data, error, loading };
}

export function post<T>(path: string, body: any, options = OPTIONS) {
    return axios.post<T>(`${BASE_URL}/${path}`, body, options).then(
        (result) => {
            return result;
        },
        (error) => {
            console.log(error);
        }
    );
}

export function get<T>(path: string, options = OPTIONS) {
    return axios.get<T>(`${BASE_URL}/${path}`, options);
}
