import { registerComponent } from '~components/register'
import TimerPanel from './TimerPanel'
import TimerPreview from './TimerPreview'

registerComponent({
  componentType: 'Timer',
  previewComponent: TimerPreview,
  componentPanel: TimerPanel,
})
