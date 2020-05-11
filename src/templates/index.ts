import { onboarding } from './onboarding'
import { productHunt } from './producthunt'
import { secretchakra } from './secretchakra'

export type TemplateType = 'onboarding' | 'ph' | 'secretchakra'

const templates: {
  [id in TemplateType]: IComponents
} = {
  ph: productHunt,
  onboarding,
  secretchakra,
}

export default templates
