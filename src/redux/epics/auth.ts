import { of } from 'rxjs'
import { catchError, mergeMap } from 'rxjs/operators'
import { ofType } from 'redux-observable'

import type { Epic } from 'redux-observable'
import type { EpicDependencies } from 'redux/store'

import config from 'config'

const { apiHost } = config

import {
  AUTH_LOGIN,
  authLoginFailure,
  authLoginSuccess,
  AUTH_PRE_REGISTER,
  authPreRegisterFailure,
  authPreRegisterSuccess,
  AUTH_FIRST_PIN_CHECK,
  authFirstPinCheckFailure,
  authFirstPinCheckSuccess,
  AUTH_REGISTER,
  authRegisterFailure,
  authRegisterSuccess,
  AUTH_LOGIN_PIN,
  authLoginPinFailure,
  authLoginPinSuccess,
  AUTH_CHANGE_PIN,
  authChangePinFailure,
  authChangePinSuccess,
  AUTH_FETCH,
  authFetchFailure,
  authFetchSuccess,
  AUTH_DATA_UPDATE,
  authDataUpdateFailure,
  authDataUpdateSuccess,
  AUTH_CHECK_PIN,
  authCheckPinFailure,
  authCheckPinSuccess,
  AUTH_RESET_PIN,
  authResetPinFailure,
  authResetPinSuccess,
  AUTH_MSISDN_CHECK,
  authMsisdnCheckFailure,
  authMsisdnCheckSuccess,
  authLoginWithRandomPinSet,
  AUTH_TOKEN_VALIDATE,
  authTokenValidate,
  authTokenValidateFailure,
  authTokenValidateSuccess
} from 'redux/reducers/auth'
import { appGameOverSet } from 'redux/reducers/app'
import { snackbarOpen } from 'redux/reducers/snackbar'

import {
  LOGIN_PIN_POST,
  LOGIN_POST,
  PRE_REGISTER_POST,
  REGISTER_POST,
  RESET_PIN_POST,
  CHANGE_PIN_PUT,
  AUTH_GET,
  PLAYER_PUT,
  PRE_REGISTER_CHECK_POST,
  MSISDN_CHECK_GET,
  VALIDATE_TOKEN_POST
} from 'constants/endpoint'

export const authLoginEpic: Epic = (action$, _, { api }: EpicDependencies) =>
  action$.pipe(
    ofType(AUTH_LOGIN),
    mergeMap((action) =>
      api({
        endpoint: LOGIN_POST,
        host: apiHost,
        body: {
          msisdn: action.payload
        }
      }).pipe(
        mergeMap(({ response }: any) => {
          const { data } = response
          return of(authLoginSuccess(data))
        }),
        catchError((err) => {
          const error = {
            message: err?.response?.message || 'Gagal mendapatkan data'
          }
          return of(authLoginFailure(error))
        })
      )
    )
  )

export const authPreRegisterEpic: Epic = (action$, _, { api }: EpicDependencies) =>
  action$.pipe(
    ofType(AUTH_PRE_REGISTER),
    mergeMap((action) =>
      api({
        endpoint: PRE_REGISTER_POST,
        host: apiHost,
        body: {
          msisdn: action.payload
        }
      }).pipe(
        mergeMap(() => {
          return of(authPreRegisterSuccess())
        }),
        catchError((err) => {
          const error = {
            message: err?.response?.message || 'Gagal mendapatkan data'
          }
          return of(authPreRegisterFailure(error))
        })
      )
    )
  )

export const authFirstPinCheckEpic: Epic = (action$, _, { api }: EpicDependencies) =>
  action$.pipe(
    ofType(AUTH_FIRST_PIN_CHECK),
    mergeMap((action) =>
      api({
        endpoint: PRE_REGISTER_CHECK_POST,
        host: apiHost,
        body: {
          msisdn: action.payload.msisdn,
          pin: action.payload.pin
        }
      }).pipe(
        mergeMap(() => {
          return of(authFirstPinCheckSuccess())
        }),
        catchError((err) => {
          const error = {
            message: err?.response?.message || 'Gagal mendapatkan data'
          }
          return of(authFirstPinCheckFailure(error))
        })
      )
    )
  )

