import AddTasks from "../organisms/TasksAdd"
import styled from "styled-components"
import ViewTasks from "../organisms/TasksView";
import { useState } from "react";

const Scroll = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
    width: 100%;
    height: 100%;
    overflow-y: auto;
`;

const Container = styled.main`
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
    color: var(--color-text-invert);
    background-color: var(--color-bg-alt);
    padding: 20px;
    gap: 20px;
    width: 60%;
    height: auto;
    @media (max-width: 1300px) {
        width: 80%;
    }
    @media (max-width: 800px) {
        width: 100%;
    }
`;

export default () => {
    const [sync, setSync] = useState<boolean>(false);

    return (
        <Scroll>
            <Container>
                <AddTasks sync={sync} setSync={setSync} />
                <ViewTasks sync={sync} setSync={setSync} />
            </Container >
        </Scroll >
    )
}