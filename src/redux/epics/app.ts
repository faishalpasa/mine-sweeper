import { of } from 'rxjs'
import { catchError, mergeMap } from 'rxjs/operators'
import { ofType } from 'redux-observable'

import type { Epic } from 'redux-observable'
import type { EpicDependencies } from 'redux/store'

import {
  APP_BOARD_DATA_FETCH,
  appBoardDataFetchFailure,
  appBoardDataFetchSuccess
} from 'redux/reducers/app'

import { COMMENT_GET } from 'constants/endpoint'

export const appBoardDataFetchEpic: Epic = (action$, _, { api }: EpicDependencies) =>
  action$.pipe(
    ofType(APP_BOARD_DATA_FETCH),
    mergeMap((action) =>
      api({
        endpoint: COMMENT_GET,
        host: 'https://jsonplaceholder.typicode.com',
        query: {
          postId: action.payload
        }
      }).pipe(
        mergeMap(({ response }: any) => {
          const data = {
            columns: 14,
            rows: 14,
            mines: 10
          }
          return of(appBoardDataFetchSuccess(data))
        }),
        catchError((err) => {
          const error = {
            message: 'Gagal mendapatkan data'
          }
          return of(appBoardDataFetchFailure(error))
        })
      )
    )
  )
