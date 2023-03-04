import { combineReducers } from 'redux'

import app from 'redux/reducers/app'

const reducers = combineReducers({
  app
})

export default reducers
export type RootState = ReturnType<typeof reducers>
