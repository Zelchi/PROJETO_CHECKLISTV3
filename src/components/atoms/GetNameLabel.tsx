import { useEffect, useState, useMemo, useCallback } from "react";
import API, { ENDPOINT } from "../../utils/API";

export default () => {
    const [name, setName] = useState<string>("");

    const fetchName = useCallback(async () => {
        try {
            const res = await API.GET(ENDPOINT.AUTH_ACCOUNT);
            if (res.status >= 200 && res.status <= 299) {
                setName(res.data.username);
            }
        } catch { }
    }, [name]);

    useEffect(() => {
        fetchName();
    }, []);

    return useMemo(() => {
        return name ? <p>Bem-vindo, {name}!</p> : <p>Bem-vindo!</p>;
    }, [name]);
}