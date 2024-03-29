import { of } from 'rxjs'
import { catchError, mergeMap, debounceTime, switchMap } from 'rxjs/operators'
import { ofType } from 'redux-observable'
import { isMobile, isDesktop } from 'react-device-detect'

import type { Epic } from 'redux-observable'
import type { EpicDependencies } from 'redux/store'
import type { CellPorps } from 'types/board'

import config from 'config'

const { mediaUrl, apiHost } = config

import {
  APP_BOARD_FETCH,
  appBoardFetchFailure,
  appBoardFetchSuccess,
  APP_BOARD_LOG_SAVE,
  appBoardLogSaveFailure,
  appBoardLogSaveSuccess,
  APP_DATA_FETCH,
  appDataFetch,
  appDataFetchFailure,
  appDataFetchSuccess,
  APP_PRIZE_FETCH,
  appPrizeFetchFailure,
  appPrizeFetchSuccess,
  APP_NEXT_LEVEL,
  appNextLevelFailure,
  appNextLevelSuccess,
  APP_CONTINUE_PLAY,
  appContinuePlayFailure,
  appContinuePlaySuccess,
  APP_PAY_OVO,
  appPayOvoFailure,
  appPayOvoSuccess,
  APP_PAY_OVO_CHECK,
  appPayOvoCheck,
  appPayOvoCheckSuccess,
  appPayOvoCheckFailure,
  APP_PAY_GOPAY,
  appPayGopaySuccess,
  appPayGopayFailure,
  APP_PAY_GOPAY_CHECK,
  appPayGopayCheck,
  appPayGopayCheckFailure,
  appPayGopayCheckSuccess,
  appGamePeriodSet,
  appGopayActionsSet
} from 'redux/reducers/app'

import {
  PRIZE_GET,
  STEP_POST,
  STEP_GET,
  DATA_GET,
  NEXT_LEVEL_POST,
  CONTINUE_PLAY_POST,
  PAY_OVO_POST,
  PAY_OVO_CHECK_GET,
  PAY_GOPAY_POST,
  PAY_GOPAY_CHECK_GET
} from 'constants/endpoint'

export const appBoardFetchEpic: Epic = (action$, _, { api }: EpicDependencies) =>
  action$.pipe(
    ofType(APP_BOARD_FETCH),
    mergeMap(() =>
      api({
        endpoint: STEP_GET,
        host: apiHost
      }).pipe(
        mergeMap(({ response }: any) => {
          const { data, success } = response
          const isPeriodActive = !!success
          return of(appBoardFetchSuccess(data), appGamePeriodSet(isPeriodActive))
        }),
        catchError((err) => {
          const error = {
            message: err?.response?.message || 'Gagal mendapatkan data'
          }
          return of(appBoardFetchFailure(error))
        })
      )
    )
  )

export const appBoardLogSaveEpic: Epic = (action$, state$, { api }: EpicDependencies) =>
  action$.pipe(
    ofType(APP_BOARD_LOG_SAVE),
    mergeMap((action) => {
      const decodedState = btoa(action.payload.decodedStateName)
      const decodedPoints = btoa(action.payload.decodedPointName)
      const decodedTime = btoa(action.payload.decodedTimeName)
      const decodedLevel = btoa(state$.value.app.data.level_id)
      const encodedData = btoa(
        JSON.stringify({
          decodedStateName: decodedState,
          decodedPointsName: decodedPoints,
          decodedTimeName: decodedTime,
          decodedLevelName: decodedLevel
        })
      )
      return api({
        endpoint: STEP_POST,
        host: apiHost,
        body: {
          data: encodedData
        }
      }).pipe(
        mergeMap(({ response }: any) => {
          const data = {
            state: action.payload.decodedStateName,
            points: response.data.total_score
          }
          return of(appBoardLogSaveSuccess(data))
        }),
        catchError((err) => {
          const error = {
            message: err?.response?.message || 'Gagal mendapatkan data'
          }
          return of(appBoardLogSaveFailure(error))
        })
      )
    })
  )

export const appDataFetchEpic: Epic = (action$, _, { api }: EpicDependencies) =>
  action$.pipe(
    ofType(APP_DATA_FETCH),
    mergeMap((action) =>
      api({
        endpoint: DATA_GET,
        host: apiHost
      }).pipe(
        mergeMap(({ response }: any) => {
          const data = {
            level: +response.data.level,
            level_id: +response.data.level_id,
            is_max_level: response.data.is_max_level,
            points: +response.data.points,
            coins: +response.data.coins,
            time: +response?.data?.time || 0
          }
          return of(appDataFetchSuccess(data))
        }),
        catchError((err) => {
          const error = {
            message: err?.response?.message || 'Gagal mendapatkan data'
          }
          return of(appDataFetchFailure(error))
        })
      )
    )
  )

export const appPrizeFetchEpic: Epic = (action$, _, { api }: EpicDependencies) =>
  action$.pipe(
    ofType(APP_PRIZE_FETCH),
    mergeMap((action) =>
      api({
        endpoint: PRIZE_GET,
        host: apiHost
      }).pipe(
        mergeMap(({ response }: any) => {
          const { data } = response
          const mapData = data.map((item: any) => {
            return {
              id: item.id,
              name: item.name,
              label: `Peringkat ${item.rank}`,
              imageSrc: `${mediaUrl}/${item.image_url}`
            }
          })
          return of(appPrizeFetchSuccess(mapData))
        }),
        catchError((err) => {
          const error = {
            message: err?.response?.message || 'Gagal mendapatkan data'
          }
          return of(appPrizeFetchFailure(error))
        })
      )
    )
  )

