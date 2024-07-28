import React, { useEffect, useState } from 'react';
import Markdown from 'react-markdown';
import styled, { css } from 'styled-components';

export const Editor: React.FC = () => {
    const textAreaRef = React.useRef<HTMLTextAreaElement>(null);

    const [text, setText] = useState('');

    useEffect(() => {
        textAreaRef.current?.focus();
    }, []);

    const handleKeyUp = () => {
        setText(textAreaRef.current?.value ?? '');
    };

    return (
        <Outer>
            <Toolbar>
                <button>Save</button>
                <button>Load</button>
            </Toolbar>
            <Panes>
                <RawMarkdown onKeyUp={handleKeyUp} ref={textAreaRef} />
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
    background-color: darkgray;
    color: white;
    padding: 16px;
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
