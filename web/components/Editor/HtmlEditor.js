import React from 'react'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import 'draft-js/dist/Draft.css'
import {stateToHTML} from 'draft-js-export-html'
import {stateFromHTML} from 'draft-js-import-html'
import NoSSR from 'react-no-ssr'

import dynamic from 'next/dynamic'
const Editor = dynamic(
  () => import('react-draft-wysiwyg').then(mod => mod.Editor),
  {ssr: false},
)

class HtmlEditor extends React.Component {

  constructor(props) {
    super(props)
    this.state={
      editorState: null,
    }
  }

  onEditorStateChange = editorState => {
    this.setState({editorState: editorState})
    if (this.props.onChange) {
      this.props.onChange(stateToHTML(editorState.getCurrentContent()))
    }
  }

  render() {

    const {editorState}=this.state

    return (
      <>
        <Editor
          editorState={editorState}
          toolbarClassName="toolbarClassName"
          wrapperClassName="wrapperClassName"
          editorClassName="editorClassName"
          onEditorStateChange={this.onEditorStateChange}
        />
      </>
    )
  }

}

export default HtmlEditor
