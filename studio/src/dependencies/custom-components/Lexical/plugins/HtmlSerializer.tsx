import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $generateHtmlFromNodes } from "@lexical/html";
import { useEffect, useState } from "react";

/* @ts-ignore */
export default function HtmlSerializerPlugin({setHtml}) {
  const [editor] = useLexicalComposerContext();
  
  useEffect(() => {
    const removeUpdateListener = editor.registerUpdateListener(
      ({ editorState }) => {
        editorState.read(() => {
          const htmlString = $generateHtmlFromNodes(editor, null);
          setHtml(htmlString);
          // Do something.
        });
      }
    );
    return () => {
      removeUpdateListener();
    };
  }, [editor, setHtml]);

  return null
}
