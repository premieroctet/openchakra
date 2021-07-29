import React from 'react'
import HtmlEditor from '../../components/Editor/Htmleditor'
import dynamic from 'next/dynamic'
const Editor = dynamic(
  () => import('react-draft-wysiwyg').then(mod => mod.Editor),
  {ssr: false},
)

class HtmlEditorTest extends React.Component {

  constructor(props) {
    super(props)
    this.state={
      text: '<h1>Tagada</h1>',
    }
  }

  onEditorStateChange = text => {
    this.setState({text: text})
  }

  render() {

    const {text}=this.state

    return (
      <>
        <HtmlEditor
          text={text}
          onChange={this.onEditorStateChange}
        />
      </>
    )
  }

}

export default HtmlEditorTest
