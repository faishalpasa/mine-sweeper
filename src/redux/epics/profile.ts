import { of } from 'rxjs'
import { catchError, mergeMap } from 'rxjs/operators'
import { ofType } from 'redux-observable'

import type { Epic } from 'redux-observable'
import type { EpicDependencies } from 'redux/store'

import {
  PROFILE_DATA_FETCH,
  profileDataFetchFailure,
  profileDataFetchSuccess
} from 'redux/reducers/profile'

import { COMMENT_GET } from 'constants/endpoint'

export const profileDataFetchEpic: Epic = (action$, _, { api }: EpicDependencies) =>
  action$.pipe(
    ofType(PROFILE_DATA_FETCH),
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
            msisdn: '081234567890',
            name: '',
            email: '',
            pin: '123456'
          }
          return of(profileDataFetchSuccess(data))
        }),
        catchError((err) => {
          const error = {
            message: 'Gagal mendapatkan data'
          }
          return of(profileDataFetchFailure(error))
        })
      )
    )
  )
