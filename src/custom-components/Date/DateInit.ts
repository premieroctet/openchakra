import { registerComponent } from '~components/register'
import DatePanel from './DatePanel'
import DatePreview from './DatePreview'

console.log('Registering Date')

registerComponent({
  componentType: 'Date',
  previewComponent: DatePreview,
  componentPanel: DatePanel,
})
