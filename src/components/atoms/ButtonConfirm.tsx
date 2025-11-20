import styled from "styled-components";

const Button = styled.button`
    width: 100%;
    height: 100%;
    min-height: 44px;
    padding: 10px 14px;
    font-size: 15px;
    color: var(--color-text);
    background: var(--color-accent);
    border: none;
    outline: none;
    border-radius: 10px;
    transition: ease-in-out 100ms;
    font-family: "Delius", cursive;

    &:hover {
        cursor: pointer;
        transform: scale(1.01);
    }

    &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
        transform: none;
    }
`

type ButtonConfirm = {
    action: () => void;
    type?: "button" | "submit" | "reset";
    label?: string;
    disabled?: boolean;
}

export default ({ action, type, label, disabled }: ButtonConfirm) => {
    return (
        <Button type={type} onClick={(e) => { e.preventDefault(); action(); }} disabled={disabled}>
            {label}
        </Button>
    )
}