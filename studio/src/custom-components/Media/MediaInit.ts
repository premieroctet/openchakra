import { registerComponent } from '~components/register'
import MediaPanel from './MediaPanel'
import MediaPreview from './MediaPreview'

registerComponent({
  componentType: 'Media',
  previewComponent: MediaPreview,
  componentPanel: MediaPanel,
})
