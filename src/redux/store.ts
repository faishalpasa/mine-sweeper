import { configureStore } from '@reduxjs/toolkit'
import { createLogger } from 'redux-logger'
import { createEpicMiddleware } from 'redux-observable'
import thunk from 'redux-thunk'

import api from 'utils/api'

import reducer from './rootReducer'
import epic from './rootEpic'

const logger = createLogger({ collapsed: true })
const dependencies = {
  api
}

const epicMiddleware = createEpicMiddleware({ dependencies })
const middleware =
  process.env.NODE_ENV === 'development' ? [thunk, epicMiddleware, logger] : [thunk, epicMiddleware]

export const store = configureStore({ reducer, middleware })
export type EpicDependencies = typeof dependencies

epicMiddleware.run(epic)
