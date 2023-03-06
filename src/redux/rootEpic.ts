import { combineEpics } from 'redux-observable'

import * as app from 'redux/epics/app'
import * as comment from 'redux/epics/comment'

export default combineEpics(...Object.values(app), ...Object.values(comment))
