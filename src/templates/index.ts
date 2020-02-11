import { onboarding } from './onboarding'
import { productHunt } from './producthunt'

export type TemplateType = 'onboarding' | 'ph'

const templates: {
  [id in TemplateType]: IComponents
} = {
  ph: productHunt,
  onboarding: onboarding,
}

export default templates
