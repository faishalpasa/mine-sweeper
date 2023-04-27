import { of } from 'rxjs'
import { catchError, mergeMap } from 'rxjs/operators'
import { ofType } from 'redux-observable'

import type { Epic } from 'redux-observable'
import type { EpicDependencies } from 'redux/store'

import {
  TERMS_DATA_FETCH,
  termsDataFetchFailure,
  termsDataFetchSuccess
} from 'redux/reducers/terms'

import { TERMS_GET } from 'constants/endpoint'

export const termsDataFetchEpic: Epic = (action$, _, { api }: EpicDependencies) =>
  action$.pipe(
    ofType(TERMS_DATA_FETCH),
    mergeMap((action) =>
      api({
        endpoint: TERMS_GET,
        host: 'http://127.0.0.1:8000/api'
      }).pipe(
        mergeMap(({ response }: any) => {
          const { data } = response
          return of(termsDataFetchSuccess(data))
        }),
        catchError((err) => {
          const error = {
            message: 'Gagal mendapatkan data'
          }
          return of(termsDataFetchFailure(error))
        })
      )
    )
  )
