import { registerComponent } from '~components/register'
import Media from './Media'
import MediaPanel from './MediaPanel'
import MediaPreview from './MediaPreview'

console.log('Registering Media')

registerComponent({
  componentType: 'Media',
  component: Media,
  previewComponent: MediaPreview,
  componentPanel: MediaPanel,
})
