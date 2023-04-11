import {$getRoot, $insertNodes} from 'lexical';
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $generateNodesFromDOM } from "@lexical/html";
import { useEffect, useState } from "react";
import { isJsonString } from '../../../utils/misc'

/* @ts-ignore */
export default function HtmlInitialStatePlugin({html}) {

  const [firstTime, setFirstTime] = useState(true)
  const [editor] = useLexicalComposerContext();


  useEffect(() => {

    if (firstTime) {

      setFirstTime(false)

      editor.update(() => {
        // In the browser you can use the native DOMParser API to parse the HTML string.
        const parser = new DOMParser();
        const parseHtml = isJsonString(html) ? JSON.parse(html) : html || ''
        const dom = parser.parseFromString(parseHtml, "text/html");
        // Once you have the DOM instance it's easy to generate LexicalNodes.
        const nodes = $generateNodesFromDOM(editor, dom);
        // Select the root
        $getRoot().select();
        // Insert them at a selection.
        $insertNodes(nodes);
      });
    }

  }, [editor, firstTime, html]);

  return null
}
