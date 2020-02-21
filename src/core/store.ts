import { init } from '@rematch/core'
import { combineReducers, Store, Dispatch, AnyAction } from 'redux'
import undoable from 'redux-undo'
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import { ComponentsStateWithUndo } from './models/components'
import { AppState } from './models/app'
import models from './models'
import filterUndoableActions from '../utils/undo'

export type RootState = {
  app: AppState
  components: ComponentsStateWithUndo
}

const version = parseInt(process.env.REACT_APP_VERSION || '1', 10)

const persistConfig = {
  key: `openchakra_v${version}`,
  storage,
  whitelist: ['present'],
  version,
  throttle: 500,
}

const persistPlugin = {
  onStoreCreated(store: any) {
    persistStore(store)
  },
}

const customComponentMiddleware = (store: Store<RootState>) => (
  next: Dispatch,
) => (action: AnyAction) => {
  const state = store.getState()
  if (action.type === 'components/updateProps') {
    const componentId = action.payload.id
    const { instanceOf } = state.components.present.components[componentId]

    if (instanceOf) {
      action.payload.id = instanceOf
    }
  }

  next(action)
}

export const storeConfig = {
  models,
  redux: {
    // @ts-ignore
    combineReducers: reducers => {
      return combineReducers({
        ...reducers,
        components: persistReducer(
          persistConfig,
          undoable(reducers.components, {
            limit: 10,
            filter: filterUndoableActions,
          }),
        ),
      })
    },
    middlewares: [customComponentMiddleware],
  },
  plugins: [persistPlugin],
}

// @ts-ignore
export const store = init(storeConfig)
