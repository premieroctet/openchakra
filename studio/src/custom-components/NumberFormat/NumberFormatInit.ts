import { registerComponent } from '~components/register'
import NumberFormatPanel from './NumberFormatPanel'
import NumberFormatPreview from './NumberFormatPreview'

console.log('Registering NumberFormat')

registerComponent({
  componentType: 'NumberFormat',
  previewComponent: NumberFormatPreview,
  componentPanel: NumberFormatPanel,
})
