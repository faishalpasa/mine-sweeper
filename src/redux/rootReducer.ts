import { combineReducers } from 'redux'

import app from 'redux/reducers/app'
import navigationTab from 'redux/reducers/navigationTab'

const reducers = combineReducers({
  app,
  navigationTab
})

export default reducers
export type RootState = ReturnType<typeof reducers>
