import { registerComponent } from '~components/register'
import Table from './Table';
import TablePanel from './TablePanel';
import TablePreview from './TablePreview';

console.log('Registering Table')
registerComponent({
  componentType: 'Table',
  component: Table,
  previewComponent: TablePreview,
  componentPanel: TablePanel,
})
