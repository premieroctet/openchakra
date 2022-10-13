import { registerComponent } from '~components/register'
import Timer from './Timer'
import TimerPanel from './TimerPanel'
import TimerPreview from './TimerPreview'

registerComponent({
  componentType: 'Timer',
  component: Timer,
  previewComponent: TimerPreview,
  componentPanel: TimerPanel,
})
