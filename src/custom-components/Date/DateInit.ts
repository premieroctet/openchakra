import { registerComponent } from '~components/register'
import Date from './Date'
import DatePanel from './DatePanel'
import DatePreview from './DatePreview'

console.log('Registering Date')

registerComponent({
  componentType: 'Date',
  component: Date,
  previewComponent: DatePreview,
  componentPanel: DatePanel,
})
