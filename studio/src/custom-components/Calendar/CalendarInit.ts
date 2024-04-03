import { registerComponent } from '~components/register'
import CalendarPanel from './CalendarPanel'
import CalendarPreview from './CalendarPreview'

registerComponent({
  componentType: 'Calendar',
  previewComponent: CalendarPreview,
  componentPanel: CalendarPanel,
})
