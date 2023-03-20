import {$getRoot, $insertNodes} from 'lexical';
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $generateHtmlFromNodes, $generateNodesFromDOM } from "@lexical/html";
import { useEffect, useState } from "react";
import { isJsonString } from '../../../utils/misc'

/* @ts-ignore */
export default function HtmlSerializerPlugin({html, setHtml, contentByEditor}) {

  const [firstTime, setFirstTime] = useState(true)
  const [editor] = useLexicalComposerContext();
  
  useEffect(() => {

    console.log(html, isJsonString(html))

    if (firstTime) {

      setFirstTime(false)

      editor.update(() => {
        // In the browser you can use the native DOMParser API to parse the HTML string.
        const parser = new DOMParser();
        const parseHtml = contentByEditor ? html : (isJsonString(html) && JSON.parse(html)) || ""
        const dom = parser.parseFromString(parseHtml, "text/html");
      
        // Once you have the DOM instance it's easy to generate LexicalNodes.
        const nodes = $generateNodesFromDOM(editor, dom);
      
        // Select the root
        $getRoot().select();
      
        // Insert them at a selection.
        $insertNodes(nodes);
      });

    }


    const removeUpdateListener = editor.registerUpdateListener(
      ({ editorState }) => {
        editorState.read(() => {
          const htmlString = $generateHtmlFromNodes(editor, null);
          const htmlStringified = JSON.stringify(htmlString)
          setHtml(htmlStringified);
        });
      }
    );
    return () => {
      removeUpdateListener();
    };
  }, [contentByEditor, editor, firstTime, html, setHtml]);

  return null
}
