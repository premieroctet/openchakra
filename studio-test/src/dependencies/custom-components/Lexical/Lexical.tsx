import React, { useState } from 'react'
import { Flex } from '@chakra-ui/react'
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { $generateHtmlFromNodes } from "@lexical/html";
import { AutoLinkNode, LinkNode } from "@lexical/link";
import { CodeHighlightNode, CodeNode } from "@lexical/code";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { ListItemNode, ListNode } from "@lexical/list";
import { TRANSFORMERS } from "@lexical/markdown";
import { TableCellNode, TableNode, TableRowNode } from "@lexical/table";

import AutoLinkPlugin from "./plugins/AutoLinkPlugin";
import HtmlInitialStatePlugin from './plugins/HtmlInitialStatePlugin';
import ListMaxIndentLevelPlugin from "./plugins/ListMaxIndentLevelPlugin";
import ToolbarPlugin from "./plugins/ToolbarPlugin";
import WappizyTheme from "./lexicalTheme";

function Placeholder() {
  return <div className="editor-placeholder">Tapez...</div>;
}

const Lexical = (
  {
    isEditable = false, // read-only or writable
    name,
    value,
    attribute,
    onChange,
    id,
    ...rest
  }
    : {
      isEditable: boolean
      name: string
      value: string
      attribute: string
      onChange: any,
      id: string,
    }) => {

  const [html, setHtml] = useState(value || '');

  // Editor changed : convert to HTML & send call onChange if defined
  const onChangeFn = (_:any, editor: any) => {
    editor.update(() => {
      const rawHTML = $generateHtmlFromNodes(editor, null)
      setHtml(rawHTML);
      if (onChange) {
        const event = { target: { name: name, value: rawHTML } }
        onChange(event)
      }
    })
  }

const editorConfig = {
  namespace: 'Waou',
  theme: WappizyTheme,
  // Handling of errors during update
  onError(error: Error) {
    throw error;
  },
  // Any custom nodes go here
  nodes: [
    HeadingNode,
    ListNode,
    ListItemNode,
    QuoteNode,
    CodeNode,
    CodeHighlightNode,
    TableNode,
    TableCellNode,
    TableRowNode,
    AutoLinkNode,
    LinkNode
  ],
  editable: isEditable,
};

// TODO add all properties to root returned component
const props={id, value: html, ...rest}
return (
  <Flex {...props}>
    <LexicalComposer initialConfig={editorConfig} >
      <div className="editor-container" >
        {isEditable && <ToolbarPlugin />}
        <div className={`editor-inner ${isEditable && 'editable'}`}>
          <RichTextPlugin
            contentEditable={<ContentEditable className="editor-input" />}
            placeholder={<Placeholder />}
            ErrorBoundary={LexicalErrorBoundary}
          />
          <HistoryPlugin />
          <AutoFocusPlugin />
          <ListPlugin />
          <LinkPlugin />
          <AutoLinkPlugin />
          <ListMaxIndentLevelPlugin maxDepth={7} />
          <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
          <OnChangePlugin onChange={onChangeFn} />
          <HtmlInitialStatePlugin html={html} />
        </div>
      </div>
    </LexicalComposer>
  </Flex>
)

}

export default Lexical