export const authRegisterEpic: Epic = (action$, _, { api }: EpicDependencies) =>
  action$.pipe(
    ofType(AUTH_REGISTER),
    mergeMap((action) => {
      const trxId = localStorage.getItem('trx_id')
      return api({
        endpoint: REGISTER_POST,
        host: apiHost,
        body: {
          msisdn: action.payload.msisdn,
          msisdn_enc: action.payload.msisdn_enc,
          pin: action.payload.pin
        },
        query: {
          trx_id: trxId
        }
      }).pipe(
        mergeMap(({ response }: any) => {
          const { data } = response
          return of(authRegisterSuccess(data))
        }),
        catchError((err) => {
          const error = {
            message: err?.response?.message || 'Gagal mendapatkan data'
          }
          return of(authRegisterFailure(error))
        })
      )
    })
  )

export const authLoginPinEpic: Epic = (action$, state$, { api }: EpicDependencies) =>
  action$.pipe(
    ofType(AUTH_LOGIN_PIN),
    mergeMap((action) =>
      api({
        endpoint: LOGIN_PIN_POST,
        host: apiHost,
        body: {
          msisdn: action.payload.msisdn,
          pin: action.payload.pin
        }
      }).pipe(
        mergeMap(({ response }: any) => {
          const { isPinReset } = state$.value.auth
          const { data } = response
          if (isPinReset) {
            return of(authLoginPinSuccess(data.token), authLoginWithRandomPinSet(true))
          } else {
            localStorage.setItem('auth', '1')
            localStorage.setItem('token', data.token)
            location.href = '/'
            return of(authLoginPinSuccess(data.token), authLoginWithRandomPinSet(false))
          }
        }),
        catchError((err) => {
          const error = {
            message: err?.response?.message || 'Gagal mendapatkan data'
          }
          return of(authLoginPinFailure(error))
        })
      )
    )
  )

export const authCheckPinEpic: Epic = (action$, state$, { api }: EpicDependencies) =>
  action$.pipe(
    ofType(AUTH_CHECK_PIN),
    mergeMap((action) =>
      api({
        endpoint: LOGIN_PIN_POST,
        host: apiHost,
        body: {
          msisdn: state$.value.auth.data.msisdn,
          pin: action.payload
        }
      }).pipe(
        mergeMap(({ response }: any) => {
          return of(authCheckPinSuccess())
        }),
        catchError((err) => {
          const error = {
            message: err?.response?.message || 'Gagal mendapatkan data'
          }
          return of(authCheckPinFailure(error))
        })
      )
    )
  )

export const authResetPinEpic: Epic = (action$, state$, { api }: EpicDependencies) =>
  action$.pipe(
    ofType(AUTH_RESET_PIN),
    mergeMap(() =>
      api({
        endpoint: RESET_PIN_POST,
        host: apiHost,
        body: {
          msisdn: state$.value.auth.data.msisdn
        }
      }).pipe(
        mergeMap(({ response }: any) => {
          const { data } = response
          return of(authResetPinSuccess(data.token))
        }),
        catchError((err) => {
          const error = {
            message: err?.response?.message || 'Gagal mendapatkan data'
          }
          return of(authResetPinFailure(error))
        })
      )
    )
  )

