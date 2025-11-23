// Imports de estilos
import { CardContainer, Title, Subtitle, InputGroup, ButtonGroup, RowGroup, TextAchor } from "./Auth.style";
import Button from "../../atoms/ButtonConfirm";
import Input from "../../atoms/LoginInput";

// Imports React e API
import API from "../../../utils/API";
import { useState } from "react";
import { ENDPOINT } from '../../../utils/ENDPOINT';

type Register = {
    warn: string;
    error: string;
    setError: (message: string) => void;
    handleWarn: (message: string) => void;
    handleSwitchTypeCard: () => void;
    redirectCard: (type: "login" | "register" | "recover" | "switch_password") => void;
}

export default ({ error, handleSwitchTypeCard, redirectCard, setError, warn, handleWarn }: Register) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleRegister = async () => {
        if (password !== passwordConfirm) {
            setError("As senhas não coincidem.");
            return;
        }
        try {
            setIsLoading(true);
            const res = await API.POST(ENDPOINT.AUTH_REGISTER, { username: email.split("@")[0], email, password });
            if (res.status >= 200 && res.status <= 299) {
                handleWarn("Conta criada com sucesso. Agora você pode entrar.");
                redirectCard("login");
            } else {
                setError("Erro ao criar a conta.");
            }
        } catch {
            setError("Erro ao criar a conta.");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <CardContainer>
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
        </CardContainer>
    )
}