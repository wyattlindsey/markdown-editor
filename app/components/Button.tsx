import React, { FC } from 'react';
import { styled } from 'styled-components';

interface IButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
}

export const Button: FC<IButtonProps> = ({ children, onClick }) => {
    return <StyledButton onClick={onClick}>{children}</StyledButton>;
};

const StyledButton = styled.button`
    font-size: 16px;
    background-color: lightblue;
    border: none;
    padding: 0.5em 1em;

    &:hover {
        background-color: lightgreen;
    }
`;
