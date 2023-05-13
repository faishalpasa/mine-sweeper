import { of } from 'rxjs'
import { catchError, mergeMap } from 'rxjs/operators'
import { ofType } from 'redux-observable'

import type { Epic } from 'redux-observable'
import type { EpicDependencies } from 'redux/store'

import config from 'config'

const { apiHost } = config

import {
  PROFILE_SEND_MESSAGE,
  profileSendMessageFailure,
  profileSendSuccess
} from 'redux/reducers/profile'

import { MESSAGE_POST } from 'constants/endpoint'

export const profileSendMessageEpic: Epic = (action$, _, { api }: EpicDependencies) =>
  action$.pipe(
    ofType(PROFILE_SEND_MESSAGE),
    mergeMap((action) =>
      api({
        endpoint: MESSAGE_POST,
        host: apiHost,
        body: {
          message: action.payload
        }
      }).pipe(
        mergeMap(() => {
          return of(profileSendSuccess())
        }),
        catchError((err) => {
          const error = {
            message: err?.response?.message || 'Gagal mendapatkan data'
          }
          return of(profileSendMessageFailure(error))
        })
      )
    )
  )
