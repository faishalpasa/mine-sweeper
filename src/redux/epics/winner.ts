import { of } from 'rxjs'
import { catchError, mergeMap } from 'rxjs/operators'
import { ofType } from 'redux-observable'

import type { Epic } from 'redux-observable'
import type { EpicDependencies } from 'redux/store'

import {
  WINNER_DATA_FETCH,
  winnerDataFetchFailure,
  winnerDataFetchSuccess
} from 'redux/reducers/winner'

import { COMMENT_GET } from 'constants/endpoint'

export const winnerDataFetchEpic: Epic = (action$, _, { api }: EpicDependencies) =>
  action$.pipe(
    ofType(WINNER_DATA_FETCH),
    mergeMap((action) =>
      api({
        endpoint: COMMENT_GET,
        host: 'https://jsonplaceholder.typicode.com',
        query: {
          postId: action.payload
        }
      }).pipe(
        mergeMap(({ response }: any) => {
          const data = [
            {
              id: 1,
              name: 'Lorem Ipsum',
              msisdn: '081234567890',
              prize: '1 Unit Sepeda Motor',
              points: 9999
            },
            {
              id: 2,
              name: 'Lorem Ipsum',
              msisdn: '081234567890',
              prize: '1 Unit Handphone',
              points: 8888
            },
            {
              id: 3,
              name: 'Lorem Ipsum',
              msisdn: '081234567890',
              prize: '1 Unit Smart Watch',
              points: 7777
            }
          ]
          return of(winnerDataFetchSuccess(data))
        }),
        catchError((err) => {
          const error = {
            message: 'Gagal mendapatkan data'
          }
          return of(winnerDataFetchFailure(error))
        })
      )
    )
  )
