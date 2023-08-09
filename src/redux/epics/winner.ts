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

import { WINNER_GET, WINNER_LIMIT_GET } from 'constants/endpoint'

const { apiHost } = config

export const winnerDataFetchEpic: Epic = (action$, _, { api }: EpicDependencies) =>
  action$.pipe(
    ofType(WINNER_DATA_FETCH),
    mergeMap(() =>
      api({
        endpoint: WINNER_LIMIT_GET,
        params: {
          limit: 5
        },
        host: apiHost
      }).pipe(
        mergeMap(({ response }: any) => {
          const { data } = response
          const mappedData = data.map((item: any) => ({
            periode_name: item.periode_name,
            winners: item.winners.map((winner: any) => ({
              id: winner.player_id,
              name: winner.player_name,
              msisdn: winner.player_msisdn,
              prize: winner.prize_name,
              points: winner.total_score
            }))
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
