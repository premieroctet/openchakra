import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { AppState } from './core/models/app'
import { ComponentsStateWithUndo } from './core/models/components'
import { ThemeProvider, CSSReset, theme } from '@chakra-ui/core'
import { init } from '@rematch/core'
import { Provider } from 'react-redux'
import { combineReducers } from 'redux'
import undoable from 'redux-undo'
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import models from './core/models'
import filterUndoableActions from './utils/undo'

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
}

const persistPlugin = {
  onStoreCreated(store: any) {
    persistStore(store)
  },
}

export const store = init({
  models,
  redux: {
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
  },
  plugins: [persistPlugin],
})

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <CSSReset />
      <App />
    </ThemeProvider>
  </Provider>,

  document.getElementById('root'),
)
