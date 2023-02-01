import { buildUploadFile } from '../ComponentBuilder'
import { registerComponent } from '~components/register'
import RatingPanel from './RatingPanel'
import RatingPreview from './RatingPreview'

registerComponent({
  componentType: 'Rating',
  previewComponent: RatingPreview,
  componentPanel: RatingPanel,
  builderFunction: buildUploadFile,
})
