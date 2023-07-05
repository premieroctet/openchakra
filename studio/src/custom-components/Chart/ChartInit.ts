import { buildUploadFile } from '../ComponentBuilder'
import { registerComponent } from '~components/register'
import ChartPanel from './ChartPanel'
import ChartPreview from './ChartPreview'

registerComponent({
  componentType: 'Chart',
  previewComponent: ChartPreview,
  componentPanel: ChartPanel,
  builderFunction: buildUploadFile,
})