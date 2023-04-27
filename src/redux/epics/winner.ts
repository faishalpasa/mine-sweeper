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
import config from 'config'

import { WINNER_GET } from 'constants/endpoint'

const { apiHost } = config

export const winnerDataFetchEpic: Epic = (action$, _, { api }: EpicDependencies) =>
  action$.pipe(
    ofType(WINNER_DATA_FETCH),
    mergeMap(() =>
      api({
        endpoint: WINNER_GET,
        host: apiHost
      }).pipe(
        mergeMap(({ response }: any) => {
          const { data } = response
          const mappedData = data.map((item: any) => ({
            id: item.player_id,
            name: item.player_name,
            msisdn: item.player_msisdn,
            prize: item.prize_name,
            points: item.total_score
          }))

          return of(winnerDataFetchSuccess(mappedData))
        }),
        catchError((err) => {
          const error = {
            message: err?.response?.message || 'Gagal mendapatkan data'
          }
          return of(winnerDataFetchFailure(error))
        })
      )
    )
  )
