import { combineEpics } from 'redux-observable'

import * as comment from 'redux/epics/comment'

export default combineEpics(...Object.values(comment))