export const authChangePinEpic: Epic = (action$, state$, { api }: EpicDependencies) =>
  action$.pipe(
    ofType(AUTH_CHANGE_PIN),
    mergeMap((action) => {
      const { isLoginWithRandomPin, data } = state$.value.auth
      return api({
        endpoint: CHANGE_PIN_PUT,
        host: apiHost,
        body: {
          msisdn: state$.value.auth.data.msisdn,
          pin: action.payload.pin,
          new_pin: action.payload.newPin
        },
        headers: {
          'x-token': data.token
        }
      }).pipe(
        mergeMap(({ response }: any) => {
          const { data } = response
          if (isLoginWithRandomPin) {
            localStorage.setItem('auth', '1')
            localStorage.setItem('token', data.token)
            location.href = '/'
            return of(authChangePinSuccess(data.token))
          } else {
            return of(authChangePinSuccess(data.token), snackbarOpen('Berhasil merubah PIN.'))
          }
        }),
        catchError((err) => {
          const error = {
            message: err?.response?.message || 'Gagal mendapatkan data'
          }
          return of(authChangePinFailure(error))
        })
      )
    })
  )

export const authFetchEpic: Epic = (action$, _, { api }: EpicDependencies) =>
  action$.pipe(
    ofType(AUTH_FETCH),
    mergeMap(() =>
      api({
        endpoint: AUTH_GET,
        host: apiHost
      }).pipe(
        mergeMap(({ response }: any) => {
          const { data } = response
          const isGameOver = data.is_game_over && +data.is_game_over
          if (isGameOver) {
            return of(authFetchSuccess(data), appGameOverSet(true))
          } else {
            return of(authFetchSuccess(data))
          }
        }),
        catchError((err) => {
          const error = {
            message: err?.response?.message || 'Gagal mendapatkan data'
          }
          localStorage.removeItem('auth')
          localStorage.removeItem('token')
          window.location.reload()
          return of(authFetchFailure(error))
        })
      )
    )
  )

export const authDataUpdateEpic: Epic = (action$, state$, { api }: EpicDependencies) =>
  action$.pipe(
    ofType(AUTH_DATA_UPDATE),
    mergeMap((action) =>
      api({
        endpoint: PLAYER_PUT,
        host: apiHost,
        body: {
          name: action.payload.name,
          email: action.payload.email
        },
        params: {
          id: state$.value.auth.data.id
        }
      }).pipe(
        mergeMap(({ response }: any) => {
          const { data } = response
          return of(authDataUpdateSuccess(data), snackbarOpen('Profil anda telah diubah.'))
        }),
        catchError((err) => {
          const error = {
            message: err?.response?.message || 'Gagal mendapatkan data'
          }
          return of(authDataUpdateFailure(error))
        })
      )
    )
  )

export const authMsisdnCheckEpic: Epic = (action$, state$, { api }: EpicDependencies) =>
  action$.pipe(
    ofType(AUTH_MSISDN_CHECK),
    mergeMap((action) =>
      api({
        endpoint: MSISDN_CHECK_GET,
        host: apiHost,
        params: {
          msisdn: action.payload.msisdn
        }
      }).pipe(
        mergeMap(({ response }: any) => {
          const { data } = response
          const actions: any = [authMsisdnCheckSuccess(data?.id)]

          if (!data?.id) {
            actions.push(authTokenValidate(action.payload.msisdn, action.payload.token))
          }
          return of(...actions)
        }),
        catchError((err) => {
          const error = {
            message: err?.response?.message || 'Gagal mendapatkan data'
          }
          return of(authMsisdnCheckFailure(error))
        })
      )
    )
  )

export const authTokenValidateEpic: Epic = (action$, state$, { api }: EpicDependencies) =>
  action$.pipe(
    ofType(AUTH_TOKEN_VALIDATE),
    mergeMap((action) =>
      api({
        endpoint: VALIDATE_TOKEN_POST,
        host: apiHost,
        body: {
          msisdn: action.payload.msisdn,
          token: action.payload.token
        }
      }).pipe(
        mergeMap(({ response }: any) => {
          const { data } = response
          return of(
            authTokenValidateSuccess({
              ...data,
              msisdn: action.payload.msisdn
            })
          )
        }),
        catchError((err) => {
          const error = {
            message: err?.response?.message || 'Gagal mendapatkan data'
          }
          return of(authTokenValidateFailure(error))
        })
      )
    )
  )
