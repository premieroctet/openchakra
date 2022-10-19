import DataProviderPanel from './DataProviderPanel'
import DataProviderPreview from './DataProviderPreview'
import { registerComponent } from '~components/register'

registerComponent({
  componentType: 'DataProvider',
  component: null,
  previewComponent: DataProviderPreview,
  componentPanel: DataProviderPanel,
})
