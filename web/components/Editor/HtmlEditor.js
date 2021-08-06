import React from 'react'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import 'draft-js/dist/Draft.css'
import {stateToHTML} from 'draft-js-export-html'
//import {stateFromHTML} from 'draft-js-import-html'
import {EditorState, convertToRaw, convertFromRaw} from 'draft-js'
import {Editor} from 'react-draft-wysiwyg'

class HtmlEditor extends React.Component {

  constructor(props) {
    super(props)
    this.state={
      editorState: EditorState.createEmpty(),
    }
  }

  componentDidMount = () => {
    if (this.props.value) {
      const st=EditorState.createWithContent(convertFromRaw(this.props.value))
      this.setState({editorState: st})
    }
  }
  onEditorStateChange = editorState => {
    this.setState({editorState: editorState})
    if (this.props.onChange) {
      console.log(stateToHTML(editorState.getCurrentContent()))
      this.props.onChange(convertToRaw(editorState.getCurrentContent()))
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
