import Card from '../Card/Card'
import DataProviderPanel from './DataProviderPanel'
import DataProviderPreview from './DataProviderPreview'
import { registerComponent } from '~components/register'

console.log('Registering DataProvider')
registerComponent({
  componentType: 'DataProvider',
  component: Card,
  previewComponent: DataProviderPreview,
  componentPanel: DataProviderPanel,
})
