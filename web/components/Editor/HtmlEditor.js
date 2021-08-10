import React from 'react'
//import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'


class HtmlEditor extends React.Component {
  constructor(props) {
    super(props)
    if (typeof document != 'undefined') {
      this.quill = require('react-quill')
    }
  }

  onChange = html => {
    if (this.props.onChange) {
      this.props.onChange(html)
    }
  }

  render() {

    const ReactQuill=this.quill
    if (!ReactQuill) {
      return null
    }
    let Font = ReactQuill.Quill.import('formats/font')
    // We do not add Aref Ruqaa since it is the default
    Font.whitelist = ["Roboto", "Raleway", "Montserrat", "Lato", "Rubik"]
    ReactQuill.Quill.register(Font, true)
    return (
      <>
        <h2>{this.props.title}</h2>
        <ReactQuill
          theme={'snow'}
          onChange={this.onChange}
          value={this.props.value}
          modules={HtmlEditor.modules}
          formats={HtmlEditor.formats}
          //bounds={'.app'}
          //placeholder={this.props.placeholder}
        />
      </>
    )
  }

}

HtmlEditor.modules = {
  toolbar: [
    [{'header': '1'}, {'header': '2'}, {'font': ["Roboto", "Raleway", "Montserrat", "Lato", "Rubik"]}],
    [{size: []}],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{'list': 'ordered'}, {'list': 'bullet'},
      {'indent': '-1'}, {'indent': '+1'}],
    ['link', 'image', 'video'],
    ['clean'],
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
}
/*
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
HtmlEditor.formats = [
  'header', 'font', 'size',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent',
  'link', 'image', 'video',
]


export default HtmlEditor
