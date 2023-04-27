import { of } from 'rxjs'
import { catchError, mergeMap } from 'rxjs/operators'
import { ofType } from 'redux-observable'

import type { Epic } from 'redux-observable'
import type { EpicDependencies } from 'redux/store'

import {
  AUTH_LOGIN,
  authLoginFailure,
  authLoginSuccess,
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
  authResetPinSuccess
} from 'redux/reducers/auth'

import {
  LOGIN_PIN_POST,
  LOGIN_POST,
  REGISTER_POST,
  RESET_PIN_POST,
  CHANGE_PIN_PUT,
  AUTH_GET,
  PLAYER_PUT
} from 'constants/endpoint'

export const authLoginEpic: Epic = (action$, _, { api }: EpicDependencies) =>
  action$.pipe(
    ofType(AUTH_LOGIN),
    mergeMap((action) =>
      api({
        endpoint: LOGIN_POST,
        host: 'http://127.0.0.1:8000/api',
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

export const authRegisterEpic: Epic = (action$, _, { api }: EpicDependencies) =>
  action$.pipe(
    ofType(AUTH_REGISTER),
    mergeMap((action) =>
      api({
        endpoint: REGISTER_POST,
        host: 'http://127.0.0.1:8000/api',
        body: {
          msisdn: action.payload
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
    )
  )

export const authLoginPinEpic: Epic = (action$, _, { api }: EpicDependencies) =>
  action$.pipe(
    ofType(AUTH_LOGIN_PIN),
    mergeMap((action) =>
      api({
        endpoint: LOGIN_PIN_POST,
        host: 'http://127.0.0.1:8000/api',
        body: {
          msisdn: action.payload.msisdn,
          pin: action.payload.pin
        }
      }).pipe(
        mergeMap(({ response }: any) => {
          const { data } = response
          return of(authLoginPinSuccess(data.token))
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
        host: 'http://127.0.0.1:8000/api',
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
        host: 'http://127.0.0.1:8000/api',
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
    mergeMap((action) =>
      api({
        endpoint: CHANGE_PIN_PUT,
        host: 'http://127.0.0.1:8000/api',
        body: {
          msisdn: state$.value.auth.data.msisdn,
          pin: action.payload.pin,
          new_pin: action.payload.newPin
        }
      }).pipe(
        mergeMap(({ response }: any) => {
          const { data } = response
          return of(authChangePinSuccess(data.token))
        }),
        catchError((err) => {
          const error = {
            message: err?.response?.message || 'Gagal mendapatkan data'
          }
          return of(authChangePinFailure(error))
        })
      )
    )
  )

export const authFetchEpic: Epic = (action$, _, { api }: EpicDependencies) =>
  action$.pipe(
    ofType(AUTH_FETCH),
    mergeMap(() =>
      api({
        endpoint: AUTH_GET,
        host: 'http://127.0.0.1:8000/api'
      }).pipe(
        mergeMap(({ response }: any) => {
          const { data } = response
          return of(authFetchSuccess(data))
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
        host: 'http://127.0.0.1:8000/api',
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
          return of(authDataUpdateSuccess(data))
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
