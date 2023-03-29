import { of } from 'rxjs'
import { catchError, mergeMap } from 'rxjs/operators'
import { ofType } from 'redux-observable'

import type { Epic } from 'redux-observable'
import type { EpicDependencies } from 'redux/store'

import {
  TOP_SCORE_DATA_FETCH,
  topScoreDataFetchFailure,
  topScoreDataFetchSuccess
} from 'redux/reducers/topScore'

import { COMMENT_GET } from 'constants/endpoint'

export const topScoreDataFetchEpic: Epic = (action$, _, { api }: EpicDependencies) =>
  action$.pipe(
    ofType(TOP_SCORE_DATA_FETCH),
    mergeMap((action) =>
      api({
        endpoint: COMMENT_GET,
        host: 'https://jsonplaceholder.typicode.com',
        query: {
          postId: action.payload
        }
      }).pipe(
        mergeMap(({ response }: any) => {
          const data = Array.from(Array(25).keys()).map((index) => ({
            id: index + 1,
            name: `Lorem Ipsum ${index + 1}`,
            msisdn: '081234567890',
            level: 50,
            points: 1000 - index
          }))

          return of(topScoreDataFetchSuccess(data))
        }),
        catchError((err) => {
          const error = {
            message: 'Gagal mendapatkan data'
          }
          return of(topScoreDataFetchFailure(error))
        })
      )
    )
  )
