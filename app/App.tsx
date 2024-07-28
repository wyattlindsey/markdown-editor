import React from 'react';
import styled, { css } from 'styled-components';
import { Editor } from './views/editor/Editor';

const App: React.FC = () => {
    return (
        <Container>
            <Editor />
        </Container>
    );
};

const BaseStyles = css`
    textarea {
        outline: none;
        margin: 0;
    }
`;

const Container = styled.div`
    ${BaseStyles}
    display: flex;
    justify-content: center;
    align-items: flex-start;
    height: 100vh;
    background-color: lightgray;
`;

export default App;
