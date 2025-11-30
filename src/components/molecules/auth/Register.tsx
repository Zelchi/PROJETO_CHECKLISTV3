// Imports de estilos
import { CardContainer, Title, Subtitle, InputGroup, ButtonGroup, RowGroup, TextAchor } from "./Auth.style";
import Button from "../../atoms/ButtonConfirm";
import Input from "../../atoms/LoginInput";

// Imports React e API
import API, { ENDPOINT } from "../../../utils/API";
import { useState } from "react";

type Register = {
    warn: string;
    error: string;
    setError: (message: string) => void;
    handleWarn: (message: string) => void;
    handleSwitchTypeCard: () => void;
    redirectCard: (type: "login" | "register" | "recover" | "switch_password") => void;
}

export default ({ error, handleSwitchTypeCard, redirectCard, setError, warn, handleWarn }: Register) => {

    const [email, setEmail] = useState("leticia-knudsen@tuamaeaquelaursa.com");
    const [password, setPassword] = useState("Batata123!");
    const [passwordConfirm, setPasswordConfirm] = useState("Batata123!");
    const [isLoading, setIsLoading] = useState(false);
    // const [codeInput, setCodeInput] = useState(false);
    // const [code, setCode] = useState("");

    // const handleCode = async () => {
    //     try {
    //         setIsLoading(true);
    //         const res = await API.POST(ENDPOINT.AUTH_REGISTER, { username, email, password });
    //         if (res.status >= 200 && res.status <= 299) {
    //             handleWarn("Um código de recuperação foi enviado para o seu email.");
    //             setCode("");
    //             setCodeInput(true);
    //         }
    //     } catch {
    //         setError("BATATA");
    //     } finally {
    //         setIsLoading(false);
    //     }
    // }

    const handleRegister = async () => {
        try {
            setIsLoading(true);
            const username = email.split("@")[0];
            const res = await API.POST(ENDPOINT.AUTH_REGISTER, { username, email, password });
            if (res.status >= 200 && res.status <= 299) {
                handleWarn("Conta criada com sucesso!");
                redirectCard("login");
            }
        } catch (err) {
            console.log(err)
            setError("Código inválido.");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <CardContainer>
            {/* {!codeInput && <> */}
            <Title>Criar uma nova conta</Title>
            <Subtitle $isError={error ? true : false}>{warn}</Subtitle>
            <InputGroup>
                <Input type="email" placeholder="Email" value={email} action={setEmail} />
                <Input type="password" placeholder="Senha" value={password} action={setPassword} />
                <Input type="password" placeholder="Confirmar senha" value={passwordConfirm} action={setPasswordConfirm} />
            </InputGroup>
            <ButtonGroup>
                <RowGroup>
                    <TextAchor onClick={() => handleSwitchTypeCard()}>Voltar ao login</TextAchor>
                </RowGroup>
                <Button label="Criar conta" action={handleRegister} disabled={isLoading} />
            </ButtonGroup>
            {/* </>} */}
            {/* {codeInput && <>
                <Title>Codigo</Title>
                <Subtitle $isError={error ? true : false}>{warn}</Subtitle>
                <InputGroup>
                    <Input type="text" placeholder="Código" value={code} action={setCode} />
                </InputGroup>
                <ButtonGroup>
                    <RowGroup>
                        <TextAchor onClick={() => setCodeInput(false)}>Voltar</TextAchor>
                    </RowGroup>
                    <Button label="Criar conta" action={handleRegister} disabled={isLoading} />
                </ButtonGroup>
            </>} */}
        </CardContainer>
    )
}