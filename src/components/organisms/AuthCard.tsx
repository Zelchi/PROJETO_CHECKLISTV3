import { redirect } from '@tanstack/react-router'
import { useState, useEffect } from "react"
import styled from "styled-components";
import Input from "../atoms/LoginInput";
import Button from "../atoms/ButtonConfirm";
import API, { Coockie } from "../../utils/API";
import { Endpoints } from '../../utils/Endpoints';

// #region Estilos
const CardContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 500px;
    height: auto;
    gap: 30px;
    border-radius: 5px;
    border: 1px solid var(--color-border-alt);
    background-color: var(--color-bg-alt-alt);
    padding: 40px 0px;
    user-select: none;

    @media (max-width: 1300px) {
        padding-top: 100px;
        padding-bottom: 100px;
        width: 100%;
    }
`;

const Title = styled.h1`
    width: 95%;
    padding-top: 20px;
    height: 0px;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    text-decoration: underline;
`

const Subtitle = styled.p<{ $isError: boolean }>`
    width: 95%;
    height: 0px;
    top: 20px;
    position: relative;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${props => props.$isError ? 'var(--color-error)' : 'var(--color-success)'};
    font-size: 20px;
`;

const InputGroup = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 70%;
    height: 250px;
`;

const ButtonGroup = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 70%;
    height: auto;
`;

const RowGroup = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 10px;
    padding: 10px 0px;
    margin-bottom: 8px;
    gap: 20px;
`;

const TextAchor = styled.a`
    color: var(--color-accent);
    font-size: 20px;
    user-select: none;
    &:hover {
        cursor: pointer;
        color: var(--color-accent-hover);
    }
`;
// #endregion

// #region Componente
export default () => {

    const [CardType, setCardType] = useState<"login" | "register" | "recover" | "switch_password">("login");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [code, setCode] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [recoverButtonDisabled, setRecoverButtonDisabled] = useState(true);
    const [showCodeInput, setShowCodeInput] = useState(false);
    const [error, setError] = useState("");
    const [warn, setWarn] = useState("");

    const handleSwitchTypeCard = () => {
        if (CardType == "login") return setCardType("register");
        if (CardType == "register") return setCardType("login");
        if (CardType == "recover") return setCardType("login");
    }

    // Coloca os erros no aviso
    useEffect(() => {
        setWarn(error);
    }, [error]);

    // Limpa os avisos depois de 10 segundos
    useEffect(() => {
        const timer = setTimeout(() => {
            setWarn("");
            setError("");
        }, 10000);
        return () => clearTimeout(timer);
    }, [warn, error]);

    // Limpa os avisos para dar os avisos de sucesso ou aviso de aviso
    const aviso = (message: string) => {
        setError("");
        setWarn(message);
    }

    // Handle do login
    const handleLogin = async () => {
        try {
            setIsLoading(true);
            const res = await API.POST(Endpoints.AUTH_LOGIN, { email, password });
            if (res.status === 200) {
                Coockie.setToken(res.data.token);
                throw redirect({ to: '/' });
            } else {
                setError("Erro ao entrar na conta.");
            }
        } catch {
            setError("Erro ao entrar na conta.");
        } finally {
            setIsLoading(false);
        }
    }

    // Handle de registro
    const handleRegister = async () => {
        if (password !== passwordConfirm) {
            setError("As senhas não coincidem.");
            return;
        }
        try {
            setIsLoading(true);
            const res = await API.POST(Endpoints.AUTH_REGISTER, { email, password });
            if (res.status === 201) {
                aviso("Conta criada com sucesso. Agora você pode entrar.");
                setCardType("login");
            } else {
                setError("Erro ao criar a conta.");
            }
        } catch {
            setError("Erro ao criar a conta.");
        } finally {
            setIsLoading(false);
        }
    }

    const handleCodeReq = async () => {
        try {
            const res = await API.POST(Endpoints.AUTH_RECOVER, { email });
            if (res.status === 200) {
                aviso("Um código de recuperação foi enviado para o seu email.");
            } else {

            }
        } catch {
            setError("Email não cadastrado.");
        }
    }

    const handleRecover = async () => {
        try {
            const res = await API.POST(Endpoints.AUTH_RECOVER_COMFIRM, { email, code });
            if (res.status === 200) {
                setCardType("switch_password");
            } else {

            }
        } catch { }
    }

    const handleSwitchPassword = async () => {
        try {
            const res = await API.POST(Endpoints.AUTH_RECOVER_COMFIRM, { email, code, password });
            if (res.status === 200) {
                setCardType("login");
            } else {

            }
        } catch { };
    }

    useEffect(() => {
        if (CardType !== "recover") return;

        if (email.length > 8 && email.includes("@")) {

            const codeReqInterval = setTimeout(() => {
                handleCodeReq();
            }, 2000);
            const codeInputInterval = setTimeout(() => {
                setShowCodeInput(true);
            }, 6000);

            return () => { clearInterval(codeInputInterval); clearInterval(codeReqInterval); };
        } else {
            setShowCodeInput(false);
        }

    }, [email]);

    useEffect(() => {
        if (CardType !== "recover") return;
        if (code.length >= 6) return setRecoverButtonDisabled(false);
        setRecoverButtonDisabled(true);
    }, [code]);

    if (CardType == "login") {
        return (
            <CardContainer>
                <Title>Entrar na conta</Title>
                <Subtitle $isError={error ? true : false}>{warn}</Subtitle>
                <InputGroup>
                    <Input type="email" placeholder="Email" value={email} action={setEmail} />
                    <Input type="password" placeholder="Senha" value={password} action={setPassword} />
                </InputGroup>
                <ButtonGroup>
                    <RowGroup>
                        <TextAchor onClick={() => handleSwitchTypeCard()}>Registre-se</TextAchor>
                        <TextAchor onClick={() => { setEmail(""); setCardType("recover") }}>Esqueceu sua senha?</TextAchor>
                    </RowGroup>
                    <Button label="Entrar" action={handleLogin} disabled={isLoading} />
                </ButtonGroup>
            </CardContainer>
        )
    }

    if (CardType == "register") {
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

    if (CardType == "recover") {
        return (
            <CardContainer>
                <Title>Recuperação de senha</Title>
                <Subtitle $isError={error ? true : false}>{warn}</Subtitle>
                <InputGroup>
                    <Input type="email" placeholder="Email" value={email} action={setEmail} />
                    {showCodeInput && <Input type="text" placeholder="Código" value={code} action={setCode} />}
                </InputGroup>
                <ButtonGroup>
                    <RowGroup>
                        <TextAchor onClick={() => setCardType("login")}>Voltar ao login</TextAchor>
                    </RowGroup>
                    <Button label="Enviar" action={handleRecover} disabled={recoverButtonDisabled} />
                </ButtonGroup>
            </CardContainer>
        )
    }

    if (CardType == "switch_password") {
        return (
            <CardContainer>
                <Title>Nova senha</Title>
                <Subtitle $isError={error ? true : false}>{warn}</Subtitle>
                <InputGroup>
                    <Input type="password" placeholder="Senha" value={password} action={setPassword} />
                    <Input type="password" placeholder="Confirmar senha" value={passwordConfirm} action={setPasswordConfirm} />
                </InputGroup>
                <ButtonGroup>
                    <RowGroup />
                    <Button label="Confirmar" action={handleSwitchPassword} disabled={recoverButtonDisabled} />
                </ButtonGroup>
            </CardContainer>
        )
    }

    return null;
}
// #endregion