export const appNextLevelEpic: Epic = (action$, _, { api }: EpicDependencies) =>
  action$.pipe(
    ofType(APP_NEXT_LEVEL),
    mergeMap((action) =>
      api({
        endpoint: NEXT_LEVEL_POST,
        host: apiHost
      }).pipe(
        mergeMap(({ response }: any) => {
          const { data } = response
          window.location.reload()
          return of(appNextLevelSuccess())
        }),
        catchError((err) => {
          const error = {
            message: err?.response?.message || 'Gagal mendapatkan data'
          }
          return of(appNextLevelFailure(error))
        })
      )
    )
  )

export const appContinuePlayEpic: Epic = (action$, _, { api }: EpicDependencies) =>
  action$.pipe(
    ofType(APP_CONTINUE_PLAY),
    mergeMap((action) =>
      api({
        endpoint: CONTINUE_PLAY_POST,
        host: apiHost
      }).pipe(
        mergeMap(({ response }: any) => {
          const { data } = response
          window.location.reload()
          return of(appContinuePlaySuccess())
        }),
        catchError((err) => {
          const error = {
            message: err?.response?.message || 'Gagal mendapatkan data'
          }
          return of(appContinuePlayFailure(error))
        })
      )
    )
  )

export const appPayOvoEpic: Epic = (action$, _, { api }: EpicDependencies) =>
  action$.pipe(
    ofType(APP_PAY_OVO),
    mergeMap((action) => {
      return api({
        endpoint: PAY_OVO_POST,
        host: apiHost,
        body: {
          amount: action.payload.amount,
          msisdn: `+62${action.payload.msisdn}`
        }
      }).pipe(
        mergeMap(({ response }: any) => {
          const { data } = response
          return of(appPayOvoSuccess(), appPayOvoCheck(data.id))
        }),
        catchError((err) => {
          const error = {
            message: err?.response?.message || 'Gagal mendapatkan data'
          }
          return of(appPayOvoFailure(error))
        })
      )
    })
  )

export const appPayOvoCheckEpic: Epic = (action$, state$, { api }: EpicDependencies) =>
  action$.pipe(
    ofType(APP_PAY_OVO_CHECK),
    debounceTime(1000),
    switchMap((action) => {
      const trxId = localStorage.getItem('trx_id')
      return api({
        endpoint: PAY_OVO_CHECK_GET,
        host: apiHost,
        params: {
          id: action.payload
        },
        query: {
          trx_id: trxId
        }
      }).pipe(
        mergeMap(({ response }: any) => {
          const { isCheckingPayment } = state$.value.app
          const { data } = response
          if (data.status === 'PENDING' && isCheckingPayment) {
            return of(appPayOvoCheck(data.id))
          } else if (data.status === 'SUCCEEDED') {
            return of(appPayOvoCheckSuccess(), appDataFetch())
          } else {
            return of()
          }
        }),
        catchError((err) => {
          const error = {
            message: err?.response?.message || 'Gagal mendapatkan data'
          }
          return of(appPayOvoCheckFailure(error))
        })
      )
    })
  )

export const appPayGopayEpic: Epic = (action$, _, { api }: EpicDependencies) =>
  action$.pipe(
    ofType(APP_PAY_GOPAY),
    mergeMap((action) => {
      return api({
        endpoint: PAY_GOPAY_POST,
        host: apiHost,
        body: {
          amount: action.payload.amount,
          msisdn: `+62${action.payload.msisdn}`
        }
      }).pipe(
        mergeMap(({ response }: any) => {
          const { data } = response
          const [actionQRCode, actionDeeplink] = data.actions
          if (actionDeeplink?.url && isMobile) {
            window.open(actionDeeplink.url)
          }

          return of(
            appPayGopaySuccess(),
            appPayGopayCheck(data.transaction_id),
            appGopayActionsSet([actionQRCode, actionDeeplink])
          )
        }),
        catchError((err) => {
          const error = {
            message: err?.response?.message || 'Gagal mendapatkan data'
          }
          return of(appPayGopayFailure(error))
        })
      )
    })
  )

export const appPayGopayCheckEpic: Epic = (action$, state$, { api }: EpicDependencies) =>
  action$.pipe(
    ofType(APP_PAY_GOPAY_CHECK),
    debounceTime(2000),
    switchMap((action) => {
      const trxId = localStorage.getItem('trx_id')
      return api({
        endpoint: PAY_GOPAY_CHECK_GET,
        host: apiHost,
        params: {
          id: action.payload
        },
        query: {
          trx_id: trxId
        }
      }).pipe(
        mergeMap(({ response }: any) => {
          const { isCheckingPayment } = state$.value.app
          const { data } = response
          if (data.transaction_status === 'pending' && isCheckingPayment) {
            return of(appPayGopayCheck(data.transaction_id))
          } else if (data.transaction_status === 'settlement') {
            return of(appPayGopayCheckSuccess(), appDataFetch())
          } else {
            return of()
          }
        }),
        catchError((err) => {
          const error = {
            message: err?.response?.message || 'Gagal mendapatkan data'
          }
          return of(appPayGopayCheckFailure(error))
        })
      )
    })
  )
