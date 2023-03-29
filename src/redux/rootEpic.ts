import { combineEpics } from 'redux-observable'

import * as app from 'redux/epics/app'
import * as comment from 'redux/epics/comment'
import * as profile from 'redux/epics/profile'
import * as terms from 'redux/epics/terms'
import * as topScore from 'redux/epics/topScore'
import * as winner from 'redux/epics/winner'

export default combineEpics(
  ...Object.values(app),
  ...Object.values(comment),
  ...Object.values(profile),
  ...Object.values(terms),
  ...Object.values(topScore),
  ...Object.values(winner)
)
