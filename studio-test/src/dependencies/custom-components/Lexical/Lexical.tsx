import React, {useState, useEffect} from 'react'
import WappizyTheme from "./lexicalTheme";
// import { $getSelection } from "lexical"
import { LexicalComposer } from "@lexical/react/LexicalComposer";
// import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import TreeViewPlugin from "./plugins/TreeViewPlugin";
import ToolbarPlugin from "./plugins/ToolbarPlugin";
import { LocalStoragePlugin } from './plugins/LocalStoragePlugin';
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { TableCellNode, TableNode, TableRowNode } from "@lexical/table";
import { ListItemNode, ListNode } from "@lexical/list";
import { CodeHighlightNode, CodeNode } from "@lexical/code";
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { AutoLinkNode, LinkNode } from "@lexical/link";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin";
import { TRANSFORMERS } from "@lexical/markdown";
import ListMaxIndentLevelPlugin from "./plugins/ListMaxIndentLevelPlugin";
import AutoLinkPlugin from "./plugins/AutoLinkPlugin";
import HtmlSerializerPlugin from "./plugins/HtmlSerializer";


function Placeholder() {
  return <div className="editor-placeholder">Enter some rich text...</div>;
}

const Lexical = (
  {
    "data-editable": dataEditable = true, // read-only or writable
    ...props
  }
  :{
    'data-editable': boolean
  }) => {

    let [html, setHtml] = useState("");

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
      editable: dataEditable,
    };

  return (
    <LexicalComposer initialConfig={editorConfig}>
    <div className="editor-container">
      { dataEditable && <ToolbarPlugin /> }
      <div className={`editor-inner ${dataEditable && 'editable'}`}>
        <RichTextPlugin
          contentEditable={<ContentEditable className="editor-input" />}
          placeholder={<Placeholder />}
          ErrorBoundary={LexicalErrorBoundary}
        />
        <HistoryPlugin />
        {/* <TreeViewPlugin /> */}
        <AutoFocusPlugin />
        <ListPlugin />
        <LinkPlugin />
        <AutoLinkPlugin />
        {/* <LocalStoragePlugin namespace='ahaha' /> */}
        <HtmlSerializerPlugin setHtml={setHtml} />
        <ListMaxIndentLevelPlugin maxDepth={7} />
        <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
      </div>
    </div>
  </LexicalComposer>
  )

}

export default Lexical