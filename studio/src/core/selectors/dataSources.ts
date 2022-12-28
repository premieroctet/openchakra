import { RootState } from '~core/store'

export const getModelNames = (state: RootState) => {
  return Object.keys(state.dataSources.models)
}

export const getModelAttributes = (modelName: string) => (state: RootState) => {
  const attrs = state.dataSources.models[modelName]?.attributes
  return attrs
}

export const getModels = (state: RootState) => {
  return state.dataSources.models
}
