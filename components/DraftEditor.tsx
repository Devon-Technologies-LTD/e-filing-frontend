'use client';

import React, { useState } from 'react';
import { Editor, EditorState, RichUtils } from 'draft-js';
import 'draft-js/dist/Draft.css';

const DraftEditor: React.FC = () => {
    const [editorState, setEditorState] = useState(EditorState.createEmpty());

    // Handle editor state change
    const handleEditorChange = (state: EditorState) => {
        setEditorState(state);
    };

    // Handle text formatting
    const handleKeyCommand = (command: string, state: EditorState) => {
        const newState = RichUtils.handleKeyCommand(state, command);
        if (newState) {
            setEditorState(newState);
            return 'handled';
        }
        return 'not-handled';
    };

    // Apply inline styles (bold, italic)
    const applyStyle = (style: string) => {
        setEditorState(RichUtils.toggleInlineStyle(editorState, style));
    };

    return (
        <div className="border border-gray-300 p-4 rounded-md shadow-sm">
            <div className="mb-2 flex gap-2">
                <button
                    onClick={() => applyStyle('BOLD')}
                    className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Bold
                </button>
                <button
                    onClick={() => applyStyle('ITALIC')}
                    className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                >
                    Italic
                </button>
            </div>
            <div className="border p-2 rounded bg-white">
                <Editor
                    editorState={editorState}
                    onChange={handleEditorChange}
                    handleKeyCommand={handleKeyCommand}
                    placeholder="Start typing..."
                />
            </div>
        </div>
    );
};

export default DraftEditor;
