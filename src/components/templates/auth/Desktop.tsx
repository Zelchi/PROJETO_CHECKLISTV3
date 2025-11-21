import styled from "styled-components";
import LoginCard from "../../organisms/AuthCard";

// #region Styles
const Home = styled.main`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
`;

const FrameText = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 60%;
    color: var(--color-text);
    background-image:
        radial-gradient(360px 360px at 0 0, var(--color-accent), transparent 100%),
        radial-gradient(360px 360px at 100% 100%, var(--color-accent), transparent 100%);

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
    return (
        <Home>
            <FrameText>
                <h1>Organize o seu dia!</h1>
                <p>Concentre-se no que realmente importa e alcance suas metas com mais clareza.</p>
            </FrameText>
            <FrameLogin>
                <LoginCard />
            </FrameLogin>
        </Home>
    )
}
// #endregion