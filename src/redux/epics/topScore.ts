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
import config from 'config'

import { TOP_SCORE_GET } from 'constants/endpoint'

const { apiHost } = config

export const topScoreDataFetchEpic: Epic = (action$, _, { api }: EpicDependencies) =>
  action$.pipe(
    ofType(TOP_SCORE_DATA_FETCH),
    mergeMap(() =>
      api({
        endpoint: TOP_SCORE_GET,
        host: apiHost
      }).pipe(
        mergeMap(({ response }: any) => {
          const { data } = response
          const mappedData = data.map((item: any) => ({
            id: item.player_id,
            name: item.player_name,
            msisdn: item.player_msisdn,
            level: item.max_level,
            points: item.total_score
          }))

          return of(topScoreDataFetchSuccess(mappedData))
        }),
        catchError((err) => {
          const error = {
            message: err?.response?.message || 'Gagal mendapatkan data'
          }
          return of(topScoreDataFetchFailure(error))
        })
      )
    )
  )
