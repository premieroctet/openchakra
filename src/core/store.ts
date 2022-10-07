import { init } from '@rematch/core'
import { combineReducers } from 'redux'
import undoable from 'redux-undo'
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { createWrapper, MakeStore } from 'next-redux-wrapper'

import { ProjectStateWithUndo } from './models/project'
import { AppState } from './models/app'
import { DataSourcesState } from './models/dataSources'
import models from './models'
import filterUndoableActions from '~utils/undo'

export type RootState = {
  app: AppState
  project: ProjectStateWithUndo
  dataSources: DataSourcesState
}

const version = parseInt(process.env.NEXT_PUBLIC_VERSION || '1', 10)

const persistConfig = {
  key: `openchakra_v${version}`,
  storage,
  whitelist: ['present'],
  version,
  throttle: 500,
}

const persistPlugin = {
  onStoreCreated(store: any) {
    if (process.browser) {
      persistStore(store)
    }
  },
}

export const storeConfig = {
  models,
  redux: {
    // @ts-ignore
    combineReducers: reducers => {
      return combineReducers({
        ...reducers,
        project: persistReducer(
          persistConfig,
          undoable(reducers.project, {
            limit: 10,
            filter: filterUndoableActions,
          }),
        ),
      })
    },
  },
  plugins: [persistPlugin],
}

// @ts-ignore
export const makeStore: MakeStore<RootState> = () => init(storeConfig)

export const wrapper = createWrapper<RootState>(makeStore)
