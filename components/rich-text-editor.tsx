import { Editor, EditorState, RichUtils } from "draft-js";
import { useCallback } from "react";
import { BoldIcon, ItalicIcon, UnderlineIcon } from "lucide-react";

export interface RichTextEditorProps {
  editorState: EditorState;
  setEditorState: (state: EditorState) => void;
}

export const RichTextEditor = ({
  editorState,
  setEditorState,
}: RichTextEditorProps) => {
  const handleKeyCommand = useCallback(
    (command: string, editorState: EditorState) => {
      const newState = RichUtils.handleKeyCommand(editorState, command);
      if (newState) {
        setEditorState(newState);
        return "handled";
      }
      return "not-handled";
    },
    [setEditorState]
  );

  const onStyleClick = (style: string) => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, style));
  };

  return (
    <div className="border rounded-md bg-white">
      <div className="border m-3 p-2 flex gap-2">
        <button
          onClick={() => onStyleClick("BOLD")}
          className="p-2 hover:bg-gray-100 rounded"
        >
          <BoldIcon className="h-4 w-4" />
        </button>
        <button
          onClick={() => onStyleClick("ITALIC")}
          className="p-2 hover:bg-gray-100 rounded"
        >
          <ItalicIcon className="h-4 w-4" />
        </button>
        <button
          onClick={() => onStyleClick("UNDERLINE")}
          className="p-2 hover:bg-gray-100 rounded"
        >
          <UnderlineIcon className="h-4 w-4" />
        </button>
      </div>
      <div className="p-4 h-60  bg-white">
        <Editor
          editorState={editorState}
          onChange={setEditorState}
          handleKeyCommand={handleKeyCommand}
          placeholder="Start Typing Content here..."
        />
      </div>
    </div>
  );
};
