import React, {useState} from 'react'
import WappizyTheme from "./lexicalTheme";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import TreeViewPlugin from "./plugins/TreeViewPlugin";
import ToolbarPlugin from "./plugins/ToolbarPlugin";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { TableCellNode, TableNode, TableRowNode } from "@lexical/table";
import { ListItemNode, ListNode } from "@lexical/list";
import { CodeHighlightNode, CodeNode } from "@lexical/code";
import { AutoLinkNode, LinkNode } from "@lexical/link";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin";
import { TRANSFORMERS } from "@lexical/markdown";
import ListMaxIndentLevelPlugin from "./plugins/ListMaxIndentLevelPlugin";
import AutoLinkPlugin from "./plugins/AutoLinkPlugin";
import HtmlSerializerPlugin from "./plugins/HtmlSerializer";


function Placeholder() {
  return <div className="editor-placeholder">Tapez...</div>;
}

const Lexical = (
  {
    isEditable = false, // read-only or writable
    "data-value": dataValue,
    id,
    attribute,
    level,
    ...props
  }
  :{
    'isEditable': boolean
    'data-value': string
    'id': string
    'attribute': string
    'level': string
  }) => {

    let [html, setHtml] = useState(dataValue);

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

  return (
    <>
    <LexicalComposer initialConfig={editorConfig}>
    <div className="editor-container">
      { isEditable && <ToolbarPlugin /> }
      <div className={`editor-inner ${isEditable && 'editable'}`}>
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
        <HtmlSerializerPlugin html={html} setHtml={setHtml} />
        <ListMaxIndentLevelPlugin maxDepth={7} />
        <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
      </div>
    </div>
  </LexicalComposer>
    <input type={'hidden'} value={html} id={id} data-attribute={attribute} />
    </>
  )

}

export default Lexical