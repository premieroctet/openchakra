import { buildUploadFile } from '../ComponentBuilder'
import { registerComponent } from '~components/register'
import LexicalPanel from './LexicalPanel'
import LexicalPreview from './LexicalPreview'

registerComponent({
  componentType: 'Lexical',
  previewComponent: LexicalPreview,
  componentPanel: LexicalPanel,
  builderFunction: buildUploadFile,
})