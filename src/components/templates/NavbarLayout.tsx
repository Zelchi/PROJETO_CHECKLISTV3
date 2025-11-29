import { type ReactNode } from "react";
import styled from "styled-components";
import Navbar from "../organisms/Navbar";

const Container = styled.main`
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
    width: 100%;
    height: 100%;
    color: var(--color-text-invert);
    background-color: var(--color-bg-alt);
`;

type NavbarLayout = {
    children: ReactNode;
}

export default ({ children }: NavbarLayout) => {
    return (
        <Container>
            <Navbar />
            {children}
        </Container>
    )
}