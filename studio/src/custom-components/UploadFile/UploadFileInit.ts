import { buildUploadFile } from '../ComponentBuilder'
import { registerComponent } from '~components/register'
import UploadFilePanel from './UploadFilePanel'
import UploadFilePreview from './UploadFilePreview'

registerComponent({
  componentType: 'UploadFile',
  menuChildren: {
    children: {},
  },
  previewComponent: UploadFilePreview,
  componentPanel: UploadFilePanel,
  builderFunction: buildUploadFile,
})
