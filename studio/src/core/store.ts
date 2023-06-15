import { init } from '@rematch/core'
import { combineReducers } from 'redux'
import undoable from 'redux-undo'
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { createWrapper, MakeStore } from 'next-redux-wrapper'
import createCompressor from 'redux-persist-transform-compress'
import { createTransform } from 'redux-persist'

import { ProjectStateWithUndo } from './models/project'
import { AppState } from './models/app'
import { DataSourcesState } from './models/dataSources'
import { RolesState } from './models/roles'
import models from './models'
import filterUndoableActions from '~utils/undo'

const COMPRESS_THRESHOLD=4*1024*1024

export type RootState = {
  app: AppState
  project: ProjectStateWithUndo
  dataSources: DataSourcesState
  roles: RolesState
}

const version = parseInt(process.env.NEXT_PUBLIC_VERSION || '1', 10)

const compressor = createCompressor({  whitelist: ['present']})

const thresholdCompressor =createTransform(

   (inboundState, key) => {
     const rawLength=JSON.stringify(inboundState).length
     if (rawLength>COMPRESS_THRESHOLD) {
       console.log(`Storage length is ${rawLength}, compressing`)
       return compressor.in(inboundState, key)
     }
     console.log(`Storage length is ${rawLength}, not compressing`)
     return inboundState
   },

   (outboundState, key) => {
     console.log('Getting data from persist')
     return compressor.out(outboundState, key)
   },

   {  whitelist: ['present']}
)

const persistConfig = {
  key: `openchakra_v${version}`,
  storage,
  transforms: [thresholdCompressor],
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
  //plugins: [persistPlugin],
}

// @ts-ignore
export const makeStore: MakeStore<RootState> = () => init(storeConfig)

export const wrapper = createWrapper<RootState>(makeStore)
