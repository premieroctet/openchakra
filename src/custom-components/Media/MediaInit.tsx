import { registerComponent } from '~components/register'
import Media from './Media'
import MediaPanel from './MediaPanel'
import MediaPreview from './MediaPreview'

registerComponent({
  componentType: 'Media',
  component: Media,
  previewComponent: MediaPreview,
  componentPanel: MediaPanel,
})
