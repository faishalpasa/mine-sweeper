import produce from 'immer'
import { Reducer } from 'redux'

import type { CustomAction } from 'types/reducer'

interface FnMap<T> {
  [key: string]: (draft: T, action: CustomAction) => any
}

const createReducer = <T>(initialState: T, fnMap: FnMap<T>) =>
  produce((draft, action) => {
    const callback = fnMap[action.type]
    if (callback) {
      return callback(draft, action)
    }
    return undefined
  }, initialState as any) as Reducer<T, CustomAction>

export default createReducer
