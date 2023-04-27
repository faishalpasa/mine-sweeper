import { combineReducers } from 'redux'

import app from 'redux/reducers/app'
import auth from 'redux/reducers/auth'
import navigationTab from 'redux/reducers/navigationTab'
import profile from 'redux/reducers/profile'
import terms from 'redux/reducers/terms'
import topScore from 'redux/reducers/topScore'
import winner from 'redux/reducers/winner'

const reducers = combineReducers({
  app,
  auth,
  navigationTab,
  profile,
  terms,
  topScore,
  winner
})

export default reducers
export type RootState = ReturnType<typeof reducers>
