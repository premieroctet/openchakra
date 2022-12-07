import { createModel } from '@rematch/core'

export type Model = {
  name: string
  attributes?: Array<string>
}

export type DataSourcesState = {
  models: Array<Model>
}

const dataSources = createModel({
  state: {
    models: [],
  } as DataSourcesState,
  reducers: {
    setModels(state: DataSourcesState, models: Array<Model>): DataSourcesState {
      return {
        ...state,
        models: models,
      }
    },
  },
})

export default dataSources
