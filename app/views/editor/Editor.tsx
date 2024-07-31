import React, { useEffect, useState } from 'react';
import Markdown from 'react-markdown';
import styled, { css } from 'styled-components';
import { Button } from '../../components/Button';

export const Editor: React.FC = () => {
    const textAreaRef = React.useRef<HTMLTextAreaElement>(null);

    const [text, setText] = useState('');

    useEffect(() => {
        textAreaRef.current?.focus();
    }, []);

    useEffect(() => {
        window.ipcRenderer.on('file-opened', (_, text) => {
            setText(text);
        });
    }, []);

    const handleChange = () => {
        setText(textAreaRef.current?.value ?? '');
    };

    const handleLoadClick = () => {
        window.electronAPI?.openFileDialog();
    };

    return (
        <Outer>
            <Toolbar>
                <StyledButton onClick={handleLoadClick}>Load</StyledButton>
                <StyledButton>Save</StyledButton>
            </Toolbar>
            <Panes>
                <RawMarkdown
                    onChange={handleChange}
                    ref={textAreaRef}
                    value={text}
                />
                <RenderedHtml>
                    <Markdown>{text}</Markdown>
                </RenderedHtml>
            </Panes>
        </Outer>
    );
};

const Outer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
`;

const Toolbar = styled.div`
    display: flex;
    justify-content: space-between;
    background-color: darkgray;
    color: white;
    padding: 16px;
`;

const StyledButton = styled(Button)`
    margin-right: 16px;
`;

const Panes = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 100%;
`;

const Pane = css`
    min-height: 100%;
    max-width: 50%;
    flex-grow: 1;
    padding: 1em;
    overflow: scroll;
    font-size: 16px;
`;

const RawMarkdown = styled.textarea`
    ${Pane}
    background-color: lightgray;
`;

const RenderedHtml = styled.div`
    ${Pane}
    background-color: white;
`;
