import Navbar from "../components/molecules/home/Navbar";
import styled from "styled-components";

const Container = styled.main`
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
    width: 100%;
    min-height: 100%;
    color: var(--color-text-invert);
    background-color: var(--color-bg-alt);
`;

export default () => {
    return (
        <Container>
            <Navbar />
        </Container>
    )
}