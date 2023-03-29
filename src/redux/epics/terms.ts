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

import { COMMENT_GET } from 'constants/endpoint'

export const termsDataFetchEpic: Epic = (action$, _, { api }: EpicDependencies) =>
  action$.pipe(
    ofType(TERMS_DATA_FETCH),
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
              description:
                'User dapat mulai memainkan game dengan cara register menggunakan nomer HP dan memasukkan PIN. Setelah itu user di minta untuk membuat PIN untuk login. Nantinya user untuk login setelah melakukan pendaftaran menggunakan nomer HP dan PIN saja.'
            },
            {
              id: 2,
              description:
                'Setelah daftar user mendapatkan Health/Nyawa secara gratis sebanyak 5 nyawa.'
            },
            {
              id: 3,
              description:
                'Setelah Nyawa habis user dapat membeli nyawa dengan Gopay atau Ovo yakni dengan pilihan Rp5.000 (10 nyawa) Rp10.000 (25 nyawa).'
            },
            {
              id: 4,
              description:
                '3 Score tertinggi akan mendapatkan hadiah, contoh score tertinggi pertama mendapatkan HP, score tertinggi kedua mendapatkan smart watch dan score tertinggi ketiga mendapatkan pulsa'
            }
          ]
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
