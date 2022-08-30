import { RootState } from '~core/store'

export const getModelNames = (state: RootState) => {
  return state.datasources.models.map(m => m.name)
}

export const getModelAttributes = (modelName: string) => (state: RootState) => {
  const attrs = state.datasources.models.find(i => i.name == modelName)
    ?.attributes
  console.log(`Attributes for model ${modelName}:${JSON.stringify(attrs)}`)
  return attrs
}
