import { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import LoginCard from "../../organisms/AuthCard";
import { ArrowDown } from "lucide-react"

// #region Styles
const Home = styled.main`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: auto;
`;

const FrameText = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100dvh;
    color: var(--color-text);
    padding: 0px 20px;
    background-image:
        radial-gradient(360px 360px at 0 0, var(--color-accent), transparent 100%),
        radial-gradient(360px 360px at 100% 100%, var(--color-accent), transparent 100%);
    gap: 20px;
    text-align: center;
    font-family: "Delius", cursive;

    h1 {
        font-size: 30px;
        font-weight: normal;
        user-select: none;
    }

    p {
        font-size: 20px;
        user-select: none;
    }
`;

const Button = styled(ArrowDown) <{ $show: boolean }>`
    position: absolute;
    bottom: 40px;
    width: 56px;
    height: 56px;
    border-radius: 50%;
    border: none;
    display: ${props => props.$show ? 'flex' : 'none'};
    transition: background 0.2s;
    animation: bounce 1.2s infinite;

    @keyframes bounce {
        0%, 100% { bottom: 40px; }
        50% { bottom: 70px; }
    }
`;

const FrameLogin = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: auto;
    background-color: var(--color-bg-alt);
    color: var(--color-text-invert);
`;
// #endregion

// #region Componente
export default () => {
    const loginRef = useRef<HTMLDivElement>(null);
    const [buttonVisible, setButtonVisible] = useState(true);

    const scrollToLogin = () => {
        loginRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        const handleScroll = (e: any) => {
            if (e.target.scrollTop > e.target.clientHeight / 4) {
                setButtonVisible(false);
            } else {
                setButtonVisible(true);
            }
        }
        document.querySelector("#root")?.addEventListener("scroll", handleScroll);
        return () => document.body.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <Home>
            <FrameText>
                <h1>Organize o seu dia!</h1>
                <p>Concentre-se no que realmente importa e alcance suas metas com mais clareza.</p>
                <Button
                    onClick={scrollToLogin}
                    $show={buttonVisible}
                />
            </FrameText>
            <FrameLogin ref={loginRef}>
                <LoginCard />
            </FrameLogin>
        </Home>
    );
}
// #endregion