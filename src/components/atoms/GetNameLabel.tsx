import { useEffect, useState, useMemo, useCallback } from "react";
import API, { ENDPOINT } from "@/utils/API";

export default () => {
    const [name, setName] = useState<string>("");

    const fetchName = useCallback(async () => {
        try {
            const res = await API.GET(`${ENDPOINT.AUTH_ACCOUNT}/${1}`);
            console.log(res)
            if (res.status >= 200 && res.status <= 299) {
                setName(res.data.username ?? "Batata");
            }
        } catch {
            console.log("Erro ao buscar o nome do usuário");
        }
    }, [name]);

    useEffect(() => {
        fetchName();
    }, []);

    console.log(name)

    return useMemo(() => {
        return name ? <p>Bem-vindo, {name}!</p> : <p>Bem-vindo!</p>;
    }, [name]);
}