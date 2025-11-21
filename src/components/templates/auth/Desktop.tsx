import styled from "styled-components";
import LoginCard from "../../organisms/AuthCard";
import { useEffect, useRef, useState } from "react";

// #region Styles
const Home = styled.main`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
`;

const FrameText = styled.div<{ $ax: number; $ay: number; $bx: number; $by: number }>`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 60%;
    color: var(--color-text);
    background-image:
        radial-gradient(360px 360px at ${({ $ax }) => $ax}% ${({ $ay }) => $ay}%, var(--color-accent), transparent 100%),
        radial-gradient(360px 360px at ${({ $bx }) => $bx}% ${({ $by }) => $by}%, var(--color-accent), transparent 100%);

    gap: 20px;
    text-align: center;
    font-family: "Delius", cursive;

    h1 {
        font-size: 60px;
        user-select: none;
        font-weight: normal;
    }

    p {
        font-size: 20px;
        user-select: none;
    }
`;

const FrameLogin = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 40%;

    background-color: var(--color-bg-alt);
    color: var(--color-text-invert);
`;
// #endregion

// #region Componente
export default () => {
    const [angle, setAngle] = useState(0);
    const rafRef = useRef<number | null>(null);

    // ----------------------------------------------------------
    // Parâmetros da animação de fundo (raio, velocidade, conversão)
    // radius: controla a distância do gradiente em relação ao centro (em porcentagem base)
    // speed: quantos graus o gradiente se move a cada quadro
    // deg: fator de conversão graus -> radianos para funções trigonométricas
    // ----------------------------------------------------------
    const radius = 60;
    const speed = 0.8;
    const deg = Math.PI / 180;

    // useEffect para controlar o loop de animação com requestAnimationFrame
    // - atualiza o ângulo continuamente
    // - reinicia quando atinge 360 para não crescer indefinidamente
    // - armazena id na ref para cancelar no unmount
    useEffect(() => {
        const loop = () => {
            setAngle(prev => prev >= 360 ? 0 : prev + speed);
            rafRef.current = requestAnimationFrame(loop);
        };

        // Inicia o loop
        rafRef.current = requestAnimationFrame(loop);

        // Cleanup: cancela requestAnimationFrame ao desmontar o componente
        return () => {
            if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
        };
    }, []);

    // ----------------------------------------------------------
    // Cálculo das posições dos centros dos gradientes radiais:
    // - ax/ay: posição do primeiro gradiente (em %)
    // - bx/by: posição do segundo gradiente (oposto no círculo: angle + 180)
    // As posições usam cos/sin com base no ângulo atual para criar movimento circular.
    // toFixed(2) limita a precisão para manter valores estáveis entre renders.
    // ----------------------------------------------------------
    const ax = Number((50 + Math.cos(angle * deg) * radius).toFixed(2));
    const ay = Number((50 + Math.sin(angle * deg) * radius).toFixed(2));
    const bx = Number((50 + Math.cos((angle + 180) * deg) * radius).toFixed(2));
    const by = Number((50 + Math.sin((angle + 180) * deg) * radius).toFixed(2));

    return (
        <Home>
            <FrameText $ax={ax} $ay={ay} $bx={bx} $by={by}>
                <h1>Organize o seu dia!</h1>
                <p>Concentre-se no que realmente importa e alcance suas metas com mais clareza.</p>
            </FrameText>
            <FrameLogin>
                <LoginCard />
            </FrameLogin>
        </Home>
    );
}
// #endregion