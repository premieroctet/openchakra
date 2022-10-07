import { RootState } from '~core/store'

export const getModelNames = (state: RootState) => {
  return state.dataSources.models.map(m => m.name)
}

export const getModelAttributes = (modelName: string) => (state: RootState) => {
  const attrs = state.dataSources.models.find(i => i.name == modelName)
    ?.attributes
  return attrs
}

export const getModels = (state: RootState) => {
  return state.dataSources.models
}
